import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(150, 'Title cannot exceed 150 characters'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, 'Slug must be at least 2 characters')
    .max(150, 'Slug cannot exceed 150 characters')
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens (e.g. villa-targa)'),
  location: z
    .string()
    .trim()
    .min(2, 'Location must be at least 2 characters')
    .max(150, 'Location cannot exceed 150 characters'),
  year: z
    .number()
    .int()
    .min(1900, 'Year must be after 1900')
    .max(2100, 'Year must be before 2100'),
  category: z
    .string()
    .trim()
    .min(2, 'Category must be at least 2 characters')
    .max(100, 'Category cannot exceed 100 characters'),
  shortDescription: z
    .string()
    .trim()
    .min(10, 'Short description must be at least 10 characters')
    .max(300, 'Short description cannot exceed 300 characters'),
  fullDescription: z
    .string()
    .trim()
    .min(20, 'Full description must be at least 20 characters')
    .max(10000, 'Full description cannot exceed 10,000 characters'),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;

export const projectUpdateSchema = projectCreateSchema.partial();
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;

export const projectImageCreateSchema = z.object({
  imageUrl: z
    .string()
    .trim()
    .url('Image URL must be a valid URL')
    .max(1000, 'Image URL cannot exceed 1000 characters'),
  altText: z
    .string()
    .trim()
    .min(3, 'Alt text must be at least 3 characters')
    .max(255, 'Alt text cannot exceed 255 characters'),
  order: z
    .number()
    .int()
    .min(0, 'Order must be 0 or greater')
    .max(1000, 'Order cannot exceed 1000')
    .default(0),
  caption: z
    .string()
    .trim()
    .max(500, 'Caption cannot exceed 500 characters')
    .optional()
    .nullable(),
});

export type ProjectImageCreateInput = z.infer<typeof projectImageCreateSchema>;
