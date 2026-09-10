'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error?.message || 'Invalid email or password.');
        setIsSubmitting(false);
        return;
      }

      // Successful authentication: navigate to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch {
      setError('A network error occurred. Please verify your connection.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded border border-[#9E5D46]/20 bg-[#9E5D46]/10 px-3.5 py-2.5 text-xs text-[#9E5D46] font-sans leading-relaxed"
        >
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-medium uppercase tracking-wider text-[#242321]"
        >
          Studio Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="colleague@ateliernoura.ma"
          disabled={isSubmitting}
          className="w-full rounded border border-[#D9D4CB] bg-[#FAF8F5] px-3 py-2 text-sm text-[#242321] placeholder-[#6F6962]/50 transition-colors focus:border-[#A45D49] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A45D49] disabled:opacity-60"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs font-medium uppercase tracking-wider text-[#242321]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          disabled={isSubmitting}
          className="w-full rounded border border-[#D9D4CB] bg-[#FAF8F5] px-3 py-2 text-sm text-[#242321] placeholder-[#6F6962]/50 transition-colors focus:border-[#A45D49] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#A45D49] disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-[#242321] px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#F2EEE8] transition-colors hover:bg-[#302725] focus:outline-none focus:ring-2 focus:ring-[#A45D49] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Authenticating…' : 'Sign In'}
      </button>

      <div className="pt-2 text-center">
        <Link
          href="/"
          className="text-xs text-[#6F6962] transition-colors hover:text-[#A45D49] hover:underline underline-offset-4"
        >
          ← Return to Studio Front
        </Link>
      </div>
    </form>
  );
}
