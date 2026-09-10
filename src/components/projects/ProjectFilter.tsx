'use client';

import { PROJECT_CATEGORIES } from '@/lib/constants/projects';

export interface ProjectFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ProjectFilter({
  activeCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  const allCategories = ['All', ...PROJECT_CATEGORIES];

  return (
    <nav
      aria-label="Filter projects by discipline"
      className="border-b border-[#DDD6CC] pb-4 mb-14 sm:mb-20"
    >
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {allCategories.map((category) => {
          const isActive =
            activeCategory.toLowerCase() === category.toLowerCase() ||
            (activeCategory === '' && category === 'All');

          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onSelectCategory(category === 'All' ? '' : category)}
                className={`text-xs font-sans uppercase tracking-[0.18em] transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242321] ${
                  isActive
                    ? 'text-[#242321] font-medium border-b-2 border-[#242321] -mb-[18px] pb-[16px]'
                    : 'text-[#6F6962] hover:text-[#242321] link-editorial'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ProjectFilter;
