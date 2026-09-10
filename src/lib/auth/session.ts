import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db/prisma';
import type { UserRole } from '@prisma/client';

export const SESSION_COOKIE_NAME = 'atelier_session';
export const SESSION_DURATION_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionData {
  user: SafeUser;
  session: {
    id: string;
    expiresAt: Date;
  };
}

/**
 * Hash a raw session token with SHA-256 for secure database storage.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate a cryptographically secure random session token.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a new database-backed session for a user and return the raw token.
 */
export async function createSession(userId: string): Promise<{ token: string; expiresAt: Date }> {
  const token = generateSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

/**
 * Set the session cookie on the outgoing response.
 */
export async function setSessionCookie(token: string, expiresAt: Date): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

/**
 * Retrieve the raw session token from incoming request cookies.
 */
export async function getSessionTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  return cookie?.value ?? null;
}

/**
 * Verify the current request session against the database.
 * Returns the authenticated user and session metadata, or null if invalid/expired.
 */
export async function verifySession(): Promise<SessionData | null> {
  const token = await getSessionTokenFromCookie();
  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  // Check expiration
  if (session.expiresAt.getTime() <= Date.now()) {
    // Session expired; clean up asynchronously
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  // Check if account is still active
  if (!session.user.isActive) {
    return null;
  }

  return {
    user: session.user,
    session: {
      id: session.id,
      expiresAt: session.expiresAt,
    },
  };
}

/**
 * Revoke a specific session by its raw token.
 */
export async function revokeSession(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await prisma.session.deleteMany({
    where: { tokenHash },
  });
}

/**
 * Terminate the active session: remove from DB and delete the cookie.
 */
export async function logout(): Promise<void> {
  const token = await getSessionTokenFromCookie();
  if (token) {
    await revokeSession(token);
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
