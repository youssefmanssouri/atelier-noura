'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface StatusCounts {
  all: number;
  new: number;
  inReview: number;
  contacted: number;
  closed: number;
}

interface InquiryFiltersProps {
  currentStatus: string;
  currentSearch: string;
  counts: StatusCounts;
}

export function InquiryFilters({
  currentStatus,
  currentSearch,
  counts,
}: InquiryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);

  const applyFilters = (newStatus?: string, newSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const statusToApply = newStatus !== undefined ? newStatus : currentStatus;
    const searchToApply = newSearch !== undefined ? newSearch : searchInput;

    if (statusToApply && statusToApply !== 'ALL') {
      params.set('status', statusToApply);
    } else {
      params.delete('status');
    }

    if (searchToApply && searchToApply.trim()) {
      params.set('search', searchToApply.trim());
    } else {
      params.delete('search');
    }

    // Always reset page to 1 when filters change
    params.delete('page');

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleStatusClick = (status: string) => {
    applyFilters(status, undefined);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(undefined, searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    router.push(pathname);
  };

  const hasActiveFilters = (currentStatus && currentStatus !== 'ALL') || Boolean(currentSearch);

  const tabs: Array<{ id: string; label: string; count: number }> = [
    { id: 'ALL', label: 'All Inquiries', count: counts.all },
    { id: 'NEW', label: 'New', count: counts.new },
    { id: 'IN_REVIEW', label: 'In Review', count: counts.inReview },
    { id: 'CONTACTED', label: 'Contacted', count: counts.contacted },
    { id: 'CLOSED', label: 'Closed', count: counts.closed },
  ];

  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by client name, email, location, or message…"
            aria-label="Search inquiries"
            className="w-full rounded border border-[#D9D4CB] bg-[#FAF8F5] px-3 py-2 text-xs text-[#242321] placeholder-[#6F6962]/60 transition-colors focus:border-[#A45D49] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A45D49]"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-[#242321] px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-[#F2EEE8] transition-colors hover:bg-[#302725] focus:outline-none focus:ring-1 focus:ring-[#A45D49]"
        >
          Search
        </button>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="rounded border border-[#D9D4CB] bg-white px-3 py-2 text-xs text-[#6F6962] transition-colors hover:text-[#A45D49] hover:border-[#A45D49] focus:outline-none focus:ring-1 focus:ring-[#A45D49]"
          >
            Clear Filters
          </button>
        )}
      </form>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#D9D4CB]/60 pb-3" role="tablist">
        {tabs.map((tab) => {
          const isActive =
            (!currentStatus && tab.id === 'ALL') || currentStatus === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => handleStatusClick(tab.id)}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-sans transition-colors focus:outline-none focus:ring-1 focus:ring-[#A45D49] ${
                isActive
                  ? 'bg-[#242321] text-[#F2EEE8] font-medium'
                  : 'bg-white text-[#6F6962] border border-[#D9D4CB] hover:text-[#242321] hover:border-[#6F6962]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                  isActive
                    ? 'bg-[#F2EEE8]/20 text-[#F2EEE8]'
                    : 'bg-[#FAF8F5] text-[#6F6962]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
