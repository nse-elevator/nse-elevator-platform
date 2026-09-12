'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error?.message || 'Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      // Successful login — hard redirect ensures browser immediately attaches new cookie
      window.location.href = redirectPath;
    } catch (err) {
      setError('Connection error. Please check server availability.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-steel-950 text-white relative overflow-hidden">
      {/* Background Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-md bg-steel-900 border border-steel-800 rounded-sm p-8 shadow-machined-card relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-700/50 inline-flex items-center">
              <Image
                src="/images/nse-logo-nav.webp"
                alt="NSE Elevator Services"
                width={156}
                height={88}
                priority
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-steel-950 border border-steel-800 rounded-sm mb-2">
            <span className="w-2 h-2 rounded-full bg-emergency-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-steel-400 font-bold">
              Restricted Access Portal
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white uppercase font-mono">
            NSE SMART <span className="text-emergency-500">ADMIN</span>
          </h1>
          <p className="text-xs text-steel-400 font-mono mt-1">
            New Sahyadri Elevator Management &amp; Dispatch Console
          </p>
        </div>


        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3 bg-emergency-500/10 border border-emergency-500/40 text-emergency-400 text-xs rounded-sm flex items-start gap-2">
            <span className="font-bold">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-steel-300 mb-1.5">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nsei.in"
              autoComplete="email"
              className="w-full bg-steel-950 border border-steel-700 focus:border-emergency-500 rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white font-mono placeholder-steel-600 focus:outline-none focus:ring-1 focus:ring-emergency-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono uppercase font-bold text-steel-300">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className="w-full bg-steel-950 border border-steel-700 focus:border-emergency-500 rounded-sm px-3.5 py-2.5 text-base sm:text-sm text-white font-mono placeholder-steel-600 focus:outline-none focus:ring-1 focus:ring-emergency-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] bg-emergency-500 hover:bg-emergency-600 active:scale-[0.99] text-white font-mono font-bold uppercase tracking-wider py-3 rounded-sm text-xs transition-all shadow-bevel-inset flex items-center justify-center gap-2 mt-6 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-steel-800 text-center text-[11px] font-mono text-steel-500">
          <p>Protected by 256-bit HTTP-Only JWT Session</p>
          <Link href="/" prefetch={true} className="hover:text-steel-300 mt-1 inline-block">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-steel-950 text-steel-400 font-mono text-xs">
          Loading secure login portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
