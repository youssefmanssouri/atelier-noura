import React from 'react';

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  children,
  className = '',
}: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-sans font-medium uppercase tracking-[0.14em] text-[#242321]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[#A45D49]" title="Required field">
              *
            </span>
          )}
        </label>
      </div>

      {children}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-[#6F6962] font-sans">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs text-[#A45D49] font-sans font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
