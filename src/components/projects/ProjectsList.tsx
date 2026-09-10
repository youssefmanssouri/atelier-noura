'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProjectFilter } from './ProjectFilter';
import { ProjectMeta } from '@/components/ui/ProjectMeta';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { PORTFOLIO_PROJECTS, type PortfolioProject } from '@/lib/constants/projects';

export function ProjectsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProjects = selectedCategory
    ? PORTFOLIO_PROJECTS.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : PORTFOLIO_PROJECTS;

  return (
    <div>
      {/* Category Navigation */}
      <ProjectFilter
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Varied Editorial Project Compositions */}
      <div className="space-y-24 sm:space-y-32">
        {filteredProjects.map((project, index) => {
          // If viewing all, use the distinct art-directed composition
          if (!selectedCategory) {
            return (
              <React.Fragment key={project.slug}>
                {renderEditorialComposition(project)}
              </React.Fragment>
            );
          }

          // If filtered to a specific category, render balanced 2-column editorial card
          return (
            <article
              key={project.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-7">
                <Link href={`/projects/${project.slug}`} className="block group">
                  <ImageFrame
                    src={project.coverImage.src}
                    alt={project.coverImage.alt}
                    aspectRatio={project.aspectRatio}
                    caption={project.coverImage.caption}
                    priority={index === 0}
                  />
                </Link>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <ProjectMeta
                  location={project.location}
                  year={project.year}
                  category={project.category}
                />
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242321]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-[#A45D49] transition-colors"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
                  {project.shortDescription}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
                  >
                    View project case study →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm font-sans text-[#6F6962]">
              No projects found in this discipline.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className="mt-4 text-xs font-sans uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] underline"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Art-directed editorial layout handler for the full project index
 */
function renderEditorialComposition(project: PortfolioProject) {
  switch (project.compositionLayout) {
    case 'anchor-wide':
      // Project 1: Villa Targa (8-col wide landscape + 4-col side narrative)
      return (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8">
            <Link href={`/projects/${project.slug}`} className="block group">
              <ImageFrame
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                aspectRatio="landscape-16-9"
                caption={project.coverImage.caption}
                priority
              />
            </Link>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <ProjectMeta
              location={project.location}
              year={project.year}
              category={project.category}
            />
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242321]">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-[#A45D49] transition-colors"
              >
                {project.title}
              </Link>
            </h2>
            <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="pt-2">
              <Link
                href={`/projects/${project.slug}`}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
              >
                View project case study →
              </Link>
            </div>
          </div>
        </article>
      );

    case 'portrait-asymmetric':
      // Project 2: Riad Agdal (5-col portrait orientation)
      return (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <Link href={`/projects/${project.slug}`} className="block group">
              <ImageFrame
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                aspectRatio="portrait-4-5"
                caption={project.coverImage.caption}
              />
            </Link>
          </div>
          <div className="lg:col-span-7 space-y-4 lg:pt-8 lg:max-w-md">
            <ProjectMeta
              location={project.location}
              year={project.year}
              category={project.category}
            />
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242321]">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-[#A45D49] transition-colors"
              >
                {project.title}
              </Link>
            </h2>
            <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="pt-2">
              <Link
                href={`/projects/${project.slug}`}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
              >
                View project case study →
              </Link>
            </div>
          </div>
        </article>
      );

    case 'panoramic-offset':
      // Project 3: Coastal Residence (7-col wide landscape offset to right)
      return (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4 lg:order-1 order-2">
            <ProjectMeta
              location={project.location}
              year={project.year}
              category={project.category}
            />
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242321]">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-[#A45D49] transition-colors"
              >
                {project.title}
              </Link>
            </h2>
            <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="pt-2">
              <Link
                href={`/projects/${project.slug}`}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
              >
                View project case study →
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 lg:order-2 order-1">
            <Link href={`/projects/${project.slug}`} className="block group">
              <ImageFrame
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                aspectRatio="wide-21-9"
                caption={project.coverImage.caption}
              />
            </Link>
          </div>
        </article>
      );

    case 'square-compact':
      // Project 4: Café N°7 (6-col square + 6-col adjacent text)
      return (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-8 border-t border-[#E8E2D9]">
          <div className="lg:col-span-6">
            <Link href={`/projects/${project.slug}`} className="block group">
              <ImageFrame
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                aspectRatio="square-1-1"
                caption={project.coverImage.caption}
              />
            </Link>
          </div>
          <div className="lg:col-span-6 space-y-4">
            <ProjectMeta
              location={project.location}
              year={project.year}
              category={project.category}
            />
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242321]">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-[#A45D49] transition-colors"
              >
                {project.title}
              </Link>
            </h2>
            <p className="font-sans text-sm text-[#6F6962] font-light leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="pt-2">
              <Link
                href={`/projects/${project.slug}`}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#242321] hover:text-[#A45D49] transition-colors link-editorial"
              >
                View project case study →
              </Link>
            </div>
          </div>
        </article>
      );

    default:
      return null;
  }
}

export default ProjectsList;
