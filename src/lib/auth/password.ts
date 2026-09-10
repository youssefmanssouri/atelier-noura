import 'server-only';
import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 12;

// Precomputed 12-round dummy hash for timing attack mitigation when a user is not found
const DUMMY_HASH = '$2a$12$e8rX/e2xPjGz9P2z89L2qOBV0hQZ9Wp0cZgI1M3o.gT6pZ1p8nI.e';

/**
 * Hash a plain text password using bcrypt with a production cost factor of 12.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Verify a plain text password against a stored bcrypt hash.
 * Returns true if the password matches, false otherwise.
 */
export async function verifyPassword(
  plainPassword: string,
  storedHash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword, storedHash);
  } catch {
    return false;
  }
}

/**
 * Perform a dummy comparison to prevent timing attacks when an email is not found.
 */
export async function dummyPasswordVerification(): Promise<void> {
  try {
    await bcrypt.compare('dummy-password-for-timing-consistency', DUMMY_HASH);
  } catch {
    // Silently ignore timing placeholder failure
  }
}
