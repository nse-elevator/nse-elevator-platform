'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export function MegaNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const navRef = useRef<HTMLElement>(null);

  // Monitor active section on homepage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isHome = pathname === '/';
    if (!isHome) return;

    const sectionIds = [
      'hero',
      'services',
      'industries',
      'service-areas',
      'case-studies',
      'about',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -35% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavPrefetch = (href: string) => {
    if (href && href !== pathname && href !== '/') {
      router.prefetch(href);
    }
  };

  const handleNavClick = (href: string, sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        if (typeof window !== 'undefined' && window.history?.replaceState) {
          window.history.replaceState(null, '', sectionId === 'hero' ? '/' : `#${sectionId}`);
        }
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main Navigation"
      className="sticky top-0 z-40 w-full border-b border-black/30 text-white transition-shadow"
      style={{
        backgroundColor: '#3a3a3e',
        backgroundImage: 'linear-gradient(175deg, #9a9a9e 0%, #7a7a7e 12%, #626266 38%, #4e4e52 65%, #3a3a3e 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Identifier */}
          <div className="flex items-center gap-3">
            <Link href="/" prefetch={true} className="flex items-center gap-3 focus-ring rounded-sm">
              <div className="w-10 h-10 bg-steel-800 border border-steel-700 flex items-center justify-center rounded-sm text-steel-200">
                {/* Mechanical Elevator Cable / Sheave Icon */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="3" width="16" height="18" rx="1" />
                  <line x1="9" y1="3" x2="9" y2="21" strokeDasharray="2 2" />
                  <line x1="15" y1="3" x2="15" y2="21" strokeDasharray="2 2" />
                  <rect x="7" y="9" width="10" height="8" rx="1" fill="#1E293B" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight leading-none text-white uppercase">
                  NSE <span className="text-emergency-500">SMART</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-steel-400 uppercase mt-0.5">
                  NSE – New Sahyadri Elevator • Excellence in Service
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: 'hero', label: 'Home', href: '/' },
              { id: 'services', label: 'Services', href: '/services' },
              { id: 'industries', label: 'Industries', href: '/industries' },
              { id: 'service-areas', label: 'Service Areas', href: '/locations' },
              { id: 'case-studies', label: 'Case Studies', href: '/case-studies' },
              { id: 'about', label: 'About Us', href: '/about' },
              { id: 'contact', label: 'Contact Us', href: '/contact' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onPointerEnter={() => handleNavPrefetch(item.href)}
                  onFocus={() => handleNavPrefetch(item.href)}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-sm transition-all relative ${
                    isActive
                      ? 'text-white bg-white/10 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-orange rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919011096990"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-orange"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-brand-orange">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              +91 90110 96990
            </a>
            {/* 8. Get a Free Quote */}
            <button
              type="button"
              onClick={() => handleNavClick('/contact', 'contact')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all bg-brand-orange text-white hover:bg-brand-orange-dark h-10 rounded-md px-5 text-xs shadow-md cursor-pointer"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-steel-300 hover:text-white hover:bg-steel-800 focus-ring"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          {[
            { id: 'hero', label: 'Home', href: '/' },
            { id: 'services', label: 'Services', href: '/services' },
            { id: 'industries', label: 'Industries', href: '/industries' },
            { id: 'service-areas', label: 'Service Areas', href: '/locations' },
            { id: 'case-studies', label: 'Case Studies', href: '/case-studies' },
            { id: 'about', label: 'About Us', href: '/about' },
            { id: 'contact', label: 'Contact Us', href: '/contact' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onPointerEnter={() => handleNavPrefetch(item.href)}
                onFocus={() => handleNavPrefetch(item.href)}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`w-full text-left px-4 py-3 text-base font-semibold rounded-md transition-colors flex items-center justify-between min-h-[48px] ${
                  isActive
                    ? 'text-brand-orange bg-brand-orange/10 font-bold border-l-2 border-brand-orange pl-3'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-zinc-500 text-xs">→</span>
              </button>
            );
          })}

          {/* Mobile CTAs */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => handleNavClick('/contact', 'contact')}
              className="w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-md text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer min-h-[48px] flex items-center justify-center"
            >
              Get a Free Quote →
            </button>
            <a
              id="mobile-nav-call-btn"
              href="tel:+919011096990"
              className="w-full text-center bg-white/10 border border-white/20 text-white font-mono font-bold py-3.5 rounded-md text-sm transition-all block min-h-[48px] flex items-center justify-center"
            >
              24/7 DISPATCH: +91 90110 96990
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
