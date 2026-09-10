import 'server-only';
import { prisma } from '@/lib/db/prisma';
import type { Prisma } from '@prisma/client';

export interface AuditLogParams {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}

const SENSITIVE_KEYS = new Set([
  'password',
  'passwordhash',
  'token',
  'tokenhash',
  'secret',
  'sessionsecret',
  'authorization',
  'cookie',
]);

/**
 * Strips sensitive keys recursively from metadata before storing in audit logs.
 */
function sanitizeAuditMetadata(obj: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeAuditMetadata(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Record an administrative audit log event.
 */
export async function logAuditEvent(params: AuditLogParams): Promise<void> {
  try {
    const cleanMetadata = params.metadata
      ? (sanitizeAuditMetadata(params.metadata) as Prisma.InputJsonValue)
      : undefined;

    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId ?? null,
        metadata: cleanMetadata,
      },
    });
  } catch (error) {
    // Log failure on the server without breaking the main caller transaction
    console.error('[AuditLog Error] Failed to write audit event:', error);
  }
}
