function resolveSiteUrl(): string {
  // 1. Explicit user/environment overrides (configured in Vercel or .env)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/+$/, '');
    if (url) return url;
  }
  if (process.env.APP_URL) {
    const url = process.env.APP_URL.trim().replace(/\/+$/, '');
    if (url) return url;
  }

  // 2. Vercel automatically injected deployment URLs (e.g. project-name.vercel.app)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim().replace(/\/+$/, '')}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.trim().replace(/\/+$/, '')}`;
  }

  // 3. Fallback for local development
  return 'http://localhost:3000';
}

export const SITE_URL: string = resolveSiteUrl();
export const PRODUCTION_DOMAIN: string = SITE_URL;

