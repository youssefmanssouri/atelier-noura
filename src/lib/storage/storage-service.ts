import 'server-only';
import crypto from 'node:crypto';
import path from 'node:path';

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
] as const;

export type AllowedImageMimeType = (typeof ALLOWED_IMAGE_MIME_TYPES)[number];

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

export interface StoredFile {
  url: string;
  key: string;
  sizeBytes: number;
  mimeType: string;
}

export interface UploadFileOptions {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  folder?: string;
}

export interface StorageService {
  upload(options: UploadFileOptions): Promise<StoredFile>;
  delete(key: string): Promise<boolean>;
}

/**
 * Validates that a file has an acceptable image MIME type and size.
 */
export function validateImageUpload(mimeType: string, sizeBytes: number): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType as AllowedImageMimeType)) {
    return {
      valid: false,
      error: `Invalid file type "${mimeType}". Allowed types: JPEG, PNG, WebP, AVIF.`,
    };
  }

  if (sizeBytes > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit.`,
    };
  }

  return { valid: true };
}

/**
 * Generates a collision-resistant, sanitized storage key to prevent directory traversal and executable attacks.
 */
export function generateSafeStorageKey(originalFileName: string, folder = 'projects'): string {
  const ext = path.extname(originalFileName).toLowerCase().replace(/[^a-z0-9.]/g, '');
  const randomPrefix = crypto.randomBytes(16).toString('hex');
  const sanitizedBase = path
    .basename(originalFileName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .slice(0, 30);

  const safeFileName = `${randomPrefix}-${sanitizedBase || 'image'}${ext}`;
  return `${folder}/${safeFileName}`;
}
