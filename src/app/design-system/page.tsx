'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectMeta } from '@/components/ui/ProjectMeta';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Divider } from '@/components/ui/Divider';
import { STUDIO_IMAGES } from '@/lib/constants/images';

export default function DesignSystemPage() {
  const sampleSelectOptions = [
    { value: 'residential', label: 'Residential Architecture' },
    { value: 'interior', label: 'Interior Architecture & Renovation' },
    { value: 'hospitality', label: 'Hospitality & Commercial' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <Header currentPath="/design-system" />

      <main className="flex-1">
        {/* System Header Banner */}
        <Section spacing="compact" surface="sand" className="border-b border-[#DDD6CC]">
          <Container width="standard">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <SectionLabel index="DS" title="Internal Preview" tone="clay" />
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] text-[#242321]">
                  Atelier Noura Design System
                </h1>
              </div>
              <p className="font-sans text-xs text-[#6F6962] max-w-xs leading-relaxed">
                Architectural design tokens, typography pairings, layout grids, and interactive primitives for verification.
              </p>
            </div>
          </Container>
        </Section>

        {/* 1. Color System */}
        <Section spacing="normal">
          <Container width="standard">
            <SectionLabel index="01" title="Color System" />
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-2 mb-8">
              Restrained Architectural Palette
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Warm Stone */}
              <div className="space-y-2">
                <div className="h-24 w-full rounded-[2px] bg-[#F2EEE8] border border-[#DDD6CC]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#242321]">Warm Stone</p>
                  <p className="text-[11px] font-sans text-[#6F6962]">#F2EEE8 · Primary Surface</p>
                </div>
              </div>

              {/* Soft Sand */}
              <div className="space-y-2">
                <div className="h-24 w-full rounded-[2px] bg-[#E5DDD2] border border-[#DDD6CC]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#242321]">Soft Sand</p>
                  <p className="text-[11px] font-sans text-[#6F6962]">#E5DDD2 · Secondary Surface</p>
                </div>
              </div>

              {/* Deep Charcoal */}
              <div className="space-y-2">
                <div className="h-24 w-full rounded-[2px] bg-[#242321]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#242321]">Deep Charcoal</p>
                  <p className="text-[11px] font-sans text-[#6F6962]">#242321 · Primary Text / Solid</p>
                </div>
              </div>

              {/* Warm Gray */}
              <div className="space-y-2">
                <div className="h-24 w-full rounded-[2px] bg-[#6F6962]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#242321]">Warm Gray</p>
                  <p className="text-[11px] font-sans text-[#6F6962]">#6F6962 · Secondary Text</p>
                </div>
              </div>

              {/* Muted Clay */}
              <div className="space-y-2">
                <div className="h-24 w-full rounded-[2px] bg-[#A45D49]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#242321]">Muted Clay</p>
                  <p className="text-[11px] font-sans text-[#6F6962]">#A45D49 · Architectural Accent</p>
                </div>
              </div>

              {/* Dark Surface */}
              <div className="space-y-2">
                <div className="h-24 w-full rounded-[2px] bg-[#302725]" />
                <div>
                  <p className="text-xs font-sans font-medium text-[#242321]">Deep Brown-Charcoal</p>
                  <p className="text-[11px] font-sans text-[#6F6962]">#302725 · Dark Editorial Surface</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* 2. Typography Scale */}
        <Section spacing="normal">
          <Container width="standard">
            <SectionLabel index="02" title="Typography Hierarchy" />
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-2 mb-10">
              Editorial Serif &amp; Understated Geometric Sans
            </h2>

            <div className="space-y-10">
              {/* Display */}
              <div className="border-b border-[#DDD6CC] pb-8">
                <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                  Display Serif — Cormorant Garamond Light
                </p>
                <p className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-[-0.02em] leading-[1.05] text-[#242321]">
                  Thoughtful Spaces in Agadir
                </p>
              </div>

              {/* Heading 1 */}
              <div className="border-b border-[#DDD6CC] pb-8">
                <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                  Heading 1 — Cormorant Garamond Regular
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.015em] leading-[1.1] text-[#242321]">
                  Architecture Grounded in Materiality and Light
                </h1>
              </div>

              {/* Heading 2 */}
              <div className="border-b border-[#DDD6CC] pb-8">
                <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                  Heading 2 — Cormorant Garamond Regular
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-[-0.01em] text-[#242321]">
                  Residential &amp; Commercial Spatial Projects
                </h2>
              </div>

              {/* Heading 3 */}
              <div className="border-b border-[#DDD6CC] pb-8">
                <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                  Heading 3 — Cormorant Garamond Medium
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#242321]">
                  Villa Targa — Private Residence
                </h3>
              </div>

              {/* Body Typography Pairings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                    Body Large (Plus Jakarta Sans Light)
                  </p>
                  <p className="font-sans text-lg font-light text-[#242321] leading-relaxed">
                    Atelier Noura responds to the distinct coastal climate and mineral landscape of southern Morocco through tactile materials.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                    Body (Plus Jakarta Sans Regular)
                  </p>
                  <p className="font-sans text-sm text-[#242321]/85 leading-relaxed">
                    Every project begins with a careful reading of site orientation, wind patterns, and local vernacular techniques, translating them into contemporary clarity.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#6F6962] mb-2">
                    Metadata &amp; Eyebrow
                  </p>
                  <ProjectMeta
                    location="Agadir, Morocco"
                    year={2026}
                    category="Residential"
                    scope="Complete Build"
                  />
                  <p className="text-xs text-[#6F6962] mt-4 font-sans">
                    Caption: Recessed aperture allowing filtered south-facing solar daylight.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* 3. Button & Link System */}
        <Section spacing="normal">
          <Container width="standard">
            <SectionLabel index="03" title="Action System" />
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-2 mb-8">
              Understated Buttons &amp; Editorial Links
            </h2>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tertiary Link Button</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-8">
                <TextLink href="/projects">Editorial Navigation Link</TextLink>
                <TextLink href="https://example.com" external>
                  External Reference ↗
                </TextLink>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* 4. Form Controls */}
        <Section spacing="normal">
          <Container width="reading">
            <SectionLabel index="04" title="Form Architecture" />
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-2 mb-2">
              Inquiry Form Controls
            </h2>
            <p className="text-xs text-[#6F6962] mb-8 font-sans">
              Structured form primitives designed for comprehensive client inquiries rather than generic SaaS signups.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField id="demo-name" label="Full Name" required>
                  <Input id="demo-name" placeholder="e.g. Yasmine Benali" />
                </FormField>

                <FormField id="demo-email" label="Email Address" required>
                  <Input id="demo-email" type="email" placeholder="yasmine@example.com" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField id="demo-type" label="Project Type" required>
                  <Select
                    id="demo-type"
                    placeholder="Select project typology"
                    options={sampleSelectOptions}
                  />
                </FormField>

                <FormField
                  id="demo-location"
                  label="Project Location"
                  required
                  helperText="City or region of the property"
                >
                  <Input id="demo-location" placeholder="e.g. Taghazout Bay, Agadir" />
                </FormField>
              </div>

              <FormField
                id="demo-message"
                label="Project Overview &amp; Requirements"
                required
                helperText="Describe spatial goals, estimated scale, and envisioned timeline"
              >
                <Textarea
                  id="demo-message"
                  rows={4}
                  placeholder="Tell us about the property, architectural intent, or renovation scope..."
                />
              </FormField>

              {/* Demonstration of Error State */}
              <FormField
                id="demo-error"
                label="Validation Error State Demonstration"
                required
                error="Please specify a valid site location or postal district"
              >
                <Input id="demo-error" hasError defaultValue="Invalid input example" />
              </FormField>

              <div className="pt-2">
                <Button variant="primary" size="lg">
                  Submit Project Inquiry
                </Button>
              </div>
            </form>
          </Container>
        </Section>

        <Divider />

        {/* 5. Image System & Aspect Ratios */}
        <Section spacing="normal">
          <Container width="standard">
            <SectionLabel index="05" title="Photography System" />
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-2 mb-8">
              Architectural Ratios &amp; Editorial Compositions
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Asymmetric composition: Large Landscape (8 cols) */}
              <div className="lg:col-span-8">
                <ImageFrame
                  src={STUDIO_IMAGES.villaTargaHero.src}
                  alt={STUDIO_IMAGES.villaTargaHero.alt}
                  aspectRatio="landscape-16-9"
                  caption={STUDIO_IMAGES.villaTargaHero.caption}
                />
              </div>

              {/* Narrow Portrait Beside (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <ImageFrame
                  src={STUDIO_IMAGES.villaTargaInterior.src}
                  alt={STUDIO_IMAGES.villaTargaInterior.alt}
                  aspectRatio="portrait-4-5"
                  caption={STUDIO_IMAGES.villaTargaInterior.caption}
                />
              </div>
            </div>

            {/* Panoramic Wide & Square grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="md:col-span-2">
                <ImageFrame
                  src={STUDIO_IMAGES.coastalResidenceOcean.src}
                  alt={STUDIO_IMAGES.coastalResidenceOcean.alt}
                  aspectRatio="wide-21-9"
                  caption={STUDIO_IMAGES.coastalResidenceOcean.caption}
                />
              </div>
              <div className="md:col-span-1">
                <ImageFrame
                  src={STUDIO_IMAGES.cafeNo7Interior.src}
                  alt={STUDIO_IMAGES.cafeNo7Interior.alt}
                  aspectRatio="square-1-1"
                  caption={STUDIO_IMAGES.cafeNo7Interior.caption}
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* 6. Dark Editorial Surface Section */}
        <Section spacing="generous" surface="dark">
          <Container width="reading">
            <SectionLabel index="06" title="Dark Editorial Surface" tone="dark" />
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.01em] text-[#F2EEE8] mt-2 mb-6">
              Contrast &amp; Atmospheric Materiality
            </h2>
            <p className="font-sans text-sm font-light text-[#DDD6CC] leading-relaxed mb-8">
              Atelier Noura employs contrasting tonal surfaces inspired by deep shade and evening light in Moroccan courtyards. This demonstrates dark surface accessibility with high contrast ratios.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                className="border-[#F2EEE8] text-[#F2EEE8] hover:bg-[#F2EEE8] hover:text-[#242321]"
              >
                Inquire With Studio
              </Button>
              <TextLink href="/studio" className="text-[#DDD6CC] hover:text-white">
                Learn Studio Philosophy
              </TextLink>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
