import { STUDIO_IMAGES, type ArchitecturalImage } from './images';

export type ProjectCategory = 'Residential' | 'Hospitality' | 'Commercial Interior';

export interface ProjectOverview {
  context: string;
  strategy: string;
}

export interface ProjectSpecifications {
  typology: string;
  scope: string;
  materials: string;
  climate: string;
}

export interface ProjectGalleryImage {
  image: ArchitecturalImage;
  caption?: string;
  aspectRatio: 'landscape-16-9' | 'portrait-4-5' | 'wide-21-9' | 'square-1-1' | 'landscape-4-3' | 'portrait-3-4';
  priority?: boolean;
}

export interface ProjectMaterialCallout {
  heading: string;
  concept: string;
  primaryElements: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  location: string;
  year: number;
  category: ProjectCategory;
  shortDescription: string;
  coverImage: ArchitecturalImage;
  aspectRatio: 'landscape-16-9' | 'portrait-4-5' | 'wide-21-9' | 'square-1-1';
  detailHeroAspectRatio?: 'landscape-16-9' | 'portrait-4-5' | 'wide-21-9' | 'square-1-1';
  compositionLayout: 'anchor-wide' | 'portrait-asymmetric' | 'panoramic-offset' | 'square-compact';
  featured: boolean;
  displayOrder: number;
  overview: ProjectOverview;
  specifications: ProjectSpecifications;
  gallery: ProjectGalleryImage[];
  materialCallout: ProjectMaterialCallout;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Residential',
  'Hospitality',
  'Commercial Interior',
];

