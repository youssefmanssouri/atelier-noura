'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export type InquiryStatus = 'NEW' | 'IN_REVIEW' | 'CONTACTED' | 'CLOSED';

interface InquiryStatusSelectorProps {
  inquiryId: string;
  initialStatus: InquiryStatus;
}

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  NEW: {
    label: 'New',
    bg: 'bg-[#A45D49]/10',
    text: 'text-[#A45D49]',
    border: 'border-[#A45D49]/30',
  },
  IN_REVIEW: {
    label: 'In Review',
    bg: 'bg-[#C2822B]/10',
    text: 'text-[#965E12]',
    border: 'border-[#C2822B]/30',
  },
  CONTACTED: {
    label: 'Contacted',
    bg: 'bg-[#2E6B65]/10',
    text: 'text-[#24544F]',
    border: 'border-[#2E6B65]/30',
  },
  CLOSED: {
    label: 'Closed',
    bg: 'bg-[#6F6962]/10',
    text: 'text-[#6F6962]',
    border: 'border-[#D9D4CB]',
  },
};

export function InquiryStatusSelector({
  inquiryId,
  initialStatus,
}: InquiryStatusSelectorProps) {
  const router = useRouter();
  const [status, setStatus] = useState<InquiryStatus>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as InquiryStatus;
    if (newStatus === status) return;

    const previousStatus = status;
    setStatus(newStatus);
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(previousStatus);
        setError(data.error?.message || 'Failed to update status.');
        setIsUpdating(false);
        return;
      }

      setIsUpdating(false);
      router.refresh();
    } catch {
      setStatus(previousStatus);
      setError('Network error updating status.');
      setIsUpdating(false);
    }
  };

  const currentConfig = STATUS_CONFIG[status] || STATUS_CONFIG.NEW;

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex items-center">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          aria-label={`Update status for inquiry ${inquiryId}. Current status is ${currentConfig.label}`}
          className={`appearance-none rounded border px-2.5 py-1 pr-6 text-[11px] font-medium tracking-wide uppercase transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A45D49] disabled:cursor-not-allowed disabled:opacity-60 ${currentConfig.bg} ${currentConfig.text} ${currentConfig.border}`}
        >
          <option value="NEW">New</option>
          <option value="IN_REVIEW">In Review</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed</option>
        </select>
        {/* Custom chevron indicator */}
        <span className="pointer-events-none absolute right-2 text-[10px] text-current opacity-70">
          ▼
        </span>
      </div>

      {isUpdating && (
        <span className="text-[10px] font-mono text-[#6F6962] animate-pulse">
          Saving…
        </span>
      )}

      {error && (
        <span
          role="alert"
          className="text-[10px] text-[#A45D49] font-sans"
          title={error}
        >
          {error}
        </span>
      )}
    </div>
  );
}
