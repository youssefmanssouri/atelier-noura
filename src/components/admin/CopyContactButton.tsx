'use client';

import React, { useState } from 'react';

interface CopyContactButtonProps {
  value: string;
  ariaLabel: string;
  buttonText?: string;
}

export function CopyContactButton({
  value,
  ariaLabel,
  buttonText = 'Copy',
}: CopyContactButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older environments or denied permissions
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel}
      className={`text-[11px] font-mono px-1.5 py-0.5 rounded border transition-colors focus:outline-none focus:ring-1 focus:ring-[#A45D49] ${
        copied
          ? 'bg-[#A45D49]/10 text-[#A45D49] border-[#A45D49]/30 font-medium'
          : 'bg-[#FAF8F5] text-[#6F6962] border-[#D9D4CB] hover:border-[#6F6962] hover:text-[#242321]'
      }`}
    >
      {copied ? 'Copied' : buttonText}
    </button>
  );
}
