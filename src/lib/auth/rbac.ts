import type { UserRole } from '@prisma/client';

export type Permission =
  | 'projects:read'
  | 'projects:create'
  | 'projects:update'
  | 'projects:delete'
  | 'inquiries:read'
  | 'inquiries:update'
  | 'inquiries:delete'
  | 'services:manage'
  | 'users:manage'
  | 'audit:read'
  | 'settings:manage';

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  STAFF: [
    'projects:read',
    'projects:create',
    'projects:update',
    'inquiries:read',
    'inquiries:update',
    'services:manage',
  ],
  OWNER: [
    'projects:read',
    'projects:create',
    'projects:update',
    'projects:delete',
    'inquiries:read',
    'inquiries:update',
    'inquiries:delete',
    'services:manage',
    'users:manage',
    'audit:read',
    'settings:manage',
  ],
};

const ROLE_RANK: Record<UserRole, number> = {
  STAFF: 1,
  OWNER: 2,
};

/**
 * Check whether a user's role satisfies the required role rank.
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_RANK[userRole] >= ROLE_RANK[requiredRole];
}

/**
 * Check whether a role possesses a specific permission.
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions ? permissions.includes(permission) : false;
}
