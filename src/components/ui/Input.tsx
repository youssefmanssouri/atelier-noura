import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', hasError = false, disabled = false, ...props }, ref) => {
    const borderClass = hasError
      ? 'border-[#A45D49] focus:border-[#A45D49] focus:ring-1 focus:ring-[#A45D49]'
      : 'border-[#DDD6CC] focus:border-[#242321] focus:ring-1 focus:ring-[#242321]';

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={`w-full rounded-[2px] border bg-[#FAF8F5] px-4 py-3 text-sm font-sans text-[#242321] placeholder:text-[#6F6962]/50 transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed disabled:bg-[#E5DDD2]/30 disabled:opacity-50 ${borderClass} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
