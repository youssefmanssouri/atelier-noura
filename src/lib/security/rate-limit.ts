import 'server-only';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // Epoch timestamp in ms
}

/**
 * Common RateLimiter interface allowing seamless swap between
 * in-memory development and distributed production (e.g. Upstash / Redis).
 */
export interface RateLimiter {
  limit(key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult>;
}

interface TimestampRecord {
  timestamps: number[];
}

/**
 * Sliding-window in-memory rate limiter suitable for development & single-instance node runtimes.
 * Includes periodic garbage collection of expired buckets to avoid memory leaks.
 */
class InMemorySlidingWindowRateLimiter implements RateLimiter {
  private buckets = new Map<string, TimestampRecord>();
  private lastCleanup = Date.now();
  private readonly cleanupIntervalMs = 60_000; // 1 minute

  public async limit(key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    this.maybeCleanup(now, windowMs);

    let record = this.buckets.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.buckets.set(key, record);
    }

    const windowStart = now - windowMs;
    // Keep only timestamps within the sliding window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    const count = record.timestamps.length;
    const resetAt = record.timestamps.length > 0
      ? record.timestamps[0] + windowMs
      : now + windowMs;

    if (count >= maxRequests) {
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        resetAt,
      };
    }

    record.timestamps.push(now);

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - record.timestamps.length,
      resetAt,
    };
  }

  private maybeCleanup(now: number, windowMs: number) {
    if (now - this.lastCleanup < this.cleanupIntervalMs) {
      return;
    }
    this.lastCleanup = now;
    const oldestAllowed = now - windowMs;
    for (const [k, record] of this.buckets.entries()) {
      record.timestamps = record.timestamps.filter((ts) => ts > oldestAllowed);
      if (record.timestamps.length === 0) {
        this.buckets.delete(k);
      }
    }
  }
}

// Global instance of the rate limiter (pluggable with Redis in future phases)
const defaultLimiter: RateLimiter = new InMemorySlidingWindowRateLimiter();

/**
 * Enforces rate limiting on a specific identifier (IP address, user ID, or endpoint key).
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
  customLimiter?: RateLimiter
): Promise<RateLimitResult> {
  const limiter = customLimiter ?? defaultLimiter;
  return limiter.limit(key, maxRequests, windowMs);
}

/**
 * Extracts client IP from standard request headers safely.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return '127.0.0.1';
}
