import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#DDD6CC] bg-[#E5DDD2] text-[#242321] mt-auto">
      <Container width="standard" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Studio Info (Cols 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-normal tracking-[-0.01em] block">
              Atelier Noura
            </span>
            <p className="font-sans text-xs text-[#6F6962] leading-relaxed max-w-sm">
              Contemporary architecture, interior design, and spatial planning studio creating thoughtful residential and commercial spaces.
            </p>
            <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962]">
              Agadir · Morocco
            </p>
          </div>

          {/* Navigation (Cols 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] block">
              Studio
            </span>
            <ul className="space-y-2.5">
              <li>
                <TextLink href="/projects">Projects</TextLink>
              </li>
              <li>
                <TextLink href="/studio">About the Studio</TextLink>
              </li>
              <li>
                <TextLink href="/services">Services &amp; Process</TextLink>
              </li>
              <li>
                <TextLink href="/contact">Inquire</TextLink>
              </li>
            </ul>
          </div>

          {/* Contact (Cols 9-12) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] block">
              Direct Contact
            </span>
            <p className="font-sans text-xs text-[#242321] leading-relaxed">
              Agadir, Morocco
            </p>
            <p className="font-sans text-xs pt-1">
              <a
                href="mailto:contact@ateliernoura.ma"
                className="link-editorial text-[#242321] hover:text-[#A45D49]"
              >
                contact@ateliernoura.ma
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[#DDD6CC] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-sans text-[#6F6962] gap-4">
          <p>© {currentYear} Atelier Noura. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-[#242321] transition-colors">
              Studio Portal
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
