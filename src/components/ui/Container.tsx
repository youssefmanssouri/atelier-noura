import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: 'standard' | 'reading' | 'wide' | 'full';
  as?: React.ElementType;
  className?: string;
}

const WIDTH_VARIANTS: Record<NonNullable<ContainerProps['width']>, string> = {
  standard: 'max-w-7xl',
  reading: 'max-w-3xl',
  wide: 'max-w-[1440px]',
  full: 'max-w-full',
};

export function Container({
  children,
  width = 'standard',
  as: Component = 'div',
  className = '',
  ...props
}: ContainerProps) {
  const widthClass = WIDTH_VARIANTS[width];

  return (
    <Component
      className={`mx-auto w-full px-6 sm:px-8 md:px-10 lg:px-12 ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
