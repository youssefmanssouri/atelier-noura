import 'server-only';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AppError } from '@/lib/errors/AppError';

export interface ApiErrorResponse {
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

/**
 * Global API error handler for Route Handlers and Server Endpoints.
 * Strictly guarantees that no stack traces, SQL errors, or internal paths
 * are ever leaked to public clients.
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  // 1. Known typed operational errors (AppError)
  if (error instanceof AppError) {
    // Log unexpected 500s internally
    if (error.statusCode >= 500) {
      console.error('[Internal AppError]', {
        message: error.message,
        code: error.code,
        details: error.details,
      });
    }

    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  // 2. Zod validation errors
  if (error instanceof ZodError) {
    const formattedDetails = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return NextResponse.json(
      {
        error: {
          message: 'Invalid input data',
          code: 'VALIDATION_ERROR',
          details: formattedDetails,
        },
      },
      { status: 400 }
    );
  }

  // 3. Unhandled exceptions (Prisma, system runtime, networking, etc.)
  // Log full error details server-side only
  console.error('[Unhandled System Error]', error);

  // Return strictly masked, safe generic response to the client
  return NextResponse.json(
    {
      error: {
        message: 'An internal server error occurred. Please try again later.',
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  );
}
