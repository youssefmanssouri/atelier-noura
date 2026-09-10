'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';

export interface HeaderProps {
  currentPath?: string;
}

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/studio', label: 'Studio' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ currentPath = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full border-b border-[#DDD6CC] bg-[#F2EEE8] z-30">
      <Container width="standard" className="py-5 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Studio Brand */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321]"
          >
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#242321] transition-colors group-hover:text-[#A45D49]">
              Atelier Noura
            </span>
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.24em] text-[#6F6962]">
              Architecture · Agadir
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <TextLink
                key={link.href}
                href={link.href}
                className={currentPath === link.href ? 'text-[#A45D49]' : ''}
              >
                {link.label}
              </TextLink>
            ))}
          </nav>

          {/* Primary Action */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[2px] bg-[#242321] px-4 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#F2EEE8] transition-colors duration-200 hover:bg-[#302725] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#242321]"
            >
              Start a project
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 text-[#242321] hover:text-[#A45D49] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="text-xs uppercase tracking-widest font-sans font-medium">
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden pt-6 pb-4 border-t border-[#DDD6CC] mt-5 flex flex-col space-y-4"
            aria-label="Mobile Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-serif text-2xl font-normal transition-colors ${
                    isActive
                      ? 'text-[#A45D49]'
                      : 'text-[#242321] hover:text-[#A45D49]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block w-full text-center rounded-[2px] bg-[#242321] py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#F2EEE8]"
              >
                Start a project
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}

export default Header;
