import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  hasError?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      className = '',
      hasError = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const borderClass = hasError
      ? 'border-[#A45D49] focus:border-[#A45D49] focus:ring-1 focus:ring-[#A45D49]'
      : 'border-[#DDD6CC] focus:border-[#242321] focus:ring-1 focus:ring-[#242321]';

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={`w-full appearance-none rounded-[2px] border bg-[#FAF8F5] px-4 py-3 pr-10 text-sm font-sans text-[#242321] transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed disabled:bg-[#E5DDD2]/30 disabled:opacity-50 ${borderClass} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-[#6F6962]">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="text-[#242321] bg-[#FAF8F5]"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6F6962]"
          aria-hidden="true"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
