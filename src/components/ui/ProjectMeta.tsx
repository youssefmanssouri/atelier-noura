import React from 'react';

export interface ProjectMetaProps {
  location: string;
  year: number | string;
  category: string;
  scope?: string;
  className?: string;
  tone?: 'default' | 'muted';
}

export function ProjectMeta({
  location,
  year,
  category,
  scope,
  className = '',
  tone = 'default',
}: ProjectMetaProps) {
  const textColor = tone === 'muted' ? 'text-[#6F6962]' : 'text-[#242321]/80';

  const items = [
    location,
    String(year),
    category,
    scope,
  ].filter(Boolean) as string[];

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-sans font-medium uppercase tracking-[0.16em] ${textColor} ${className}`}
      aria-label="Project metadata"
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>{item}</span>
          {idx < items.length - 1 && (
            <span className="text-[#DDD6CC] select-none" aria-hidden="true">
              ·
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProjectMeta;
