import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'generous' | 'normal' | 'compact' | 'none';
  surface?: 'stone' | 'sand' | 'dark' | 'transparent';
  as?: React.ElementType;
  className?: string;
}

const SPACING_VARIANTS: Record<NonNullable<SectionProps['spacing']>, string> = {
  generous: 'py-24 sm:py-32 lg:py-40',
  normal: 'py-16 sm:py-20 lg:py-28',
  compact: 'py-10 sm:py-14',
  none: 'py-0',
};

const SURFACE_VARIANTS: Record<NonNullable<SectionProps['surface']>, string> = {
  stone: 'bg-[#F2EEE8] text-[#242321]',
  sand: 'bg-[#E5DDD2] text-[#242321]',
  dark: 'bg-[#302725] text-[#F2EEE8]',
  transparent: 'bg-transparent',
};

export function Section({
  children,
  spacing = 'normal',
  surface = 'transparent',
  as: Component = 'section',
  className = '',
  ...props
}: SectionProps) {
  const spacingClass = SPACING_VARIANTS[spacing];
  const surfaceClass = SURFACE_VARIANTS[surface];

  return (
    <Component
      className={`relative w-full ${spacingClass} ${surfaceClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Section;
