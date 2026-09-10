/**
 * HTML entities mapping for safe escaping
 */
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

const HTML_ESCAPE_REGEX = /[&<>"'/]/g;

/**
 * Escape HTML special characters to prevent Cross-Site Scripting (XSS).
 * Use this when rendering user-supplied plain text inside HTML contexts (e.g. email templates).
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(HTML_ESCAPE_REGEX, (match) => HTML_ESCAPES[match] || match);
}

/**
 * Remove null bytes and non-printable control characters that could cause parser exploits.
 */
export function stripControlCharacters(str: string): string {
  if (!str) return '';
  // Preserves \n, \r, \t, removes ASCII control characters 0-8, 11, 12, 14-31, 127
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Clean text for safe email body transmission to prevent SMTP header injection.
 * Removes carriage returns or newlines from single-line headers (e.g. subject, recipient name).
 */
export function sanitizeEmailHeader(headerValue: string): string {
  if (!headerValue) return '';
  return stripControlCharacters(headerValue).replace(/[\r\n]/g, ' ').trim();
}

/**
 * Format plain text safely for transactional email content.
 * Escapes HTML characters if rendered in HTML email body and prevents injection.
 */
export function formatPlainTextForEmail(plainText: string): { text: string; html: string } {
  const sanitized = stripControlCharacters(plainText).trim();
  const escaped = escapeHtml(sanitized).replace(/\n/g, '<br />');
  return {
    text: sanitized,
    html: escaped,
  };
}
