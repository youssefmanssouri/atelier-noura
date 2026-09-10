import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { STUDIO_IMAGES } from '@/lib/constants/images';

export function HomeHero() {
  const heroImage = STUDIO_IMAGES.heroArchitecture;

  return (
    <Section spacing="generous" className="pt-10 sm:pt-12 md:pt-14 pb-16 sm:pb-24">
      <Container width="standard">
        {/* Asymmetric Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          {/* Main Statement (Cols 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            <SectionLabel
              title="Architecture · Agadir"
              index="ATELIER NOURA"
              tone="clay"
            />
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] leading-[1.06] text-[#242321] max-w-xl sm:max-w-2xl">
              Spaces shaped by light, material, and place.
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#6F6962] font-light max-w-xl sm:max-w-2xl leading-relaxed">
              We design contemporary residential architecture and interior environments grounded in the coastal atmosphere and tactile masonry of southern Morocco.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="#selected-work"
                className="inline-flex items-center justify-center rounded-[2px] bg-[#242321] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#F2EEE8] transition-colors duration-200 hover:bg-[#302725] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#242321] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EEE8]"
              >
                View selected work
              </a>
              <Link
                href="/contact"
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
              >
                Start a project
              </Link>
            </div>
          </div>

          {/* Quiet Metadata & Geographic Context (Cols 9-12) */}
          <div className="lg:col-span-4 lg:pl-6 border-l border-[#DDD6CC] lg:block hidden">
            <div className="space-y-4 text-xs font-sans text-[#6F6962]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A45D49] block font-medium">
                  Studio Location
                </span>
                <span className="text-[#242321] font-medium block mt-0.5">
                  Agadir, Morocco
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8E2D9]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A45D49] block font-medium">
                  Environmental Focus
                </span>
                <span className="text-[#242321] font-medium block mt-0.5">
                  Atlantic Coast &amp; Souss Valley
                </span>
                <span className="text-[11px] text-[#6F6962] block">
                  Solar orientation · Natural ventilation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Architectural Image Anchor */}
        <div className="w-full">
          <ImageFrame
            src={heroImage.src}
            alt={heroImage.alt}
            aspectRatio="landscape-16-9"
            caption={heroImage.caption}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1400px"
          />
        </div>
      </Container>
    </Section>
  );
}

export default HomeHero;
