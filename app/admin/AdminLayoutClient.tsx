'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Operations & CRM',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
      { name: 'Leads CRM', href: '/admin/leads', icon: '📥' },
    ],
  },
  {
    title: 'Content Management',
    items: [
      { name: 'Services', href: '/admin/services', icon: '⚙️' },
      { name: 'Locations', href: '/admin/locations', icon: '📍' },
      { name: 'Industries', href: '/admin/industries', icon: '🏢' },
      { name: 'Case Studies', href: '/admin/case-studies', icon: '📑' },
      { name: 'Blog Posts', href: '/admin/blog', icon: '📝' },
      { name: 'Careers', href: '/admin/careers', icon: '💼' },
      { name: 'Testimonials', href: '/admin/testimonials', icon: '💬' },
    ],
  },
  {
    title: 'System & Configuration',
    items: [
      { name: 'Site Settings', href: '/admin/settings', icon: '🛠️' },
    ],
  },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // If we are on the login page, do not display the admin shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage) {
      fetch('/api/auth/me')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data?.user) {
            setUser(data.data.user);
          }
        })
        .catch(() => {});
    }
  }, [isLoginPage]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-steel-950 text-white font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-surface-100 text-steel-900 font-sans flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-steel-950 text-white border-b border-steel-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emergency-500" />
            <span className="font-extrabold text-sm tracking-tight text-white uppercase font-mono">
              NSE SMART <span className="text-emergency-500">ADMIN</span>
            </span>
            <span className="text-[10px] font-mono text-steel-400 uppercase tracking-widest mt-0.5">
              New Sahyadri Elevator Console
            </span>
          </Link>
          <span className="text-[11px] font-mono bg-steel-800 text-steel-300 px-2 py-0.5 rounded-sm hidden sm:inline-block">
            Internal Control Panel
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-steel-400 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <span>Public Site</span>
            <span>↗</span>
          </a>

          {user && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-steel-800 font-mono text-[11px]">
              <span className="text-steel-400">{user.email}</span>
              <span className="bg-safety-500/20 text-safety-400 border border-safety-500/30 px-1.5 py-0.2 rounded-sm text-[10px] uppercase font-bold">
                {user.role}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="bg-steel-900 hover:bg-emergency-600 border border-steel-700 hover:border-emergency-500 text-steel-200 hover:text-white px-3 py-1.5 rounded-sm font-mono text-[11px] font-bold transition-all"
          >
            {loggingOut ? 'Logging out...' : 'Sign Out'}
          </button>
        </div>
      </header>

      {/* Main Admin Workspace (Sidebar + Content) */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-steel-900 border-r border-steel-800 text-steel-300 p-4 shrink-0 flex flex-col justify-between">
          <nav className="space-y-6">
            {navSections.map((sec, idx) => (
              <div key={idx}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel-500 font-bold block mb-2 px-2">
                  {sec.title}
                </span>
                <ul className="space-y-1">
                  {sec.items.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between px-2.5 py-2 rounded-sm text-xs font-semibold transition-colors ${
                            isActive
                              ? 'bg-emergency-500 text-white shadow-sm'
                              : 'text-steel-300 hover:bg-steel-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm">{item.icon}</span>
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-mono bg-steel-800 text-steel-300 px-1.5 py-0.5 rounded-sm">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="pt-6 border-t border-steel-800 text-[10px] font-mono text-steel-500 px-2">
            <p>New Sahyadri Elevators</p>
            <p className="mt-0.5">Operations Dispatch Desk</p>
          </div>
        </aside>

        {/* Right Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-surface-50 min-h-[calc(100vh-50px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
