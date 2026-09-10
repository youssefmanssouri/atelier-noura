/**
 * Initial Administrator Provisioning Script for Atelier Noura
 *
 * Usage:
 *   ADMIN_EMAIL="admin@ateliernoura.ma" ADMIN_PASSWORD="your-secure-password" npx tsx scripts/seed-admin.ts
 *
 * Environment variables:
 *   ADMIN_EMAIL      - Email for the initial studio administrator (must be valid email)
 *   ADMIN_PASSWORD   - Secure password (minimum 10 characters)
 *   ADMIN_NAME       - Display name (defaults to "Atelier Noura Admin")
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@ateliernoura.ma').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = (process.env.ADMIN_NAME || 'Atelier Noura Admin').trim();

  console.log('[Seed] Starting administrator provisioning check...');

  if (!email || !email.includes('@')) {
    console.error('[Seed Error] Valid ADMIN_EMAIL is required.');
    process.exit(1);
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`[Seed Info] Administrator account already exists for ${email} (Role: ${existingUser.role}).`);
    console.log('[Seed Info] Existing credentials preserved without modification.');
    await prisma.$disconnect();
    return;
  }

  if (!password || password.length < 10) {
    console.error('[Seed Error] ADMIN_PASSWORD must be provided and must be at least 10 characters.');
    console.error('Example: ADMIN_PASSWORD="secure-atelier-password-2026" npx tsx scripts/seed-admin.ts');
    process.exit(1);
  }

  // Hash password using bcrypt (12 rounds)
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create initial OWNER user
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role: 'OWNER',
      isActive: true,
    },
  });

  console.log(`[Seed Success] Initial studio administrator provisioned successfully.`);
  console.log(`  User ID: ${newUser.id}`);
  console.log(`  Email:   ${newUser.email}`);
  console.log(`  Role:    ${newUser.role}`);
  console.log(`  Created: ${newUser.createdAt.toISOString()}`);

  await prisma.$disconnect();
}

seedAdmin().catch(async (error) => {
  console.error('[Seed Error] Fatal error during administrator provisioning:', error);
  await prisma.$disconnect();
  process.exit(1);
});
