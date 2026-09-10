import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', hasError = false, disabled = false, rows = 4, ...props }, ref) => {
    const borderClass = hasError
      ? 'border-[#A45D49] focus:border-[#A45D49] focus:ring-1 focus:ring-[#A45D49]'
      : 'border-[#DDD6CC] focus:border-[#242321] focus:ring-1 focus:ring-[#242321]';

    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`w-full resize-y rounded-[2px] border bg-[#FAF8F5] px-4 py-3 text-sm font-sans leading-relaxed text-[#242321] placeholder:text-[#6F6962]/50 transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed disabled:bg-[#E5DDD2]/30 disabled:opacity-50 ${borderClass} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
