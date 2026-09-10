import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  scope: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Architecture',
    description:
      'Contemporary residential and commercial architecture from early volumetric concept and environmental analysis through municipal planning, technical detailing, and site supervision.',
    scope: 'Private villas · Coastal homes · Spatial planning · Site masterplanning',
  },
  {
    number: '02',
    title: 'Interior Design',
    description:
      'Material palettes, bespoke joinery, architectural lighting, and spatial choreography developed as an inseparable continuation of the architecture rather than surface decoration.',
    scope: 'Custom joinery · Natural stone detailing · Lighting design · Tactile finishes',
  },
  {
    number: '03',
    title: 'Renovation',
    description:
      'Careful adaptation and spatial reconfiguration of historic or existing Moroccan properties, honoring structural integrity and heritage craftsmanship while inserting modern comfort.',
    scope: 'Riad restorations · Heritage adaptations · Structural reconfigurations',
  },
];

export function HomeServices() {
  return (
    <Section spacing="generous" className="border-t border-[#DDD6CC]">
      <Container width="standard">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-xl">
            <SectionLabel index="03" title="Services" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321]">
              Core architectural disciplines.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-sans uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial self-start md:self-end"
          >
            Explore services &amp; process →
          </Link>
        </div>

        {/* Editorial Typographic List (No identical rounded cards) */}
        <div className="divide-y divide-[#DDD6CC] border-y border-[#DDD6CC]">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start"
            >
              {/* Number & Title (Cols 1-5) */}
              <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                  {service.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                  {service.title}
                </h3>
              </div>

              {/* Description & Scope (Cols 6-12) */}
              <div className="lg:col-span-7 space-y-3 lg:pl-4">
                <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                  {service.description}
                </p>
                <p className="font-sans text-xs text-[#242321]/70 tracking-wide font-medium">
                  {service.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default HomeServices;
