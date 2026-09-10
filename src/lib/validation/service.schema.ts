import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const serviceCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens (e.g. interior-design)'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(3000, 'Description cannot exceed 3000 characters'),
  order: z
    .number()
    .int()
    .min(0, 'Order must be 0 or greater')
    .max(1000, 'Order cannot exceed 1000')
    .default(0),
  active: z.boolean().default(true),
});

export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;

export const serviceUpdateSchema = serviceCreateSchema.partial();
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
