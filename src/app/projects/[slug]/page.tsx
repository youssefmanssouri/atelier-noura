import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectMeta } from '@/components/ui/ProjectMeta';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { ProjectsCTA } from '@/components/projects/ProjectsCTA';
import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import {
  PORTFOLIO_PROJECTS,
  getProjectBySlug,
  getAdjacentProjects,
} from '@/lib/constants/projects';
import { SITE_URL } from '@/lib/constants/site';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = `${project.title} — Atelier Noura`;
  const description = `${project.title} (${project.location}, ${project.year}) — ${project.shortDescription}`;
  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Atelier Noura',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: project.coverImage.src,
          width: project.coverImage.width,
          height: project.coverImage.height,
          alt: project.coverImage.alt,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const adjacent = getAdjacentProjects(slug);

  // Structured Data (BreadcrumbList)
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
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_URL}/projects/${project.slug}`,
      },
    ],
  };

  // Additional secondary gallery images (if any) beyond the primary cover image
  const secondaryImages = project.gallery.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EEE8] text-[#242321]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <Header currentPath="/projects" />

      <main id="main-content" className="flex-1">
        {/* Back Link to Projects Index */}
        <div className="pt-8 sm:pt-12">
          <Container width="wide">
            <Link
              href="/projects"
              className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-[#6F6962] hover:text-[#242321] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321]"
            >
              <span aria-hidden="true" className="mr-2">←</span> All Projects
            </Link>
          </Container>
        </div>

        {/* 01. Project Hero Header */}
        <header className="pt-6 sm:pt-10 pb-12 sm:pb-16">
          <Container width="wide">
            <div className="space-y-6 max-w-4xl">
              <ProjectMeta
                location={project.location}
                year={project.year}
                category={project.category}
                tone="muted"
              />
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[-0.02em] text-[#242321] leading-[1.05]">
                {project.title}
              </h1>
              <p className="font-sans text-base sm:text-xl text-[#6F6962] font-light leading-relaxed max-w-2xl pt-2">
                {project.shortDescription}
              </p>
            </div>

            {/* Principal Visual Anchor */}
            <div className="mt-10 sm:mt-14">
              <ImageFrame
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                aspectRatio={project.detailHeroAspectRatio ?? project.aspectRatio}
                caption={project.coverImage.caption}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1400px"
              />
            </div>
          </Container>
        </header>

        {/* 02. Architectural Narrative: Context & Spatial Strategy */}
        <Section spacing="generous" className="border-t border-[#DDD6CC]">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left Column: Context Anchor */}
              <div className="lg:col-span-4 space-y-3">
                <SectionLabel index="01" title="Overview" />
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321] leading-snug">
                  Shaped by climate, orientation, and mineral mass.
                </h2>
              </div>

              {/* Right Column: Two-part Narrative */}
              <div className="lg:col-span-8 space-y-8 max-w-2xl">
                <div className="space-y-3">
                  <h3 className="text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#A45D49]">
                    The Context &amp; Site Conditions
                  </h3>
                  <p className="font-sans text-base sm:text-lg text-[#242321] font-light leading-relaxed">
                    {project.overview.context}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E8E2D9]">
                  <h3 className="text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#A45D49]">
                    Spatial &amp; Material Strategy
                  </h3>
                  <p className="font-sans text-base text-[#6F6962] font-light leading-relaxed">
                    {project.overview.strategy}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 03. Specifications Sheet (Restrained, No SaaS Cards) */}
        <Section spacing="generous" surface="sand" className="border-t border-b border-[#DDD6CC]">
          <Container width="wide">
            <div className="space-y-8">
              <SectionLabel index="02" title="Architectural Specifications" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-4 border-t border-[#DDD6CC]">
                {/* Typology */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] block">
                    Typology
                  </span>
                  <p className="font-serif text-xl font-normal text-[#242321]">
                    {project.specifications.typology}
                  </p>
                </div>

                {/* Scope */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] block">
                    Scope of Work
                  </span>
                  <p className="font-sans text-sm text-[#242321] font-light leading-relaxed">
                    {project.specifications.scope}
                  </p>
                </div>

                {/* Materials */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] block">
                    Primary Materials
                  </span>
                  <p className="font-sans text-sm text-[#242321] font-light leading-relaxed">
                    {project.specifications.materials}
                  </p>
                </div>

                {/* Climatic Strategy */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] block">
                    Climatic Strategy
                  </span>
                  <p className="font-sans text-sm text-[#242321] font-light leading-relaxed">
                    {project.specifications.climate}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 04. Secondary Visual Narrative (When verified authentic imagery exists) */}
        {secondaryImages.length > 0 && (
          <Section spacing="generous" className="border-b border-[#DDD6CC]">
            <Container width="wide">
              <div className="space-y-12">
                <SectionLabel index="03" title="Spatial Study" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className="lg:col-span-7">
                    <ImageFrame
                      src={secondaryImages[0].image.src}
                      alt={secondaryImages[0].image.alt}
                      aspectRatio={secondaryImages[0].aspectRatio}
                      caption={secondaryImages[0].caption}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                    />
                  </div>
                  <div className="lg:col-span-5 space-y-4 max-w-md">
                    <span className="text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#A45D49] block">
                      Interior Materiality
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321] leading-snug">
                      Filtered daylight meeting textured lime wash and bespoke woodwork.
                    </h3>
                    <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
                      Interior spaces are deliberately quieted by natural plaster finishes that absorb sound and soften intense Atlantic glare into gentle ambient illumination.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* 05. Material & Conceptual Focus Callout */}
        <Section spacing="generous" className="border-b border-[#DDD6CC]">
          <Container width="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4 space-y-3">
                <SectionLabel
                  index={secondaryImages.length > 0 ? '04' : '03'}
                  title="Materiality &amp; Light"
                />
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#242321] leading-snug">
                  {project.materialCallout.heading}
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-8 max-w-2xl">
                <p className="font-sans text-base sm:text-lg text-[#6F6962] font-light leading-relaxed">
                  {project.materialCallout.concept}
                </p>

                <div className="pt-6 border-t border-[#E8E2D9]">
                  <span className="text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#242321] block mb-4">
                    Defining Spatial &amp; Material Elements
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.materialCallout.primaryElements.map((element, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs font-sans text-[#6F6962] tracking-wide"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#A45D49] mr-3 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 06. Editorial Previous / Next Navigation */}
        {adjacent && (
          <ProjectNavigation previous={adjacent.previous} next={adjacent.next} />
        )}

        {/* 07. Project Inquiry CTA */}
        <ProjectsCTA />
      </main>

      <Footer />
    </div>
  );
}
