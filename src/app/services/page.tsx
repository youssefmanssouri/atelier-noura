import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { STUDIO_IMAGES } from '@/lib/constants/images';
import { SITE_URL } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Services & Process — Atelier Noura | Architecture & Interior Design',
  description:
    'Discover architectural design, interior architecture, and heritage renovation services by Atelier Noura in Agadir, Morocco. From volumetric concept to site realization.',
  openGraph: {
    title: 'Services & Process — Atelier Noura | Architecture & Interior Design',
    description:
      'Discover architectural design, interior architecture, and heritage renovation services by Atelier Noura in Agadir, Morocco. From volumetric concept to site realization.',
    url: `${SITE_URL}/services`,
    siteName: 'Atelier Noura',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

const breadcrumbsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: `${SITE_URL}/services`,
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Header currentPath="/services" />

      <main id="main-content" className="flex-1">
        {/* SECTION 01 — Introduction & Practice Scope */}
        <Section spacing="generous" className="pt-24 sm:pt-32 pb-16 sm:pb-24">
          <Container width="wide">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs font-sans text-[#6F6962] mb-8 sm:mb-12 flex items-center space-x-2">
              <Link href="/" className="hover:text-[#242321] transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#242321]" aria-current="page">
                Services
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Heading & Positioning */}
              <div className="lg:col-span-6 space-y-6">
                <SectionLabel index="01" title="Disciplines & Practice" />
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.02em] text-[#242321] leading-[1.08]">
                  Architectural services shaped by environmental context and material rigor.
                </h1>
                <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#6F6962] pt-2">
                  From initial volumetric concept to site realization across Morocco
                </p>
              </div>

              {/* Right Column: Editorial Overview */}
              <div className="lg:col-span-6 space-y-6 lg:pt-4 text-sm sm:text-base font-sans text-[#242321]/85 font-light leading-relaxed max-w-xl">
                <p>
                  Atelier Noura provides architectural design, interior architecture, and heritage renovation services for residential, commercial, and hospitality projects. Based in Agadir, our work is defined by a close engagement with the southern Moroccan environment: orienting structures to prevailing ocean breezes, choreographing Atlantic light, and specifying durable regional materials.
                </p>
                <p>
                  We accompany clients through every phase of spatial creation—translating spatial ambition into clear volumetric concepts, navigating municipal planning, crafting bespoke interior joinery, and conducting rigorous site supervision through project completion.
                </p>
                <div className="pt-2 text-xs font-sans uppercase tracking-[0.16em] text-[#6F6962]">
                  Consultations by appointment in Agadir · Commissions undertaken across Morocco
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECTION 02 — Core Architectural Disciplines */}
        <Section spacing="generous" className="border-t border-[#DDD6CC]">
          <Container width="wide">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
              <div className="space-y-4 max-w-2xl">
                <SectionLabel index="02" title="Services" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321] leading-[1.1]">
                  Three core disciplines.
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                  Each discipline is approached with tectonic rigor, environmental intelligence, and craftsmanship.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-xs font-sans uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial self-start md:self-end font-medium"
              >
                View completed work →
              </Link>
            </div>

            {/* Editorial Typographic Service Breakdown */}
            <div className="divide-y divide-[#DDD6CC] border-y border-[#DDD6CC]">
              {/* 01 — Architecture */}
              <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                    01
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                      Architecture
                    </h3>
                    <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] block mt-1">
                      Spatial &amp; Structural Design
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4 lg:pl-4">
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                    Contemporary residential and commercial architecture from early volumetric concept and environmental analysis through municipal planning, technical detailing, and site supervision. We design private residences, coastal villas, and boutique commercial spaces that respond directly to site topography, solar trajectory, and Atlantic microclimates.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans border-t border-[#DDD6CC]/60 pt-4">
                    <span className="text-[#242321]/70 tracking-wide font-medium">
                      Private villas · Coastal residences · Spatial planning · Site masterplanning
                    </span>
                    <span className="text-[#6F6962] text-[11px]">
                      Demonstrated in{' '}
                      <Link href="/projects/villa-targa" className="text-[#242321] hover:text-[#A45D49] underline underline-offset-2">
                        Villa Targa
                      </Link>
                      {' '}and{' '}
                      <Link href="/projects/coastal-residence" className="text-[#242321] hover:text-[#A45D49] underline underline-offset-2">
                        Coastal Residence
                      </Link>
                    </span>
                  </div>
                </div>
              </div>

              {/* 02 — Interior Design */}
              <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                    02
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                      Interior Design
                    </h3>
                    <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] block mt-1">
                      Tactile &amp; Spatial Detailing
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4 lg:pl-4">
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                    Material palettes, bespoke joinery, architectural lighting, and spatial choreography developed as an inseparable continuation of the architecture rather than surface decoration. From custom oak cabinetry to honed travertine surfaces and tactile lime plaster finishes, we shape interiors that foster acoustic calm and daily ease.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans border-t border-[#DDD6CC]/60 pt-4">
                    <span className="text-[#242321]/70 tracking-wide font-medium">
                      Custom joinery · Natural stone detailing · Architectural lighting · Tactile mineral finishes
                    </span>
                    <span className="text-[#6F6962] text-[11px]">
                      Demonstrated in{' '}
                      <Link href="/projects/cafe-no-7" className="text-[#242321] hover:text-[#A45D49] underline underline-offset-2">
                        Café N°7
                      </Link>
                      {' '}and{' '}
                      <Link href="/projects/villa-targa" className="text-[#242321] hover:text-[#A45D49] underline underline-offset-2">
                        Villa Targa
                      </Link>
                    </span>
                  </div>
                </div>
              </div>

              {/* 03 — Renovation & Heritage Adaptation */}
              <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                    03
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                      Renovation
                    </h3>
                    <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] block mt-1">
                      Heritage &amp; Structural Adaptation
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4 lg:pl-4">
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                    Careful adaptation and spatial reconfiguration of historic or existing Moroccan properties, honoring structural integrity and heritage craftsmanship while inserting modern comfort. We coordinate restoration with traditional craftspeople—reinstating passive courtyard cooling, restoring cedarwood colonnades, and applying authentic tadelakt and zellige.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans border-t border-[#DDD6CC]/60 pt-4">
                    <span className="text-[#242321]/70 tracking-wide font-medium">
                      Riad restorations · Heritage adaptations · Structural reconfigurations
                    </span>
                    <span className="text-[#6F6962] text-[11px]">
                      Demonstrated in{' '}
                      <Link href="/projects/riad-agdal" className="text-[#242321] hover:text-[#A45D49] underline underline-offset-2">
                        Riad Agdal
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECTION 03 — Integrated Practice (Continuum) */}
        <Section spacing="generous" surface="sand" className="border-t border-[#DDD6CC] bg-[#E5DDD2]">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Philosophical Basis */}
              <div className="lg:col-span-5 space-y-6">
                <SectionLabel index="03" title="Integrated Practice" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321] leading-[1.1]">
                  Architecture and interior design as an unbroken continuum.
                </h2>
                <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#6F6962]">
                  Conceived together from the earliest conceptual studies
                </p>
              </div>

              {/* Right Column: Editorial Prose & Accent Imagery */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-5 text-sm sm:text-base font-sans text-[#242321]/85 font-light leading-relaxed max-w-xl">
                  <p>
                    We reject the conventional separation where an architect designs an external concrete envelope and an interior decorator is brought in afterwards to apply finishes. At Atelier Noura, spatial volume, natural illumination, window reveals, cabinetry joinery, and tactile surfaces are conceived as unified elements of a single architectural continuum.
                  </p>
                  <p>
                    By harmonizing exterior structure with internal circulation, acoustic buffering, and built-in furniture from the earliest sketches, we eliminate spatial dissonance and ensure that every room feels calm, purposeful, and thoroughly considered.
                  </p>
                </div>

                {/* Single Approved Anchor Asset */}
                <div className="pt-2 max-w-lg">
                  <ImageFrame
                    src={STUDIO_IMAGES.heroArchitecture.src}
                    alt={STUDIO_IMAGES.heroArchitecture.alt}
                    aspectRatio="landscape-16-9"
                    caption={STUDIO_IMAGES.heroArchitecture.caption}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECTION 04 — Structured Process */}
        <Section spacing="generous" className="border-t border-[#DDD6CC]">
          <Container width="wide">
            {/* Section Heading */}
            <div className="space-y-4 max-w-3xl mb-16 sm:mb-20">
              <SectionLabel index="04" title="Process" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321] leading-[1.1]">
                A considered process from first brief to site realization.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed max-w-2xl">
                A transparent three-stage progression that grounds creative ambition in environmental analysis, technical detailing, and site supervision.
              </p>
            </div>

            {/* Three-Stage Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 border-t border-[#DDD6CC] pt-12">
              {/* Stage 01 */}
              <div className="space-y-4">
                <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest block">
                  01
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#242321]">
                  Brief &amp; Site Context
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6F6962] font-light leading-relaxed">
                  Every project begins with an exploration of place and ambition. We examine site topography, solar exposure, prevailing Atlantic breezes, spatial requirements, and envisioned lifestyle or operational demands to establish a clear architectural brief.
                </p>
                <div className="pt-4 border-t border-[#DDD6CC]/60 text-[11px] font-sans text-[#242321]/70 font-medium">
                  Site analysis · Solar study · Spatial requirements · Envisioned timeline
                </div>
              </div>

              {/* Stage 02 */}
              <div className="space-y-4">
                <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest block">
                  02
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#242321]">
                  Consultation &amp; Feasibility
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6F6962] font-light leading-relaxed">
                  An in-depth consultation or site visit in Agadir to evaluate light, topography, orientation, and feasibility. We establish the project&apos;s volumetric direction and spatial parameters before advancing to formal design development.
                </p>
                <div className="pt-4 border-t border-[#DDD6CC]/60 text-[11px] font-sans text-[#242321]/70 font-medium">
                  Studio consultation · Topography evaluation · Volumetric concept
                </div>
              </div>

              {/* Stage 03 */}
              <div className="space-y-4">
                <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest block">
                  03
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#242321]">
                  Design &amp; Execution
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6F6962] font-light leading-relaxed">
                  Progressive refinement from schematic architectural drawings to detailed technical specifications, bespoke joinery detailing, and material selections. We oversee realization through rigorous on-site supervision to safeguard design fidelity.
                </p>
                <div className="pt-4 border-t border-[#DDD6CC]/60 text-[11px] font-sans text-[#242321]/70 font-medium">
                  Technical detailing · Joinery specifications · On-site supervision
                </div>
              </div>
            </div>

            {/* Practical Consultation Note */}
            <div className="mt-14 pt-6 border-t border-[#DDD6CC] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-[#6F6962] gap-4">
              <span>Studio consultations by appointment in Agadir · Commissions undertaken across Morocco</span>
              <Link
                href="/contact"
                className="text-[#242321] hover:text-[#A45D49] transition-colors link-editorial font-medium"
              >
                Inquire about availability →
              </Link>
            </div>
          </Container>
        </Section>

        {/* SECTION 05 — Closing Engagement CTA */}
        <Section spacing="generous" surface="dark" className="border-t border-[#3D3230] bg-[#302725]">
          <Container width="reading">
            <div className="space-y-6">
              <SectionLabel index="05" title="Inquiries &amp; Commissions" tone="dark" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#F2EEE8] leading-[1.1]">
                Begin with a conversation.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#DDD6CC] font-light leading-relaxed max-w-xl">
                Whether you are planning a private coastal residence, exploring a commercial interior, or restoring a historic property, we welcome early architectural discussions.
              </p>

              {/* Action Row */}
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-[2px] bg-[#F2EEE8] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#242321] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EEE8]"
                >
                  Initiate a Project Inquiry
                </Link>
                <Link
                  href="/projects"
                  className="font-sans text-xs uppercase tracking-[0.16em] text-[#DDD6CC] hover:text-white transition-colors link-editorial"
                >
                  Explore Selected Projects →
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
                <span>Studio consultations by appointment in Agadir · Commissions undertaken across Morocco</span>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
