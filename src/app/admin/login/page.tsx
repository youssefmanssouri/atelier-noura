import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth/session';
import { hasRole } from '@/lib/auth/rbac';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Studio Sign In — Atelier Noura | Administration',
  description: 'Private management portal for inquiries and studio operations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  // If already authenticated with required privileges, redirect directly to dashboard
  const session = await verifySession();
  if (session && hasRole(session.user.role, 'STAFF')) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EEE8] p-4 sm:p-6 text-[#242321]">
      <div className="w-full max-w-md space-y-6">
        {/* Editorial Branding */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif text-2xl tracking-tight text-[#242321]">
              Atelier Noura
            </span>
            <span className="rounded bg-[#242321] px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider text-[#F2EEE8] uppercase">
              Admin
            </span>
          </div>
          <p className="text-[11px] font-sans font-medium tracking-widest text-[#6F6962] uppercase">
            Architecture · Agadir
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded border border-[#D9D4CB] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="font-serif text-xl sm:text-2xl text-[#242321] tracking-[-0.01em]">
              Studio Administration
            </h1>
            <p className="text-xs text-[#6F6962] leading-relaxed">
              Authenticate with your staff credentials to access prospective client inquiries.
            </p>
          </div>

          <LoginForm />
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-[#6F6962] leading-relaxed">
          Restricted access. Internal studio communications and client briefs are confidential.
        </p>
      </div>
    </div>
  );
}
