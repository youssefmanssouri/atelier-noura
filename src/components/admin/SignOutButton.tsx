'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
      router.refresh();
    } catch {
      // Fallback redirect even if network glitch occurs
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="text-xs text-[#6F6962] hover:text-[#A45D49] transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-1 focus:ring-[#A45D49] rounded px-1.5 py-0.5"
    >
      {isSigningOut ? 'Signing out…' : 'Sign Out'}
    </button>
  );
}
