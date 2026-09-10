// Shared application domain types and response contracts

export type { UserRole, InquiryStatus } from '@prisma/client';
export type { SafeUser, SessionData } from '@/lib/auth/session';
export type { Permission } from '@/lib/auth/rbac';
export type { RateLimitResult } from '@/lib/security/rate-limit';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
