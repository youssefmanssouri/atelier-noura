import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectMeta } from '@/components/ui/ProjectMeta';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { STUDIO_IMAGES } from '@/lib/constants/images';

export function SelectedWork() {
  return (
    <Section id="selected-work" spacing="generous" className="border-t border-[#DDD6CC]">
      <Container width="standard">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-xl">
            <SectionLabel index="01" title="Selected Work" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321]">
              Recent architecture and interior projects.
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-sans uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial self-start md:self-end"
          >
            View all projects →
          </Link>
        </div>

        {/* Project Compositions (Asymmetric & Varied) */}
        <div className="space-y-24 sm:space-y-32">
          {/* Project 1: Villa Targa (Dominant Anchor Composition) */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <Link href="/projects/villa-targa" className="block group">
                <ImageFrame
                  src={STUDIO_IMAGES.villaTargaHero.src}
                  alt={STUDIO_IMAGES.villaTargaHero.alt}
                  aspectRatio="landscape-16-9"
                  caption="Villa Targa — Courtyard elevation with local limestone masonry"
                />
              </Link>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <ProjectMeta
                location="Agadir, Morocco"
                year={2026}
                category="Residential Architecture"
              />
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                <Link
                  href="/projects/villa-targa"
                  className="hover:text-[#A45D49] transition-colors"
                >
                  Villa Targa
                </Link>
              </h3>
              <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
                A private family residence organized around a shaded limestone courtyard and water basin, shielding living quarters from coastal winds while inviting low winter daylight.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/villa-targa"
                  className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
                >
                  View project case study →
                </Link>
              </div>
            </div>
          </article>

          {/* Project 2 & 3: Asymmetric Duo (Riad Agdal & Coastal Residence) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Project 2: Riad Agdal (5 cols, Portrait) */}
            <article className="lg:col-span-5 space-y-4">
              <Link href="/projects/riad-agdal" className="block group">
                <ImageFrame
                  src={STUDIO_IMAGES.riadAgdalCourtyard.src}
                  alt={STUDIO_IMAGES.riadAgdalCourtyard.alt}
                  aspectRatio="portrait-4-5"
                  caption="Riad Agdal — Restored central patio with terracotta zellige"
                />
              </Link>
              <div className="space-y-3 pt-2">
                <ProjectMeta
                  location="Marrakech, Morocco"
                  year={2025}
                  category="Hospitality &amp; Residential"
                />
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                  <Link
                    href="/projects/riad-agdal"
                    className="hover:text-[#A45D49] transition-colors"
                  >
                    Riad Agdal
                  </Link>
                </h3>
                <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
                  Careful architectural restoration of a historic riad, enhancing passive air cooling through deep cedar colonnades and mineral plaster finishes.
                </p>
                <div>
                  <Link
                    href="/projects/riad-agdal"
                    className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
                  >
                    View project case study →
                  </Link>
                </div>
              </div>
            </article>

            {/* Project 3: Coastal Residence (7 cols, Wide Landscape Offset) */}
            <article className="lg:col-span-7 space-y-4 lg:pt-16">
              <Link href="/projects/coastal-residence" className="block group">
                <ImageFrame
                  src={STUDIO_IMAGES.coastalResidenceOcean.src}
                  alt={STUDIO_IMAGES.coastalResidenceOcean.alt}
                  aspectRatio="landscape-16-9"
                  caption="Coastal Residence — Cliffside cantilevers facing the Atlantic"
                />
              </Link>
              <div className="space-y-3 pt-2">
                <ProjectMeta
                  location="Taghazout, Morocco"
                  year={2025}
                  category="Residential Architecture"
                />
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                  <Link
                    href="/projects/coastal-residence"
                    className="hover:text-[#A45D49] transition-colors"
                  >
                    Coastal Residence
                  </Link>
                </h3>
                <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
                  Stepped terraced volumes cast into the oceanfront hillside, balancing full Atlantic exposure with sheltered courtyards protected from marine mist.
                </p>
                <div>
                  <Link
                    href="/projects/coastal-residence"
                    className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
                  >
                    View project case study →
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Project 4: Café N°7 (Square Composition with Adjacent Spatial Study) */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-[#E8E2D9]">
            <div className="lg:col-span-6 space-y-4 lg:order-1 order-2">
              <ProjectMeta
                location="Agadir, Morocco"
                year={2024}
                category="Commercial Interior"
              />
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                <Link
                  href="/projects/cafe-no-7"
                  className="hover:text-[#A45D49] transition-colors"
                >
                  Café N°7
                </Link>
              </h3>
              <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
                An urban hospitality interior exploring tactile materials: curved acoustic plaster ceilings, honed travertine tables, and patinated bronze fixtures that age gracefully in coastal salt air.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/cafe-no-7"
                  className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
                >
                  View project case study →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-2 order-1">
              <Link href="/projects/cafe-no-7" className="block group">
                <ImageFrame
                  src={STUDIO_IMAGES.cafeNo7Interior.src}
                  alt={STUDIO_IMAGES.cafeNo7Interior.alt}
                  aspectRatio="square-1-1"
                  caption="Café N°7 — Honed travertine seating and bronze counter details"
                />
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}

export default SelectedWork;
