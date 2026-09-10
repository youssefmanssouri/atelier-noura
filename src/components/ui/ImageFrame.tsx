import React from 'react';
import Image, { ImageProps } from 'next/image';

export type ImageAspectRatio =
  | 'landscape-16-9'
  | 'landscape-4-3'
  | 'portrait-3-4'
  | 'portrait-4-5'
  | 'wide-21-9'
  | 'square-1-1'
  | 'auto';

export interface ImageFrameProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  caption?: string;
  priority?: boolean;
  className?: string;
}

const ASPECT_RATIO_CLASSES: Record<ImageAspectRatio, string> = {
  'landscape-16-9': 'aspect-[16/9]',
  'landscape-4-3': 'aspect-[4/3]',
  'portrait-3-4': 'aspect-[3/4]',
  'portrait-4-5': 'aspect-[4/5]',
  'wide-21-9': 'aspect-[21/9]',
  'square-1-1': 'aspect-square',
  'auto': '',
};

export function ImageFrame({
  src,
  alt,
  aspectRatio = 'landscape-16-9',
  caption,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px',
  ...props
}: ImageFrameProps) {
  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio];

  return (
    <figure className={`group flex flex-col space-y-2.5 ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-[2px] bg-[#E5DDD2] ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="text-xs font-sans text-[#6F6962] tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ImageFrame;
