import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { STUDIO_IMAGES } from '@/lib/constants/images';

export function StudioIntro() {
  return (
    <Section spacing="generous" surface="sand" className="border-t border-[#DDD6CC]">
      <Container width="standard">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Section Identification & Architectural Ethos (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SectionLabel index="02" title="The Studio" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] leading-[1.1] text-[#242321]">
              Architecture shaped by climate, proportion, and quiet habitation.
            </h2>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#6F6962] pt-2">
              Based in Agadir · Practicing across Morocco
            </p>
          </div>

          {/* Right Column: Narrative Prose & Offset Materiality Detail (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-sm sm:text-base font-sans text-[#242321]/85 font-light leading-relaxed max-w-xl">
              <p>
                Our practice is grounded in the distinct environment of southern Morocco: the intensity of Atlantic light, maritime fog, seasonal heat, and the quiet dignity of earthen and limestone structures.
              </p>
              <p>
                Rather than imposing standardized formulas, we design from the ground up—analyzing prevailing sea breezes, shadow trajectories, and regional masonry methods. We believe that true luxury in architecture is found in generous spatial proportions, acoustic calm, and materials that gain depth through age.
              </p>
              <div className="pt-2">
                <Link
                  href="/studio"
                  className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial font-medium"
                >
                  More about our approach and studio →
                </Link>
              </div>
            </div>

            {/* Offset Material Craftsmanship Image */}
            <div className="pt-4 max-w-md">
              <ImageFrame
                src={STUDIO_IMAGES.materialPlasterDetail.src}
                alt={STUDIO_IMAGES.materialPlasterDetail.alt}
                aspectRatio="portrait-4-5"
                caption={STUDIO_IMAGES.materialPlasterDetail.caption}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default StudioIntro;
