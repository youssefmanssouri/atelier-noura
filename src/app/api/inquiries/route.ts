import 'server-only';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { inquiryCreateSchema } from '@/lib/validation/inquiry.schema';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';
import { stripControlCharacters, sanitizeEmailHeader } from '@/lib/security/sanitize';
import { emailService } from '@/lib/email/email-service';
import { logAuditEvent } from '@/lib/audit/audit-logger';
import { handleApiError } from '@/lib/errors/handler';
import { RateLimitedError, ValidationError } from '@/lib/errors/AppError';

export async function POST(request: Request) {
  try {
    // 1. Enforce rate limiting: 5 inquiries per IP per 10 minutes
    const ip = getClientIp(request.headers);
    const rateLimitResult = await checkRateLimit(`inquiry:${ip}`, 5, 10 * 60 * 1000);

    if (!rateLimitResult.success) {
      throw new RateLimitedError(
        'Too many inquiries submitted from your network. Please wait a few moments before trying again.'
      );
    }

    // 2. Parse request JSON body safely
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON payload provided.');
    }

    // 3. Validate data strictly against inquiryCreateSchema
    const validatedData = inquiryCreateSchema.parse(rawBody);

    // 4. Sanitize inputs
    const cleanName = stripControlCharacters(validatedData.name).trim();
    const cleanEmail = sanitizeEmailHeader(validatedData.email).toLowerCase();
    const cleanPhone = validatedData.phone
      ? stripControlCharacters(validatedData.phone).trim()
      : null;
    const cleanProjectType = stripControlCharacters(validatedData.projectType).trim();
    const cleanLocation = stripControlCharacters(validatedData.location).trim();
    const cleanApproximateSize = validatedData.approximateSize
      ? stripControlCharacters(validatedData.approximateSize).trim()
      : null;
    const cleanTimeline = stripControlCharacters(validatedData.timeline).trim();
    const cleanMessage = stripControlCharacters(validatedData.message).trim();

    // 5. Persist inquiry in PostgreSQL database via Prisma
    const inquiry = await prisma.inquiry.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        projectType: cleanProjectType,
        location: cleanLocation,
        approximateSize: cleanApproximateSize,
        timeline: cleanTimeline,
        message: cleanMessage,
        status: 'NEW',
      },
    });

    // 6. Record security audit log event
    await logAuditEvent({
      action: 'INQUIRY_CREATED',
      entityType: 'Inquiry',
      entityId: inquiry.id,
      metadata: {
        projectType: cleanProjectType,
        location: cleanLocation,
        timeline: cleanTimeline,
      },
    });

    // 7. Dispatch internal email notification via EmailService abstraction
    // Note: The inquiry has already been successfully persisted to the database.
    // Email dispatch is decoupled so any provider outage, network error, or rate limit
    // does not fail the customer's request or rollback the stored business lead.
    const notificationRecipient =
      process.env.INQUIRY_NOTIFICATION_EMAIL || 'contact@ateliernoura.ma';

    try {
      const emailResult = await emailService.send({
        to: notificationRecipient,
        subject: `New Project Inquiry: ${cleanName} — ${cleanProjectType}`,
        replyTo: cleanEmail,
        text:
          `New architectural project inquiry received for Atelier Noura:\n\n` +
          `Client Name: ${cleanName}\n` +
          `Client Email: ${cleanEmail}\n` +
          (cleanPhone ? `Phone: ${cleanPhone}\n` : '') +
          `Project Typology: ${cleanProjectType}\n` +
          `Site Location: ${cleanLocation}\n` +
          `Timeline: ${cleanTimeline}\n` +
          (cleanApproximateSize ? `Scale / Footprint: ${cleanApproximateSize}\n` : '') +
          `\nProject Brief:\n${cleanMessage}\n\n` +
          `Inquiry ID: ${inquiry.id}\n` +
          `Submitted At: ${new Date().toISOString()}`,
      });

      if (!emailResult.success) {
        console.error('[Inquiry Warning] Notification email dispatch unsuccessful:', {
          inquiryId: inquiry.id,
          error: emailResult.error,
        });
      }
    } catch (emailError: unknown) {
      console.error('[Inquiry Warning] Unexpected error during notification email dispatch:', {
        inquiryId: inquiry.id,
        error: emailError instanceof Error ? emailError.message : 'Unknown email error',
      });
    }

    // 8. Return structured success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your project inquiry has been received. Our studio will review your brief.',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
