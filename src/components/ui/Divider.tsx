import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  tone?: 'subtle' | 'light' | 'dark';
  className?: string;
}

const TONE_CLASSES = {
  subtle: 'bg-[#DDD6CC]',
  light: 'bg-[#E8E2D9]',
  dark: 'bg-[#6F6962]/30',
};

export function Divider({
  orientation = 'horizontal',
  tone = 'subtle',
  className = '',
}: DividerProps) {
  const toneClass = TONE_CLASSES[tone];

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block h-full min-h-[1em] w-px self-stretch ${toneClass} ${className}`}
      />
    );
  }

  return (
    <hr
      className={`w-full border-0 h-px my-6 sm:my-8 ${toneClass} ${className}`}
    />
  );
}

export default Divider;
