import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function HomeCTA() {
  return (
    <Section spacing="generous" surface="dark" className="border-t border-[#3D3230]">
      <Container width="reading">
        <div className="space-y-6">
          <SectionLabel index="04" title="Contact &amp; Inquiries" tone="dark" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#F2EEE8] leading-[1.1]">
            Have a space in mind?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#DDD6CC] font-light leading-relaxed max-w-xl">
            Whether you are acquiring land along the southern coast, planning a private residence, or restoring a historic property, we welcome early architectural inquiries.
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[2px] bg-[#F2EEE8] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#242321] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EEE8]"
            >
              Initiate project inquiry
            </Link>
            <a
              href="mailto:contact@ateliernoura.ma"
              className="font-sans text-xs uppercase tracking-[0.16em] text-[#DDD6CC] hover:text-white transition-colors link-editorial"
            >
              contact@ateliernoura.ma
            </a>
          </div>

          {/* Practical Note */}
          <div className="pt-6 border-t border-[#453A37] text-[11px] font-sans text-[#DDD6CC]/60">
            <span>Studio consultations by appointment in Agadir</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HomeCTA;
