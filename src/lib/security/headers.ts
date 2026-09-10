export interface SecurityHeader {
  key: string;
  value: string;
}

export function getSecurityHeaders(): SecurityHeader[] {
  const isProduction = process.env.NODE_ENV === 'production';

  const cspDirectives = [
    "default-src 'self'",
    // In Next.js App Router, inline scripts are used for hydration bootstrap scripts.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    // Tailwind and style injection
    "style-src 'self' 'unsafe-inline'",
    // Images: self, data URIs, secure HTTPS image sources for architectural photos
    "img-src 'self' data: blob: https:",
    // Fonts: self and data URIs
    "font-src 'self' data:",
    // Connect: self (API routes, server actions)
    "connect-src 'self'",
    // Prevent embedding in frames
    "frame-ancestors 'none'",
    // Form submission targets
    "form-action 'self'",
    // Base URL restriction
    "base-uri 'self'",
  ];

  const headers: SecurityHeader[] = [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    },
    {
      key: 'Content-Security-Policy',
      value: cspDirectives.join('; '),
    },
  ];

  if (isProduction) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    });
  }

  return headers;
}
