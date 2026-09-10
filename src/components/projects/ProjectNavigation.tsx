import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { type PortfolioProject } from '@/lib/constants/projects';

export interface ProjectNavigationProps {
  previous: PortfolioProject;
  next: PortfolioProject;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Portfolio editorial sequence"
      className="border-t border-[#DDD6CC] bg-[#F2EEE8] py-12 sm:py-16"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Previous Project Link */}
          <Link
            href={`/projects/${previous.slug}`}
            className="group flex flex-col space-y-2 p-4 -m-4 rounded-[2px] transition-colors hover:bg-[#EAE4DC]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321]"
          >
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] flex items-center gap-1.5 transition-colors group-hover:text-[#A45D49]">
              <span aria-hidden="true">←</span> Previous Project
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#242321] transition-colors group-hover:text-[#A45D49]">
              {previous.title}
            </span>
            <span className="text-xs font-sans text-[#6F6962] font-light">
              {previous.location} · {previous.category}
            </span>
          </Link>

          {/* Next Project Link */}
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col space-y-2 p-4 -m-4 rounded-[2px] md:text-right md:items-end transition-colors hover:bg-[#EAE4DC]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321]"
          >
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#6F6962] flex items-center gap-1.5 transition-colors group-hover:text-[#A45D49]">
              Next Project <span aria-hidden="true">→</span>
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#242321] transition-colors group-hover:text-[#A45D49]">
              {next.title}
            </span>
            <span className="text-xs font-sans text-[#6F6962] font-light">
              {next.location} · {next.category}
            </span>
          </Link>
        </div>
      </Container>
    </nav>
  );
}

export default ProjectNavigation;
