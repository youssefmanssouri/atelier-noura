import React from 'react';

export interface SectionLabelProps {
  index?: string;
  title: string;
  tone?: 'default' | 'dark' | 'clay';
  className?: string;
}

export function SectionLabel({
  index,
  title,
  tone = 'default',
  className = '',
}: SectionLabelProps) {
  const toneClasses = {
    default: 'text-[#6F6962] border-[#DDD6CC]',
    dark: 'text-[#DDD6CC] border-[#6F6962]',
    clay: 'text-[#A45D49] border-[#A45D49]/30',
  }[tone];

  return (
    <div className={`inline-flex items-center gap-2.5 pb-2 text-[11px] font-sans font-medium uppercase tracking-[0.22em] ${toneClasses} ${className}`}>
      {index && (
        <>
          <span className="opacity-90">{index}</span>
          <span className="opacity-40">/</span>
        </>
      )}
      <span>{title}</span>
    </div>
  );
}

export default SectionLabel;
