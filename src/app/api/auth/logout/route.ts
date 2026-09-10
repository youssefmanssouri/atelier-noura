import 'server-only';
import { NextResponse } from 'next/server';
import { verifySession, logout } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/audit-logger';
import { handleApiError } from '@/lib/errors/handler';

export async function POST() {
  try {
    const session = await verifySession();

    if (session) {
      await logAuditEvent({
        userId: session.user.id,
        action: 'USER_LOGOUT',
        entityType: 'User',
        entityId: session.user.id,
        metadata: {
          email: session.user.email,
        },
      });
    }

    // Terminate session and clear cookie
    await logout();

    return NextResponse.json(
      {
        success: true,
        message: 'Signed out successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
