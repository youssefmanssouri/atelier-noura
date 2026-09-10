import { z } from 'zod';

export const inquiryCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  phone: z
    .string()
    .trim()
    .max(30, 'Phone number cannot exceed 30 characters')
    .optional()
    .nullable(),
  projectType: z
    .string()
    .trim()
    .min(2, 'Project type is required')
    .max(100, 'Project type cannot exceed 100 characters'),
  location: z
    .string()
    .trim()
    .min(2, 'Location is required')
    .max(150, 'Location cannot exceed 150 characters'),
  approximateSize: z
    .string()
    .trim()
    .max(100, 'Approximate size cannot exceed 100 characters')
    .optional()
    .nullable(),
  timeline: z
    .string()
    .trim()
    .min(2, 'Timeline is required')
    .max(100, 'Timeline cannot exceed 100 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message cannot exceed 3000 characters'),
});

export type InquiryCreateInput = z.infer<typeof inquiryCreateSchema>;

export const inquiryStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED']),
});

export type InquiryStatusUpdateInput = z.infer<typeof inquiryStatusUpdateSchema>;
