import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_URL } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Contact & Inquiries — Atelier Noura',
  description:
    'Initiate an architectural commission, interior design inquiry, or spatial consultation with Atelier Noura in Agadir, Morocco.',
  openGraph: {
    title: 'Contact & Inquiries — Atelier Noura',
    description:
      'Initiate an architectural commission, interior design inquiry, or spatial consultation with Atelier Noura in Agadir, Morocco.',
    url: `${SITE_URL}/contact`,
    siteName: 'Atelier Noura',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
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
      name: 'Contact',
      item: `${SITE_URL}/contact`,
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Header currentPath="/contact" />

      <main id="main-content" className="flex-1">
        <Section spacing="generous" className="pt-24 sm:pt-32 pb-16 sm:pb-24">
          <Container width="wide">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs font-sans text-[#6F6962] mb-8 flex items-center space-x-2">
              <Link href="/" className="hover:text-[#242321] transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#242321]" aria-current="page">
                Contact
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Editorial Introduction & Process */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-6">
                  <SectionLabel index="01" title="Inquiries & Commissions" />
                  <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-[-0.02em] text-[#242321] leading-[1.08]">
                    Initiate a project inquiry.
                  </h1>
                  <p className="font-sans text-base sm:text-lg text-[#6F6962] font-light leading-relaxed">
                    We welcome commissions for residential architecture, interior transformations, and commercial spaces. Every engagement begins with an open dialogue about site context, spatial objectives, and material craft.
                  </p>
                </div>

                {/* Studio Inquiry Process */}
                <div className="pt-6 border-t border-[#DDD6CC] space-y-5">
                  <h2 className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#A45D49]">
                    Inquiry Process
                  </h2>
                  <ol className="space-y-4 font-sans text-xs text-[#6F6962] leading-relaxed">
                    <li className="flex items-start space-x-3">
                      <span className="font-medium text-[#242321] min-w-[1.25rem]">01.</span>
                      <span>
                        <strong className="font-medium text-[#242321]">Brief &amp; Context</strong> — Share site details, spatial scope, and envisioned timeline via the inquiry form.
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="font-medium text-[#242321] min-w-[1.25rem]">02.</span>
                      <span>
                        <strong className="font-medium text-[#242321]">Consultation</strong> — An in-depth discussion or site visit in Agadir to evaluate light, topography, and feasibility.
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="font-medium text-[#242321] min-w-[1.25rem]">03.</span>
                      <span>
                        <strong className="font-medium text-[#242321]">Design &amp; Execution</strong> — Structured progression from schematic design through technical execution and on-site realization.
                      </span>
                    </li>
                  </ol>
                </div>

                {/* Direct Studio Contact & Location */}
                <div className="pt-6 border-t border-[#DDD6CC] space-y-4 text-xs font-sans text-[#6F6962]">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#242321] block mb-1">
                      Direct Email
                    </span>
                    <a
                      href="mailto:contact@ateliernoura.ma"
                      className="text-[#242321] hover:text-[#A45D49] underline underline-offset-4"
                    >
                      contact@ateliernoura.ma
                    </a>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#242321] block mb-1">
                      Location
                    </span>
                    <p className="text-[#242321]">Agadir, Morocco</p>
                    <p className="text-[11px] text-[#6F6962] mt-0.5">
                      Studio consultations by appointment in Agadir
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#DDD6CC] rounded-[2px] shadow-sm">
                <ContactForm />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
