'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface InquiryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export function InquiryPagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
}: InquiryPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalCount === 0 || totalPages <= 1) {
    return null;
  }

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D9D4CB]/60 text-xs text-[#6F6962]">
      <div>
        Showing <strong className="font-medium text-[#242321]">{startItem}</strong>–
        <strong className="font-medium text-[#242321]">{endItem}</strong> of{' '}
        <strong className="font-medium text-[#242321]">{totalCount}</strong> inquiries
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page of inquiries"
          className="rounded border border-[#D9D4CB] bg-white px-3 py-1.5 text-xs text-[#242321] transition-colors hover:border-[#6F6962] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-[#A45D49]"
        >
          ← Previous
        </button>

        <span className="px-2 font-mono text-[11px] text-[#6F6962]">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page of inquiries"
          className="rounded border border-[#D9D4CB] bg-white px-3 py-1.5 text-xs text-[#242321] transition-colors hover:border-[#6F6962] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-[#A45D49]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
