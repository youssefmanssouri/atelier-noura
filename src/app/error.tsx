'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log masked error details for debugging
    console.error('[Application Boundary Error]', error);
  }, [error]);

  const isAuthError =
    error.name === 'UnauthorizedError' ||
    error.message.includes('Authentication is required') ||
    error.message.includes('Authentication required');
  const isForbiddenError =
    error.name === 'ForbiddenError' ||
    error.message.includes('Access denied');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-[#F3EFEA]">
      <div className="max-w-md w-full space-y-4 rounded border border-[#D9D4CB] bg-[#EFECE6] p-8 shadow-sm">
        <span className="rounded bg-[#9E5D46]/10 px-2.5 py-1 text-xs font-mono font-medium text-[#9E5D46] uppercase">
          {isAuthError ? '401 Unauthorized' : isForbiddenError ? '403 Forbidden' : 'Application Notice'}
        </span>
        <h2 className="text-xl font-normal text-[#1C1B19]">
          {isAuthError
            ? 'Authentication Required'
            : isForbiddenError
            ? 'Access Forbidden'
            : 'An unexpected error occurred'}
        </h2>
        <p className="text-sm text-[#5C5852] leading-relaxed">
          {isAuthError
            ? 'You must be authenticated with authorized studio credentials to access this resource.'
            : isForbiddenError
            ? 'Your account does not possess sufficient privileges to view this management resource.'
            : 'We encountered an issue processing your request. Please try again.'}
        </p>
        <div className="pt-4 flex items-center justify-center gap-4 text-xs border-t border-[#D9D4CB]">
          <Link
            href="/"
            className="text-[#9E5D46] hover:underline underline-offset-4"
          >
            ← Return to Studio Front
          </Link>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded bg-[#1C1B19] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#3D3B37]"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
