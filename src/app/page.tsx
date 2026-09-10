import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeHero } from '@/components/home/HomeHero';
import { SelectedWork } from '@/components/home/SelectedWork';
import { StudioIntro } from '@/components/home/StudioIntro';
import { HomeServices } from '@/components/home/HomeServices';
import { HomeCTA } from '@/components/home/HomeCTA';
import { SITE_URL } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Atelier Noura — Architecture & Interior Design in Agadir',
  description:
    'Contemporary architecture, interior design, and spatial planning studio based in Agadir, Morocco. Spaces shaped by light, material, and place.',
  openGraph: {
    title: 'Atelier Noura — Architecture & Interior Design in Agadir',
    description:
      'Contemporary architecture, interior design, and spatial planning studio based in Agadir, Morocco.',
    url: SITE_URL,
    siteName: 'Atelier Noura',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// Organization structured data for Atelier Noura business website
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atelier Noura',
  url: SITE_URL,
  description:
    'Contemporary architecture, interior design, and spatial planning studio based in Agadir, Morocco.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Agadir',
    addressCountry: 'MA',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header currentPath="/" />
      <main id="main-content" className="flex-1">
        <HomeHero />
        <SelectedWork />
        <StudioIntro />
        <HomeServices />
        <HomeCTA />
      </main>
      <Footer />
    </div>
  );
}
