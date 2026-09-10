export interface ArchitecturalImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: 'landscape' | 'portrait' | 'wide' | 'square';
  caption?: string;
  location?: string;
  category: 'residential' | 'hospitality' | 'commercial' | 'detail';
  projectSlug?: string;
}

/**
 * Curated architectural imagery for Atelier Noura.
 * All imagery is centralized here to prevent ad-hoc URLs in components
 * and ensure consistent metadata, aspect ratios, and meaningful alt text.
 * Assets are localized in /public/images to ensure reliable, self-hosted delivery.
 */
export const STUDIO_IMAGES: Record<string, ArchitecturalImage> = {
  heroArchitecture: {
    id: 'studio-hero-monolith',
    src: '/images/studio-hero-monolith.jpg',
    alt: 'Monolithic contemporary residence in limestone and textured sand plaster under clear coastal daylight in Morocco',
    width: 2000,
    height: 1200,
    aspectRatio: 'landscape',
    caption: 'Private coastal residence — Limestone monoliths and natural shadow play, Agadir',
    location: 'Agadir, Morocco',
    category: 'residential',
  },
  villaTargaHero: {
    id: 'villa-targa-hero',
    src: '/images/villa-targa-hero.jpg',
    alt: 'Villa Targa in Agadir featuring clean geometric volumes, limestone facade, and shaded courtyard reflection pool',
    width: 1800,
    height: 1200,
    aspectRatio: 'landscape',
    caption: 'Villa Targa — Main courtyard and south-facing limestone colonnade, Agadir',
    location: 'Agadir, Morocco',
    category: 'residential',
    projectSlug: 'villa-targa',
  },
  villaTargaInterior: {
    id: 'villa-targa-interior',
    src: '/images/villa-targa-interior.jpg',
    alt: 'Minimalist living area of Villa Targa with recessed ceiling heights, natural oak cabinetry, and sand-toned lime wash walls',
    width: 1200,
    height: 1500,
    aspectRatio: 'portrait',
    caption: 'Villa Targa — Primary living space with lime plaster finishes and bespoke joinery',
    location: 'Agadir, Morocco',
    category: 'residential',
    projectSlug: 'villa-targa',
  },
  riadAgdalCourtyard: {
    id: 'riad-agdal-courtyard',
    src: '/images/riad-agdal-courtyard.jpg',
    alt: 'Restored central patio of Riad Agdal in Marrakech with terracotta zellige tiling and ancient orange trees under soft natural light',
    width: 1800,
    height: 1200,
    aspectRatio: 'landscape',
    caption: 'Riad Agdal — Restored central courtyard with traditional zellige and deep shade arcades',
    location: 'Marrakech, Morocco',
    category: 'hospitality',
    projectSlug: 'riad-agdal',
  },
  coastalResidenceOcean: {
    id: 'coastal-residence-ocean',
    src: '/images/coastal-residence-ocean.jpg',
    alt: 'Coastal Residence in Taghazout cantilevered over ocean bluffs with textured plaster and panoramic Atlantic glazing',
    width: 1800,
    height: 900,
    aspectRatio: 'wide',
    caption: 'Coastal Residence — Oceanfront elevation integrated into the Taghazout hillside',
    location: 'Taghazout, Morocco',
    category: 'residential',
    projectSlug: 'coastal-residence',
  },
  cafeNo7Interior: {
    id: 'cafe-no7-interior',
    src: '/images/cafe-no7-interior.jpg',
    alt: 'Commercial interior of Café N°7 in Agadir showing brushed brass counter accents, travertine tables, and curved plaster seating booths',
    width: 1400,
    height: 1400,
    aspectRatio: 'square',
    caption: 'Café N°7 — Bespoke travertine banquette and patinated bronze counter details',
    location: 'Agadir, Morocco',
    category: 'commercial',
    projectSlug: 'cafe-no-7',
  },
  materialPlasterDetail: {
    id: 'material-plaster-detail',
    src: '/images/material-plaster-detail.jpg',
    alt: 'Textured natural tadelakt lime plaster showing warm mineral undertones and subtle artisanal surface variation',
    width: 1200,
    height: 1500,
    aspectRatio: 'portrait',
    caption: 'Artisanal tadelakt plaster craftsmanship applied throughout coastal residences',
    category: 'detail',
  },
};
