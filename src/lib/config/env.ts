import 'server-only';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  APP_URL: z
    .string()
    .url('APP_URL must be a valid URL (e.g. http://localhost:3000 or https://ateliernoura.com)'),
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .refine(
      (url) => url.startsWith('postgresql://') || url.startsWith('postgres://'),
      'DATABASE_URL must be a valid PostgreSQL connection string'
    ),
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters long'),
  RESEND_API_KEY: z
    .string()
    .optional(),
  EMAIL_FROM: z
    .string()
    .optional(),
  INQUIRY_NOTIFICATION_EMAIL: z
    .string()
    .email('INQUIRY_NOTIFICATION_EMAIL must be a valid email address')
    .optional(),
});

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  INQUIRY_NOTIFICATION_EMAIL: process.env.INQUIRY_NOTIFICATION_EMAIL,
});

if (!parsed.success) {
  const formattedErrors = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`[Configuration Error] Invalid environment variables:\n${formattedErrors}`);
}

// In production runtime, enforce required secrets and reject known development placeholders
if (parsed.data.NODE_ENV === 'production') {
  const placeholderSecrets = [
    'change-this-to-a-secure-random-32-char-min-secret-for-atelier-noura',
    'development-only-session-secret-min-32-chars-atelier-noura-2026',
  ];
  if (placeholderSecrets.includes(parsed.data.SESSION_SECRET)) {
    throw new Error(
      '[Security Error] Insecure default SESSION_SECRET detected in production environment.'
    );
  }

  const placeholderResendKeys = [
    're_123456789_placeholder',
    're_placeholder',
    'change-this-to-resend-api-key',
  ];
  if (!parsed.data.RESEND_API_KEY || placeholderResendKeys.includes(parsed.data.RESEND_API_KEY)) {
    console.warn(
      '[Configuration Warning] Production environment detected without a valid RESEND_API_KEY. Inquiry notification emails will fail to dispatch until configured.'
    );
  }
}

export const env = parsed.data;
