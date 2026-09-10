import 'server-only';
import { verifySession, type SafeUser, type SessionData } from '@/lib/auth/session';
import { hasRole, hasPermission, type Permission } from '@/lib/auth/rbac';
import { UnauthorizedError, ForbiddenError } from '@/lib/errors/AppError';
import type { UserRole } from '@prisma/client';

/**
 * Server guard: Enforces that the request has an active, authenticated session.
 * Throws UnauthorizedError if no valid session is found.
 */
export async function requireAuth(): Promise<SessionData> {
  const sessionData = await verifySession();
  if (!sessionData) {
    throw new UnauthorizedError('Authentication is required to access this resource');
  }
  return sessionData;
}

/**
 * Server guard: Enforces that the authenticated user possesses at least the specified role.
 * Throws UnauthorizedError if not authenticated, or ForbiddenError if role is insufficient.
 */
export async function requireRole(requiredRole: UserRole): Promise<SessionData> {
  const sessionData = await requireAuth();

  if (!hasRole(sessionData.user.role, requiredRole)) {
    throw new ForbiddenError(
      `Access denied: Requires ${requiredRole} role. Your role is ${sessionData.user.role}.`
    );
  }

  return sessionData;
}

/**
 * Server guard: Enforces that the authenticated user possesses a specific permission.
 * Throws UnauthorizedError if not authenticated, or ForbiddenError if permission is missing.
 */
export async function requirePermission(permission: Permission): Promise<SessionData> {
  const sessionData = await requireAuth();

  if (!hasPermission(sessionData.user.role, permission)) {
    throw new ForbiddenError(
      `Access denied: You lack the required permission: ${permission}`
    );
  }

  return sessionData;
}

/**
 * Optional session utility: Returns user if authenticated, null otherwise.
 */
export async function getOptionalAuth(): Promise<SafeUser | null> {
  const sessionData = await verifySession();
  return sessionData ? sessionData.user : null;
}
