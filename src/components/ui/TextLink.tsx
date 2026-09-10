import React from 'react';
import Link, { LinkProps } from 'next/link';

export interface TextLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  variant?: 'editorial' | 'plain';
}

export function TextLink({
  children,
  className = '',
  external = false,
  variant = 'editorial',
  ...props
}: TextLinkProps) {
  const underlineClass = variant === 'editorial' ? 'link-editorial' : '';

  if (external) {
    return (
      <a
        href={props.href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321] ${underlineClass} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      {...props}
      className={`font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321] ${underlineClass} ${className}`}
    >
      {children}
    </Link>
  );
}

export default TextLink;
