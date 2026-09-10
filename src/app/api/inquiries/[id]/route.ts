import 'server-only';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifySession } from '@/lib/auth/session';
import { hasPermission } from '@/lib/auth/rbac';
import { inquiryStatusUpdateSchema } from '@/lib/validation/inquiry.schema';
import { logAuditEvent } from '@/lib/audit/audit-logger';
import { handleApiError } from '@/lib/errors/handler';
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '@/lib/errors/AppError';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    // 1. Enforce authentication
    const session = await verifySession();
    if (!session) {
      throw new UnauthorizedError('Authentication required to modify inquiry status.');
    }

    // 2. Enforce permission (inquiries:update)
    if (!hasPermission(session.user.role, 'inquiries:update')) {
      throw new ForbiddenError('You do not possess the required permission to update inquiry status.');
    }

    // 3. Resolve route params
    const { id } = await context.params;
    if (!id || typeof id !== 'string') {
      throw new ValidationError('Inquiry ID is required.');
    }

    // 4. Parse and validate JSON body against inquiryStatusUpdateSchema
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON payload provided.');
    }

    const validatedData = inquiryStatusUpdateSchema.parse(rawBody);

    // 5. Query existing inquiry
    const existingInquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!existingInquiry) {
      throw new NotFoundError(`Inquiry with ID ${id} not found.`);
    }

    // If status is identical, return early without unnecessary mutation
    if (existingInquiry.status === validatedData.status) {
      return NextResponse.json(
        {
          success: true,
          inquiry: existingInquiry,
        },
        { status: 200 }
      );
    }

    // 6. Update status in database
    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: validatedData.status,
      },
    });

    // 7. Record administrative audit log
    await logAuditEvent({
      userId: session.user.id,
      action: 'INQUIRY_STATUS_UPDATED',
      entityType: 'Inquiry',
      entityId: id,
      metadata: {
        oldStatus: existingInquiry.status,
        newStatus: validatedData.status,
        updatedBy: session.user.email,
        userName: session.user.name,
      },
    });

    // 8. Return updated inquiry
    return NextResponse.json(
      {
        success: true,
        inquiry: updatedInquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
