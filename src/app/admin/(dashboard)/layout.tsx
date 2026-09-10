import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth/session';
import { hasRole } from '@/lib/auth/rbac';
import { SignOutButton } from '@/components/admin/SignOutButton';

export const metadata: Metadata = {
  title: 'Atelier Noura | Studio Administration',
  description: 'Studio administration and prospective client inquiry management',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side boundary guard: requires active authenticated session
  const session = await verifySession();

  // If unauthenticated, redirect to studio login screen
  if (!session) {
    redirect('/admin/login');
  }

  // Authorization check: User must possess at least STAFF role
  if (!hasRole(session.user.role, 'STAFF')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EEE8] p-6 text-center text-[#242321]">
        <div className="max-w-md w-full rounded border border-[#D9D4CB] bg-white p-8 shadow-sm space-y-4">
          <span className="rounded bg-[#A45D49]/10 px-2.5 py-1 text-xs font-mono font-medium text-[#A45D49] uppercase">
            403 Forbidden
          </span>
          <h1 className="font-serif text-xl text-[#242321]">Access Restricted</h1>
          <p className="text-xs text-[#6F6962] leading-relaxed">
            Your account ({session.user.email}) does not possess sufficient privileges to view studio inquiries or operational records.
          </p>
          <div className="pt-4 border-t border-[#D9D4CB]/60 flex items-center justify-between text-xs">
            <Link
              href="/"
              className="text-[#6F6962] hover:text-[#A45D49] hover:underline underline-offset-4"
            >
              ← Return to Studio Front
            </Link>
            <SignOutButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EEE8] text-[#242321]">
      <header className="border-b border-[#D9D4CB] bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-3 sticky top-0 z-20">
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Studio Brand Header */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-serif text-base tracking-tight text-[#242321] hover:text-[#A45D49] transition-colors"
              title="View Public Studio Front"
            >
              Atelier Noura
            </Link>
            <span className="rounded bg-[#242321] px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider text-[#F2EEE8] uppercase">
              Admin
            </span>
            <span className="hidden sm:inline text-xs text-[#6F6962] font-light">
              · Inquiries & Consultations
            </span>
          </div>

          {/* User Details & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#6F6962]">
            <span className="font-medium text-[#242321]">
              {session.user.name}
            </span>
            <span className="rounded bg-[#FAF8F5] border border-[#D9D4CB] px-1.5 py-0.2 text-[10px] font-mono text-[#6F6962]">
              {session.user.role}
            </span>
            <span className="text-[#D9D4CB]">|</span>
            <SignOutButton />
            <span className="text-[#D9D4CB]">|</span>
            <Link
              href="/"
              className="text-xs text-[#6F6962] hover:text-[#A45D49] transition-colors underline-offset-4 hover:underline"
            >
              Public Site ↗
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