/**
 * Centralized catalog of fictional architectural portfolio projects for Atelier Noura.
 * Extended with verified editorial architectural narratives, specifications, and layout directions.
 * Strictly grounded in baseline project data without unsupported technical, historical, or engineering claims.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'villa-targa',
    title: 'Villa Targa',
    location: 'Agadir, Morocco',
    year: 2026,
    category: 'Residential',
    shortDescription:
      'A private residence organized around a shaded limestone courtyard and water retention basin, shielding living quarters from coastal Atlantic winds while welcoming low winter daylight.',
    coverImage: STUDIO_IMAGES.villaTargaHero,
    aspectRatio: 'landscape-16-9',
    detailHeroAspectRatio: 'landscape-16-9',
    compositionLayout: 'anchor-wide',
    featured: true,
    displayOrder: 1,
    overview: {
      context:
        'Located in the coastal plain of Agadir, the site is directly exposed to persistent maritime winds from the Atlantic and southern sunlight. The architectural response establishes an intimate domestic retreat that protects daily family life from coastal winds while preserving natural cross-ventilation, evaporative cooling from the basin, and low winter daylight.',
      strategy:
        'The residence is conceived as clean geometric limestone volumes organized around an internal central courtyard and shallow water retention basin. Deep overhangs and recessed colonnades temper incoming sunlight, while living zones open to capture cooling breezes. The boundary between interior living and the limestone courtyard connects through recessed glass screens.',
    },
    specifications: {
      typology: 'Private Residential Architecture',
      scope: 'Architectural Design, Courtyard Planning & Interior Joinery',
      materials: 'Local honed limestone, sand-toned lime wash, natural oak cabinetry & joinery',
      climate: 'Courtyard microclimate, Atlantic wind deflection, evaporative water cooling, low winter daylight orientation',
    },
    gallery: [
      {
        image: STUDIO_IMAGES.villaTargaHero,
        caption: 'Villa Targa — Main courtyard and south-facing limestone colonnade, Agadir',
        aspectRatio: 'landscape-16-9',
        priority: true,
      },
      {
        image: STUDIO_IMAGES.villaTargaInterior,
        caption: 'Villa Targa — Primary living space with lime plaster finishes and bespoke joinery',
        aspectRatio: 'portrait-4-5',
        priority: false,
      },
    ],
    materialCallout: {
      heading: 'Courtyard Microclimate & Honest Stone',
      concept:
        'The central limestone courtyard functions as a thermal buffer: shaded stone colonnades and the shallow water basin provide evaporative cooling across the living loggias throughout the afternoon heat.',
      primaryElements: [
        'Honed Agadir Limestone',
        'Cooling Water Retention Basin',
        'Sand-toned Lime Plaster',
        'Natural Oak Cabinetry & Joinery',
      ],
    },
  },
  {
    slug: 'riad-agdal',
    title: 'Riad Agdal',
    location: 'Marrakech, Morocco',
    year: 2025,
    category: 'Hospitality',
    shortDescription:
      'Careful architectural restoration of a historic medina property, enhancing passive courtyard cooling through deep cedar colonnades, natural tadelakt, and handcrafted zellige.',
    coverImage: STUDIO_IMAGES.riadAgdalCourtyard,
    aspectRatio: 'portrait-4-5',
    detailHeroAspectRatio: 'landscape-16-9',
    compositionLayout: 'portrait-asymmetric',
    featured: true,
    displayOrder: 2,
    overview: {
      context:
        'Situated within the historic medina fabric of Marrakech, the existing structure required careful architectural restoration to preserve traditional earthen walls and reinstate the central patio as the heart of the property.',
      strategy:
        'The restoration reinstates the central courtyard as the principal environmental and spatial anchor. Deep cedar colonnades introduce protected transitional galleries between interior chambers and the open patio, preserving acoustic calm and thermal comfort through passive courtyard cooling.',
    },
    specifications: {
      typology: 'Medina Heritage Restoration & Hospitality',
      scope: 'Historic Rehabilitation, Interior Architecture & Craftsmanship',
      materials: 'Handcrafted terracotta zellige, natural mineral tadelakt, Atlas cedarwood, traditional lime mortar',
      climate: 'Passive courtyard cooling, high thermal mass earthen walls, deep shaded colonnades',
    },
    gallery: [
      {
        image: STUDIO_IMAGES.riadAgdalCourtyard,
        caption: 'Riad Agdal — Restored central courtyard with traditional zellige and deep shade arcades',
        aspectRatio: 'landscape-16-9',
        priority: true,
      },
    ],
    materialCallout: {
      heading: 'Material Craft as Environmental Envelope',
      concept:
        'Natural tadelakt plaster applied to colonnades and interior baths regulates humidity, while handcrafted terracotta zellige and deep arcades shade the central patio under soft natural light.',
      primaryElements: [
        'Handcrafted Atlas Cedar Colonnades',
        'Natural Mineral Tadelakt',
        'Handcrafted Terracotta Zellige',
        'Deep Shaded Patio Arcades',
      ],
    },
  },
  {
    slug: 'coastal-residence',
    title: 'Coastal Residence',
    location: 'Taghazout, Morocco',
    year: 2025,
    category: 'Residential',
    shortDescription:
      'Stepped terraced volumes cast into the oceanfront hillside, balancing full Atlantic exposure with sheltered courtyards protected from maritime salt spray.',
    coverImage: STUDIO_IMAGES.coastalResidenceOcean,
    aspectRatio: 'wide-21-9',
    detailHeroAspectRatio: 'wide-21-9',
    compositionLayout: 'panoramic-offset',
    featured: true,
    displayOrder: 3,
    overview: {
      context:
        'Perched on a steep rocky incline facing the open Atlantic in Taghazout, the site demanded an architectural response that embraces expansive horizon vistas while protecting living spaces from maritime salt spray and intense afternoon sun.',
      strategy:
        'The project embeds stepped terraced volumes directly into the oceanfront hillside. Cantilevered plaster volumes shield private courtyards from prevailing winds, framing uninterrupted ocean panoramas through deep overhangs and panoramic Atlantic glazing.',
    },
    specifications: {
      typology: 'Coastal Cliffside Residence',
      scope: 'Architectural Concept, Structural Envelope & Landscape Integration',
      materials: 'Textured exterior plaster, panoramic Atlantic glazing, protective concrete overhangs',
      climate: 'Sheltered courtyards, deep cantilever solar shading, natural ocean breezes',
    },
    gallery: [
      {
        image: STUDIO_IMAGES.coastalResidenceOcean,
        caption: 'Coastal Residence — Oceanfront elevation integrated into the Taghazout hillside',
        aspectRatio: 'wide-21-9',
        priority: true,
      },
    ],
    materialCallout: {
      heading: 'Horizon Glazing & Topographical Sheltering',
      concept:
        'By stepping terraced volumes along the hillside, every major living space maintains an uninhibited visual connection to the ocean while remaining protected within sheltered courtyards from maritime salt spray.',
      primaryElements: [
        'Stepped Terraced Volumes',
        'Panoramic Atlantic Glazing',
        'Textured Exterior Plaster',
        'Sheltered Living Courtyards',
      ],
    },
  },
  {
    slug: 'cafe-no-7',
    title: 'Café N°7',
    location: 'Agadir, Morocco',
    year: 2024,
    category: 'Commercial Interior',
    shortDescription:
      'An urban hospitality interior exploring tactile materials: curved acoustic plaster ceilings, honed travertine tables, and patinated bronze fixtures that age gracefully in coastal salt air.',
    coverImage: STUDIO_IMAGES.cafeNo7Interior,
    aspectRatio: 'square-1-1',
    detailHeroAspectRatio: 'square-1-1',
    compositionLayout: 'square-compact',
    featured: false,
    displayOrder: 4,
    overview: {
      context:
        'Occupying a ground-level space in an urban corner of Agadir, the brief sought to create a calm, tactile sanctuary detached from street noise, utilizing a restrained palette of honed stone and patinated metal.',
      strategy:
        'The design sculpts space through curved acoustic plaster ceilings and wall surfaces that soften sound and diffuse natural light. Low-slung travertine banquettes and honed travertine tables ground the room, complemented by patinated bronze fixtures that age gracefully in coastal salt air.',
    },
    specifications: {
      typology: 'Hospitality & Commercial Interior',
      scope: 'Interior Architecture, Bespoke Furniture & Lighting Design',
      materials: 'Honed travertine tables & banquettes, curved acoustic plaster, patinated bronze fixtures',
      climate: 'Curved acoustic plaster ceilings, diffused natural daylighting, natural cross-ventilation',
    },
    gallery: [
      {
        image: STUDIO_IMAGES.cafeNo7Interior,
        caption: 'Café N°7 — Bespoke travertine banquette and patinated bronze counter details',
        aspectRatio: 'square-1-1',
        priority: true,
      },
    ],
    materialCallout: {
      heading: 'Tactile Mineral Finishes & Acoustic Calm',
      concept:
        'Curved acoustic plaster ceilings soften ambient sound, creating an intimate interior where honed travertine tables balance patinated bronze fixtures that age gracefully.',
      primaryElements: [
        'Honed Travertine Tables',
        'Curved Acoustic Plaster Ceilings',
        'Patinated Bronze Fixtures',
        'Travertine Banquettes',
      ],
    },
  },
];

/**
 * Retrieve a single project by its unique slug identifier.
 */
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

/**
 * Retrieve the previous and next projects relative to the current project's displayOrder.
 */
export function getAdjacentProjects(currentSlug: string): {
  previous: PortfolioProject;
  next: PortfolioProject;
} | null {
  const currentIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const total = PORTFOLIO_PROJECTS.length;
  const previousIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  return {
    previous: PORTFOLIO_PROJECTS[previousIndex],
    next: PORTFOLIO_PROJECTS[nextIndex],
  };
}
