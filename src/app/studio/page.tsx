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
  title: 'The Studio — Atelier Noura | Architecture & Interior Design',
  description:
    'Discover Atelier Noura, a contemporary architecture and interior design studio based in Agadir, Morocco. Spaces shaped by climate, proportion, and quiet habitation.',
  openGraph: {
    title: 'The Studio — Atelier Noura | Architecture & Interior Design',
    description:
      'Discover Atelier Noura, a contemporary architecture and interior design studio based in Agadir, Morocco. Spaces shaped by climate, proportion, and quiet habitation.',
    url: `${SITE_URL}/studio`,
    siteName: 'Atelier Noura',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/studio`,
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
      name: 'Studio',
      item: `${SITE_URL}/studio`,
    },
  ],
};

export default function StudioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Header currentPath="/studio" />

      <main id="main-content" className="flex-1">
        {/* Section 01: Studio Introduction & Ethos */}
        <Section spacing="generous" className="pt-24 sm:pt-32 pb-16 sm:pb-24">
          <Container width="wide">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs font-sans text-[#6F6962] mb-8 sm:mb-12 flex items-center space-x-2">
              <Link href="/" className="hover:text-[#242321] transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#242321]" aria-current="page">
                Studio
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Heading & Positioning */}
              <div className="lg:col-span-6 space-y-6">
                <SectionLabel index="01" title="About the Practice" />
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.02em] text-[#242321] leading-[1.08]">
                  Architecture shaped by climate, proportion, and quiet habitation.
                </h1>
                <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#6F6962] pt-2">
                  Based in Agadir · Practicing across Morocco
                </p>
              </div>

              {/* Right Column: Editorial Overview */}
              <div className="lg:col-span-6 space-y-6 lg:pt-4 text-sm sm:text-base font-sans text-[#242321]/85 font-light leading-relaxed max-w-xl">
                <p>
                  Atelier Noura is an architecture and interior design studio based in Agadir, Morocco. Our practice creates residential, commercial, and hospitality spaces that respond directly to the geographic, cultural, and environmental realities of southern Morocco.
                </p>
                <p>
                  Rather than imposing standardized formulas or superficial styling, we approach each commission from the ground up: reading the topography, analyzing prevailing sea breezes and shadow trajectories, and honoring regional masonry traditions.
                </p>
                <p>
                  We believe that architectural quality is measured by how a space feels over time—generous proportions, acoustic calm, honest materiality, and an enduring sense of shelter.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 02: Design Philosophy & Four Core Principles */}
        <Section spacing="generous" surface="sand" className="border-t border-[#DDD6CC]">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Philosophy Narrative & Principles (7 cols) */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-4">
                  <SectionLabel index="02" title="Philosophy & Approach" />
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321] leading-[1.1]">
                    Principles that guide our architectural practice.
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed max-w-xl">
                    Our methodology balances environmental sensitivity with tectonic rigor, ensuring that every spatial volume serves both its occupants and its place.
                  </p>
                </div>

                {/* The Four Core Principles */}
                <div className="divide-y divide-[#DDD6CC] border-y border-[#DDD6CC]">
                  {/* Principle 01 */}
                  <div className="py-8 space-y-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-medium text-[#A45D49] tracking-widest">
                        01
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#242321]">
                        Climate &amp; Orientation
                      </h3>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed pl-8">
                      Every project begins with a careful evaluation of natural forces: Atlantic sun angles, seasonal temperature shifts, and prevailing coastal winds. Through deep reveals, shaded courtyards, and cross-ventilation corridors, we compose structures that temper their interior environment through passive architectural means.
                    </p>
                  </div>

                  {/* Principle 02 */}
                  <div className="py-8 space-y-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-medium text-[#A45D49] tracking-widest">
                        02
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#242321]">
                        Material Integrity
                      </h3>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed pl-8">
                      We privilege materials with authentic texture, permanence, and the ability to gain character with age. Hand-applied lime wash, local limestone, raw cedar, and mineral plasters are selected not as decorative coatings, but as durable tactile components grounded in Moroccan building traditions.
                    </p>
                  </div>

                  {/* Principle 03 */}
                  <div className="py-8 space-y-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-medium text-[#A45D49] tracking-widest">
                        03
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#242321]">
                        Proportion &amp; Light
                      </h3>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed pl-8">
                      Light in southern Morocco is an active building element. We choreograph apertures to soften direct southern glare into quiet, indirect illumination. Balanced ceiling heights, rhythmic colonnades, and thoughtful spatial thresholds give each room dignity and clarity.
                    </p>
                  </div>

                  {/* Principle 04 */}
                  <div className="py-8 space-y-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-medium text-[#A45D49] tracking-widest">
                        04
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#242321]">
                        Habitation &amp; Calm
                      </h3>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed pl-8">
                      Architecture is ultimately an enclosure for daily living. We prioritize acoustic stillness, intuitive circulation between gathering spaces and private sanctuaries, and tactile surfaces that feel inviting to touch. The result is a calm, contemplative environment that supports restorative habitation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Offset Architectural Material Craft Image (5 cols) */}
              <div className="lg:col-span-5 lg:pt-16 space-y-6">
                <ImageFrame
                  src={STUDIO_IMAGES.materialPlasterDetail.src}
                  alt={STUDIO_IMAGES.materialPlasterDetail.alt}
                  aspectRatio="portrait-4-5"
                  caption={STUDIO_IMAGES.materialPlasterDetail.caption}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="p-6 bg-[#E5DDD2] rounded-[2px] space-y-3 border border-[#DDD6CC]">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#A45D49] block">
                    Material Craft
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#242321]/80 leading-relaxed">
                    Mineral lime plaster and natural stone finishes applied throughout our projects create gentle light diffusion and thermal moderation attuned to coastal living.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 03: Architecture + Interior Design as Connected Disciplines */}
        <Section spacing="generous" className="border-t border-[#DDD6CC]">
          <Container width="wide">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
              <div className="space-y-4 max-w-2xl">
                <SectionLabel index="03" title="Interdisciplinary Practice" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321] leading-[1.1]">
                  Architecture and interior design as an unbroken continuum.
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                  We do not draw an artificial boundary where the exterior envelope ends and the interior begins. Spatial volumes, structural joinery, daylight distribution, and tactile finishes are developed as one coherent spatial experience.
                </p>
              </div>
            </div>

            {/* Disciplines Breakdown */}
            <div className="divide-y divide-[#DDD6CC] border-y border-[#DDD6CC]">
              {/* Discipline 01 */}
              <div className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                    01
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                    Architecture
                  </h3>
                </div>
                <div className="lg:col-span-7 space-y-3 lg:pl-4">
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                    Contemporary residential and commercial architecture from early volumetric concept and environmental analysis through municipal planning, technical detailing, and site supervision.
                  </p>
                  <p className="font-sans text-xs text-[#242321]/70 tracking-wide font-medium">
                    Private villas · Coastal homes · Spatial planning · Site masterplanning
                  </p>
                </div>
              </div>

              {/* Discipline 02 */}
              <div className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                    02
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                    Interior Design
                  </h3>
                </div>
                <div className="lg:col-span-7 space-y-3 lg:pl-4">
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                    Material palettes, bespoke joinery, architectural lighting, and spatial choreography developed as an inseparable continuation of the architecture rather than surface decoration.
                  </p>
                  <p className="font-sans text-xs text-[#242321]/70 tracking-wide font-medium">
                    Custom joinery · Natural stone detailing · Lighting design · Tactile finishes
                  </p>
                </div>
              </div>

              {/* Discipline 03 */}
              <div className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#A45D49] tracking-widest">
                    03
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321]">
                    Renovation
                  </h3>
                </div>
                <div className="lg:col-span-7 space-y-3 lg:pl-4">
                  <p className="font-sans text-sm sm:text-base text-[#6F6962] font-light leading-relaxed">
                    Careful adaptation and spatial reconfiguration of historic or existing Moroccan properties, honoring structural integrity and heritage craftsmanship while inserting modern comfort.
                  </p>
                  <p className="font-sans text-xs text-[#242321]/70 tracking-wide font-medium">
                    Riad restorations · Heritage adaptations · Structural reconfigurations
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 04: Regional Grounding in Agadir & Southern Morocco */}
        <Section spacing="generous" surface="sand" className="border-t border-[#DDD6CC]">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Geographic Context & Identity */}
              <div className="lg:col-span-5 space-y-6">
                <SectionLabel index="04" title="Regional Grounding" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321] leading-[1.1]">
                  Grounded in Agadir and the southern coast.
                </h2>
                <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#6F6962] pt-2">
                  Atlantic light · Maritime breezes · Southern traditions
                </p>
              </div>

              {/* Right Column: Context Narrative */}
              <div className="lg:col-span-7 space-y-6 text-sm sm:text-base font-sans text-[#242321]/85 font-light leading-relaxed max-w-xl">
                <p>
                  Agadir holds a singular place in Moroccan architectural consciousness. Rebuilt with clarity and modernist purpose following the 1960 earthquake, the city possesses an openness to horizontal light, coastal air, and clean structural form that distinguishes it from northern imperial centers.
                </p>
                <p>
                  Our work honors this lineage by pairing clean geometric volumes with the timeless tactility of southern Moroccan masonry, thick lime wash walls, and shaded courtyard circulation.
                </p>
                <p>
                  Whether working in Agadir, Taghazout, or broader Morocco, we engage closely with local craftspeople and regional materials to ensure every project belongs unmistakably to its setting.
                </p>
                <div className="pt-4 border-t border-[#DDD6CC] flex flex-wrap gap-6 text-xs font-sans text-[#6F6962]">
                  <div>
                    <span className="font-medium text-[#242321] block">Location</span>
                    <span>Agadir, Morocco</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#242321] block">Practice</span>
                    <span>Across Morocco</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#242321] block">Consultations</span>
                    <span>By appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 05: Closing Engagement CTA */}
        <Section spacing="generous" surface="dark" className="border-t border-[#3D3230]">
          <Container width="reading">
            <div className="space-y-6">
              <SectionLabel index="05" title="Inquiries &amp; Commissions" tone="dark" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#F2EEE8] leading-[1.1]">
                Initiate a conversation.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#DDD6CC] font-light leading-relaxed max-w-xl">
                Whether you are acquiring coastal land, planning a private residence, or undertaking a sensitive restoration, we welcome early architectural inquiries.
              </p>

              {/* Action Row */}
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-[2px] bg-[#F2EEE8] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#242321] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EEE8]"
                >
                  Initiate a Conversation
                </Link>
                <Link
                  href="/projects"
                  className="font-sans text-xs uppercase tracking-[0.16em] text-[#DDD6CC] hover:text-white transition-colors link-editorial"
                >
                  View Projects →
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
                <span>Studio consultations by appointment in Agadir · Practicing across Morocco</span>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
