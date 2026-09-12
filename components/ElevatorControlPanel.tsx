'use client';

import React, { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface ElevatorControlPanelProps {
  currentFloor: string;
  onSelectFloor?: (floorId: string) => void;
  direction?: 'up' | 'down' | 'idle';
}

const CornerScrew = memo(function CornerScrew({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const style = {
    top: position.startsWith('t') ? '6px' : undefined,
    bottom: position.startsWith('b') ? '6px' : undefined,
    left: position.endsWith('l') ? '6px' : undefined,
    right: position.endsWith('r') ? '6px' : undefined,
  };

  return (
    <svg width="18" height="18" viewBox="0 0 32 32" className="pointer-events-none absolute z-30" style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`cop-screw-${position}`} cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill={`url(#cop-screw-${position})`} />
      <circle cx="16" cy="16" r="13" fill="none" stroke="#94a3b8" strokeWidth="1.1" />
      <path d="M16 7.2v17.6M7.2 16h17.6" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 8.2v15.6M8.2 16h15.6" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
});

const NAV_FLOORS = [
  { href: '/', sectionId: 'hero', label: 'Home', num: 'G', activeFloors: ['floor-g', 'hero'] },
  { href: '/services', sectionId: 'services', label: 'Services', num: '1', activeFloors: ['services', 'floor-services', 'floor-installations'] },
  { href: '/industries', sectionId: 'industries', label: 'Industries', num: '2', activeFloors: ['industries', 'floor-industries', 'floor-repairs'] },
  { href: '/locations', sectionId: 'service-areas', label: 'Service Areas', num: '3', activeFloors: ['service-areas', 'floor-service-areas', 'floor-maintenance'] },
  { href: '/case-studies', sectionId: 'case-studies', label: 'Case Studies', num: '4', activeFloors: ['case-studies', 'floor-case-studies', 'floor-inspections'] },
  { href: '/about', sectionId: 'about', label: 'About Us', num: '5', activeFloors: ['about', 'floor-about'] },
  { href: '/contact', sectionId: 'contact', label: 'Contact Us', num: '5', activeFloors: ['contact', 'floor-contact'] },
];

export function ElevatorControlPanel({
  currentFloor,
  onSelectFloor,
  direction = 'idle',
}: ElevatorControlPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  // Close mobile drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpenMobile(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpenMobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMobile]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  const getDisplayFloor = () => {
    switch (currentFloor) {
      case 'floor-g':
      case 'hero':
        return 'G';
      case 'floor-services':
      case 'services':
      case 'floor-installations':
        return '1';
      case 'floor-industries':
      case 'industries':
      case 'floor-repairs':
        return '2';
      case 'floor-service-areas':
      case 'service-areas':
      case 'floor-maintenance':
        return '3';
      case 'floor-case-studies':
      case 'case-studies':
      case 'floor-inspections':
        return '4';
      case 'floor-about':
      case 'about':
      case 'floor-contact':
      case 'contact':
        return '5';
      default:
        return 'G';
    }
  };

  const handleNavClick = (href: string, sectionId: string) => {
    setIsOpenMobile(false);
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        if (typeof window !== 'undefined' && window.history?.replaceState) {
          window.history.replaceState(null, '', sectionId === 'hero' ? '/' : `#${sectionId}`);
        }
      }
      if (onSelectFloor) {
        onSelectFloor(sectionId);
      }
    } else {
      router.push(href);
    }
  };

  const prefetchFloor = (href: string) => {
    if (pathname !== '/' && href && href !== '/') {
      try {
        router.prefetch(href);
      } catch {
        // Safe fallback
      }
    }
  };

  const triggerAlarm = () => {
    setAlarmActive(true);
    setTimeout(() => setAlarmActive(false), 1800);
  };

  return (
    <>
      {/* Mobile Control Panel Toggle Button */}
      <button
        type="button"
        aria-expanded={isOpenMobile}
        aria-controls="elevator-control-panel"
        aria-label="Open elevator panel"
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="fixed left-3 top-3 z-[60] flex h-11 w-11 items-center justify-center rounded-md text-slate-800 transition-all hover:bg-slate-100 lg:hidden border border-slate-300 bg-white/95 shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {isOpenMobile ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Control Operating Panel (COP) Sidebar */}
      <aside
        id="elevator-control-panel"
        role={isOpenMobile ? 'dialog' : undefined}
        aria-modal={isOpenMobile ? 'true' : undefined}
        className={`fixed inset-y-0 left-0 z-50 overflow-y-auto overflow-x-hidden border-r border-slate-300 transition-transform duration-300 ease-in-out lg:z-40 cop-wood-wall ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          width: 'min(300px, 85vw)',
          minHeight: '100vh',
          height: '100%',
        }}
        aria-label="Elevator control panel"
      >
        <div className="relative flex w-full max-w-[300px] flex-col items-stretch py-4 px-2">
          {/* Brushed Metal Plate Container */}
          <div className="cop-metal-panel relative flex w-full flex-col rounded-md px-4 py-4">
            <CornerScrew position="tl" />
            <CornerScrew position="tr" />
            <CornerScrew position="bl" />
            <CornerScrew position="br" />

            {/* Brand Logo Header */}
            <div className="mb-3.5 flex flex-col items-center justify-center pt-2 text-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/95 rounded border border-slate-300 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="font-mono text-xs font-black tracking-widest text-slate-900 uppercase">
                  NSE SMART
                </span>
              </div>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                New Sahyadri Elevator
              </p>
            </div>

            {/* Max Capacity Indicator */}
            <div className="mx-auto mb-3 cursor-default select-none rounded-sm px-3 py-2 text-center w-[86%] border border-slate-300 shadow-sm bg-gradient-to-b from-white to-slate-100">
              <p className="cursor-default text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Max Safe Rated Capacity
              </p>
              <p className="cursor-default font-mono text-lg font-bold text-amber-600 tracking-wider">
                13 PERS / 884 KG
              </p>
            </div>

            {/* Digital LED Floor Display */}
            <div className="flex justify-center">
              <div className="cop-display-housing mx-auto flex h-[4.5rem] w-12 cursor-default select-none items-center justify-center rounded-sm">
                <p
                  className="cursor-default font-mono text-3xl font-bold tabular-nums leading-none text-emerald-400"
                  style={{ textShadow: '0 0 14px rgba(52,211,153,0.65)' }}
                >
                  {getDisplayFloor()}
                </p>
              </div>
            </div>

            {/* Up & Down Direction Chevrons */}
            <div className="mt-3 flex justify-center gap-5">
              <div className="cop-display-housing flex h-9 w-9 items-center justify-center rounded-sm" aria-label="up direction indicator">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-sm transition-all duration-300 ${
                    direction === 'up'
                      ? 'bg-emerald-900/90 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-emerald-950/30'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${direction === 'up' ? 'text-emerald-400' : 'text-emerald-950/70'}`} aria-hidden="true">
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </div>
              </div>

              <div className="cop-display-housing flex h-9 w-9 items-center justify-center rounded-sm" aria-label="down direction indicator">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-sm transition-all duration-300 ${
                    direction === 'down'
                      ? 'bg-emerald-900/90 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-emerald-950/30'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${direction === 'down' ? 'text-emerald-400' : 'text-emerald-950/70'}`} aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tactile Navigation Menu */}
            <nav aria-label="Elevator Panel Navigation" className="mt-4 flex flex-col gap-2">
              {NAV_FLOORS.map((item) => {
                const isActive = item.activeFloors.includes(currentFloor);
                return (
                  <button
                    key={item.sectionId}
                    type="button"
                    onClick={() => handleNavClick(item.href, item.sectionId)}
                    onPointerEnter={() => prefetchFloor(item.href)}
                    onFocus={() => prefetchFloor(item.href)}
                    className={`mx-auto w-[240px] max-w-full rounded-md border transition-all cursor-pointer min-h-[44px] flex items-center active:scale-[0.98] ${
                      isActive
                        ? 'border-brand-orange ring-2 ring-brand-orange/30 bg-orange-50/80 shadow-sm'
                        : 'border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 shadow-sm'
                    }`}
                  >
                    <div className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-bold uppercase tracking-wider ${
                      isActive ? 'text-brand-orange' : 'text-slate-700 hover:text-slate-900'
                    }`}>
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-brand-orange shadow-[0_0_6px_#FF5C00]' : 'bg-slate-300'
                        }`} />
                        {item.label}
                      </span>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-brand-orange font-bold' : 'text-slate-400'}`}>
                        {item.num}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Get a Free Quote Button */}
              <button
                type="button"
                onClick={() => handleNavClick('/contact', 'contact')}
                className="mx-auto mt-1 w-[240px] max-w-full rounded-md bg-brand-orange hover:bg-brand-orange-dark text-white p-3 text-center font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-brand-orange/30 transition-all cursor-pointer active:scale-95 block min-h-[44px]"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Get a Free Quote</span>
                  <span>→</span>
                </div>
              </button>
            </nav>

            {/* Perforated Speaker Grille Pattern */}
            <div className="mt-1.5 flex flex-col items-center gap-1.5">
              <div className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-full" aria-hidden="true">
                <div className="grid grid-cols-5 gap-[3px] p-1">
                  {[...Array(25)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-[6px] w-[6px] ${[0, 4, 20, 24].includes(idx) ? '' : 'rounded-full bg-slate-300 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Metallic Phone Keypad */}
              <div className="mx-auto w-fit" aria-hidden="true">
                <div className="grid grid-cols-3 gap-1">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      tabIndex={-1}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-slate-300 bg-gradient-to-b from-white to-slate-100 text-[11px] font-bold text-slate-800 shadow-sm hover:bg-white active:translate-y-px transition-all select-none"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency / Service Phone Box */}
            <div className="mx-auto mt-3 w-[86%]">
              <a
                href="tel:+919049994679"
                className="block w-full transition-all hover:shadow-md rounded-sm border border-slate-300 p-[1px] shadow-sm bg-white"
              >
                <span className="relative overflow-hidden rounded-sm flex items-center justify-center gap-2.5 px-3 py-3 bg-white">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-600" aria-hidden="true">
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Emergency / Service</p>
                    <p className="text-sm font-bold text-slate-900">+91 90499 94679</p>
                  </div>
                </span>
              </a>
            </div>

            {/* Client Login Metallic Button */}
            <Link
              href="/admin"
              className="mx-auto mt-3 block rounded-sm px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 transition-all w-[86%] border border-slate-300 shadow-sm"
            >
              Client Login
            </Link>

            {/* Direct Link to Corporate Footer */}
            <a
              href="#site-footer"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenMobile(false);
                const el = document.getElementById('site-footer');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mx-auto mt-2 block text-center text-[10px] font-mono text-slate-500 hover:text-brand-orange transition-colors"
            >
              Corporate Directory &amp; Footer ↓
            </a>

            {/* Bottom Actions: Alarm Bell & WhatsApp */}
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={triggerAlarm}
                aria-label="Alarm — hold to sound"
                title="Alarm (hold to sound)"
                className={`flex h-11 w-11 cursor-pointer touch-none items-center justify-center rounded-full border-[3px] border-red-900 bg-gradient-to-b from-red-500 to-red-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.4)] transition-all hover:brightness-110 active:translate-y-px active:brightness-95 select-none ${
                  alarmActive ? 'scale-95 brightness-125 animate-bounce' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white" aria-hidden="true">
                  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                </svg>
              </button>

              <a
                href="https://wa.me/919049994679?text=Hello%20NSE%2C%20I%20need%20urgent%20elevator%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                title="Direct WhatsApp Hotline"
                className="flex h-11 w-20 cursor-pointer items-center justify-center rounded-sm text-[9px] font-bold uppercase text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all active:translate-y-px border border-emerald-300 shadow-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Dispatch Operations Trust Badge Plate */}
          <div className="mt-3 flex justify-center px-1">
            <div className="group relative block overflow-hidden rounded-xl no-underline border border-slate-300 bg-white/95 p-2.5 text-center shadow-sm" style={{ width: '220px' }}>
              <div className="flex items-center justify-center gap-1.5 mb-1 text-emerald-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                24/7 Rapid Dispatch
              </div>
              <p className="text-[9px] font-semibold text-slate-700 leading-tight">Prompt Field Dispatch</p>
              <p className="text-[8px] text-slate-500 font-mono mt-0.5">Navi Mumbai &amp; Pune Field Hubs</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
