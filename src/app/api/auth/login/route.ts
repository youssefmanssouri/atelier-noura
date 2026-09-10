import 'server-only';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { loginSchema } from '@/lib/validation/auth.schema';
import { verifyPassword, dummyPasswordVerification } from '@/lib/auth/password';
import { createSession, setSessionCookie } from '@/lib/auth/session';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';
import { logAuditEvent } from '@/lib/audit/audit-logger';
import { handleApiError } from '@/lib/errors/handler';
import { RateLimitedError, UnauthorizedError, ValidationError } from '@/lib/errors/AppError';

export async function POST(request: Request) {
  try {
    // 1. Sliding-window rate limit: 5 login attempts per IP per 5 minutes
    const ip = getClientIp(request.headers);
    const rateLimitResult = await checkRateLimit(`login:${ip}`, 5, 5 * 60 * 1000);

    if (!rateLimitResult.success) {
      throw new RateLimitedError(
        'Too many sign-in attempts from your network. Please wait 5 minutes before trying again.'
      );
    }

    // 2. Parse request JSON body safely
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON payload provided.');
    }

    // 3. Validate against loginSchema
    const validatedData = loginSchema.parse(rawBody);

    // 4. Query user by email (case-insensitive normalized by Zod schema)
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // 5. Timing attack mitigation: if user does not exist, run dummy password verification
    if (!user) {
      await dummyPasswordVerification();
      throw new UnauthorizedError('Invalid email or password.');
    }

    // 6. Verify password against stored bcrypt hash
    const isPasswordValid = await verifyPassword(validatedData.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    // 7. Verify account is active
    if (!user.isActive) {
      throw new UnauthorizedError('Account is inactive. Please contact studio administration.');
    }

    // 8. Create session in database and set secure HTTP-only cookie
    const { token, expiresAt } = await createSession(user.id);
    await setSessionCookie(token, expiresAt);

    // 9. Record security audit log
    await logAuditEvent({
      userId: user.id,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.id,
      metadata: {
        email: user.email,
        role: user.role,
      },
    });

    // 10. Return clean success response without leaking user internals
    return NextResponse.json(
      {
        success: true,
        message: 'Authentication successful.',
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
