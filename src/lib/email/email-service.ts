import 'server-only';
import { sanitizeEmailHeader, stripControlCharacters } from '@/lib/security/sanitize';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Transactional Email Service abstraction.
 * Decouples domain logic (e.g. inquiry notifications) from the underlying transport provider
 * (Resend, SendGrid, Postmark, AWS SES, or SMTP).
 */
export interface EmailService {
  send(options: SendEmailOptions): Promise<SendEmailResult>;
}

/**
 * Safe development / test logger implementation.
 * Logs sanitized notification payloads to stdout without requiring third-party credentials.
 */
export class DevLoggerEmailService implements EmailService {
  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    const cleanTo = sanitizeEmailHeader(options.to);
    const cleanSubject = sanitizeEmailHeader(options.subject);
    const cleanReplyTo = options.replyTo ? sanitizeEmailHeader(options.replyTo) : undefined;
    const cleanText = stripControlCharacters(options.text);

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Dev Email Service]', {
        to: cleanTo,
        subject: cleanSubject,
        replyTo: cleanReplyTo,
        textPreview: cleanText.slice(0, 120) + (cleanText.length > 120 ? '...' : ''),
        timestamp: new Date().toISOString(),
      });
    }

    return {
      success: true,
      messageId: `dev-mock-${Date.now()}`,
    };
  }
}

/**
 * Production Transactional Email Service backed by the Resend REST API.
 * Uses native fetch with strict input sanitization, timeout handling, and error masking.
 */
export class ResendEmailService implements EmailService {
  private readonly apiKey: string;
  private readonly defaultFrom: string;

  constructor(apiKey: string, defaultFrom = 'Atelier Noura <notifications@ateliernoura.ma>') {
    this.apiKey = apiKey;
    this.defaultFrom = defaultFrom;
  }

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    const cleanTo = sanitizeEmailHeader(options.to);
    const cleanSubject = sanitizeEmailHeader(options.subject);
    const cleanReplyTo = options.replyTo ? sanitizeEmailHeader(options.replyTo) : undefined;
    const cleanText = stripControlCharacters(options.text);
    const fromAddress = sanitizeEmailHeader(process.env.EMAIL_FROM || this.defaultFrom);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [cleanTo],
          subject: cleanSubject,
          text: cleanText,
          html: options.html,
          reply_to: cleanReplyTo,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg =
          typeof data?.message === 'string'
            ? data.message
            : `Resend API returned status ${response.status}`;

        console.error('[EmailService Error] Resend dispatch failed:', {
          status: response.status,
          error: errorMsg,
        });

        return {
          success: false,
          error: errorMsg,
        };
      }

      return {
        success: true,
        messageId: typeof data?.id === 'string' ? data.id : `resend-${Date.now()}`,
      };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.name === 'AbortError'
            ? 'Resend API request timed out after 10 seconds'
            : err.message
          : 'Network error connecting to Resend API';

      console.error('[EmailService Error] Resend transport error:', errorMsg);

      return {
        success: false,
        error: errorMsg,
      };
    }
  }
}

/**
 * Explicit configuration failure implementation.
 * Used when production credentials are required but missing, logging an operational error.
 */
export class MissingCredentialsEmailService implements EmailService {
  private readonly configKey: string;

  constructor(configKey: string) {
    this.configKey = configKey;
  }

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    console.error(
      `[EmailService Configuration Error] Cannot dispatch notification to ${options.to}: ${this.configKey} is not configured.`
    );
    return {
      success: false,
      error: `Missing configuration: ${this.configKey}`,
    };
  }
}

/**
 * Factory function establishing the appropriate EmailService instance.
 * - In production: Instantiates ResendEmailService with RESEND_API_KEY (or logs configuration error if missing).
 * - In development / test: Uses ResendEmailService if RESEND_API_KEY is supplied; otherwise uses DevLoggerEmailService.
 */
function createEmailService(): EmailService {
  const apiKey = process.env.RESEND_API_KEY;

  if (process.env.NODE_ENV === 'production') {
    if (!apiKey) {
      console.error(
        '[Security & Operations Alert] RESEND_API_KEY is missing in production. Outbound inquiry notification emails cannot be delivered.'
      );
      return new MissingCredentialsEmailService('RESEND_API_KEY');
    }
    return new ResendEmailService(apiKey);
  }

  // Development / Test
  if (apiKey) {
    return new ResendEmailService(apiKey);
  }

  return new DevLoggerEmailService();
}

export const emailService: EmailService = createEmailService();
