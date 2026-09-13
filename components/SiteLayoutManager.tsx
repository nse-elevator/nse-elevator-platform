'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { GlobalFooter } from './GlobalFooter';

const ElevatorControlPanel = dynamic(
  () => import('./ElevatorControlPanel').then((mod) => mod.ElevatorControlPanel),
  { ssr: true }
);

const StickyMobileCTA = dynamic(
  () => import('./StickyMobileCTA').then((mod) => mod.StickyMobileCTA),
  { ssr: false }
);

const FloatingWhatsAppCTA = dynamic(
  () => import('./FloatingWhatsAppCTA').then((mod) => mod.FloatingWhatsAppCTA),
  { ssr: false }
);

export function SiteLayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isAdmin = pathname?.startsWith('/admin');

  // Universal Viewport Observer: Non-blocking card entrance animation
  useEffect(() => {
    if (typeof window === 'undefined' || isAdmin) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      const cards = document.querySelectorAll<HTMLElement>(
        '[data-stagger-grid] > *, [data-card-unit], .service-card-entrance'
      );
      cards.forEach((c) => c.classList.add('is-visible'));
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '80px 0px 40px 0px' }
    );

    // Attach promptly and trigger cards already in viewport immediately
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll<HTMLElement>(
        '[data-stagger-grid] > *:not(.is-visible), [data-card-unit]:not(.is-visible), .service-card-entrance:not(.is-visible)'
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80 && rect.bottom > -40) {
          card.classList.add('is-visible');
        } else {
          intersectionObserver.observe(card);
        }
      });
    }, 50);

    // Safety fallback: reveal any dynamically loaded or late-rendered cards
    const safetyTimer = setTimeout(() => {
      const remaining = document.querySelectorAll<HTMLElement>(
        '[data-stagger-grid] > *:not(.is-visible), [data-card-unit]:not(.is-visible), .service-card-entrance:not(.is-visible)'
      );
      remaining.forEach((card) => {
        card.classList.add('is-visible');
      });
    }, 350);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      intersectionObserver.disconnect();
    };
  }, [pathname, isAdmin]);

  if (isHomepage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 lg:pb-0">
        {children}
        <StickyMobileCTA />
        <FloatingWhatsAppCTA />
      </div>
    );
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  // Derive active floor for subpages
  let currentFloor = 'hero';
  let floorNumber = 'G';
  let floorLabel = 'LOBBY';

  if (pathname?.startsWith('/services')) {
    currentFloor = 'services';
    floorNumber = '1';
    floorLabel = 'SERVICES';
  } else if (pathname?.startsWith('/industries')) {
    currentFloor = 'industries';
    floorNumber = '2';
    floorLabel = 'INDUSTRIES';
  } else if (pathname?.startsWith('/locations')) {
    currentFloor = 'service-areas';
    floorNumber = '3';
    floorLabel = 'SERVICE AREAS';
  } else if (pathname?.startsWith('/case-studies')) {
    currentFloor = 'case-studies';
    floorNumber = '4';
    floorLabel = 'CASE STUDIES';
  } else if (pathname?.startsWith('/about')) {
    currentFloor = 'about';
    floorNumber = '5';
    floorLabel = 'ABOUT US';
  } else if (pathname?.startsWith('/contact') || pathname?.startsWith('/emergency')) {
    currentFloor = 'contact';
    floorNumber = '5';
    floorLabel = 'DISPATCH DESK';
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-brand-orange selection:text-white font-sans">
      {/* 1. The ONLY Header on the Website: Left Elevator Control Operating Panel (COP) */}
      <ElevatorControlPanel
        currentFloor={currentFloor}
        direction="idle"
      />

      {/* 2. Elevator Door Jamb Reveal Line (Desktop) */}
      <div
        className="pointer-events-none fixed inset-y-0 left-[var(--cop-width,300px)] z-[5] hidden w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent lg:block"
        aria-hidden="true"
      />

      {/* 3. Main Viewport Padded on Left for Left COP Header */}
      <div className="pl-0 lg:pl-[var(--cop-width,300px)] flex flex-col min-h-screen">
        {/* Full Horizontal Sticky Navbar for Subpages (with mobile hamburger clearance) */}
        <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 py-2.5 pl-16 lg:pl-6 flex items-center justify-between text-xs text-slate-600 shadow-2xs transition-shadow">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              prefetch={true}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-800 hover:text-brand-orange transition-colors min-h-[44px]"
            >
              <span className="text-brand-orange text-sm font-bold">←</span>
              <span className="hidden sm:inline">Elevator Cab</span>
              <span className="text-slate-400 font-normal">Home</span>
            </Link>

            {/* Desktop Horizontal Navigation Links */}
            <nav aria-label="Subpage Navigation" className="hidden lg:flex items-center gap-1">
              {[
                { href: '/services', label: 'Services', active: pathname?.startsWith('/services') },
                { href: '/industries', label: 'Industries', active: pathname?.startsWith('/industries') },
                { href: '/locations', label: 'Locations', active: pathname?.startsWith('/locations') },
                { href: '/case-studies', label: 'Case Studies', active: pathname?.startsWith('/case-studies') },
                { href: '/about', label: 'About Us', active: pathname?.startsWith('/about') },
                { href: '/contact', label: 'Contact', active: pathname?.startsWith('/contact') },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-2.5 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                    link.active
                      ? 'bg-orange-50 text-brand-orange font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919049994679"
              className="hidden xl:inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 hover:text-brand-orange transition-colors"
            >
              <span className="text-brand-orange">📞</span>
              <span>+91 90499 94679</span>
            </a>
            <Link
              href="/contact/request-maintenance-quote"
              prefetch={true}
              className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-semibold px-3 py-2 min-h-[38px] rounded-md shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Get AMC Bid
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">FLOOR </span>{floorNumber} • {floorLabel}
            </span>
          </div>
        </header>

        <main className="flex-grow">{children}</main>
        <GlobalFooter />
        <StickyMobileCTA />
        <FloatingWhatsAppCTA />
      </div>
    </div>
  );
}

