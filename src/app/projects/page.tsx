import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { ProjectsCTA } from '@/components/projects/ProjectsCTA';

import { SITE_URL } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Projects — Atelier Noura',
  description:
    'Selected architecture, interior design, and spatial projects by Atelier Noura across southern Morocco.',
  openGraph: {
    title: 'Projects — Atelier Noura',
    description:
      'Selected architecture, interior design, and spatial projects by Atelier Noura.',
    url: `${SITE_URL}/projects`,
    siteName: 'Atelier Noura',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

// BreadcrumbList structured data
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
      name: 'Projects',
      item: `${SITE_URL}/projects`,
    },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Header currentPath="/projects" />

      <main id="main-content" className="flex-1">
        {/* Editorial Introduction */}
        <Section spacing="generous" className="pt-24 sm:pt-32 pb-8 sm:pb-12">
          <Container width="wide">
            <div className="max-w-3xl space-y-6">
              <SectionLabel index="01" title="PROJECTS" />
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.02em] text-[#242321] leading-[1.08]">
                Selected spaces, shaped by context.
              </h1>
              <p className="font-sans text-base sm:text-lg text-[#6F6962] font-light leading-relaxed max-w-2xl">
                Our portfolio explores residential, hospitality, and interior projects across southern Morocco. Each work responds directly to local climate, orientation, and indigenous material palettes—grounded in regional masonry, lime plaster, and filtered Atlantic light.
              </p>
            </div>
          </Container>
        </Section>

        {/* Project Filter & Index */}
        <Section spacing="generous" className="pt-0 sm:pt-0">
          <Container width="wide">
            <ProjectsList />
          </Container>
        </Section>

        {/* Closing CTA */}
        <ProjectsCTA />
      </main>

      <Footer />
    </div>
  );
}
