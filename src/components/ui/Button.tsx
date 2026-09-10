import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#242321] text-[#F2EEE8] hover:bg-[#302725] active:bg-[#141312] border border-[#242321]',
  secondary:
    'bg-transparent text-[#242321] border border-[#242321] hover:bg-[#242321] hover:text-[#F2EEE8] active:bg-[#302725]',
  tertiary:
    'bg-transparent text-[#242321] hover:text-[#A45D49] border-none p-0 link-editorial',
};

const SIZE_STYLES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3.5 py-1.5 text-[11px] tracking-[0.14em]',
  md: 'px-5 py-2.5 text-xs tracking-[0.16em]',
  lg: 'px-7 py-3.5 text-xs tracking-[0.18em]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isTertiary = variant === 'tertiary';
    const variantClass = VARIANT_STYLES[variant];
    const sizeClass = isTertiary ? '' : SIZE_STYLES[size];
    const widthClass = fullWidth ? 'w-full' : 'w-auto';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#242321] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EEE8] disabled:cursor-not-allowed disabled:opacity-40 rounded-[2px] ${variantClass} ${sizeClass} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
