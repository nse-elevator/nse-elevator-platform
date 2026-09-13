import React from 'react';
import Link from 'next/link';

const PUNE_DEPOT_LOCALITIES = [
  'Hinjewadi',
  'Baner',
  'Wakad',
  'Hadapsar',
  'Ravet',
  'Punavale',
  'Tathawade',
  'Chinchwad',
  'Pashan',
  'Mamurdi',
  'Marunji',
  'Nere',
];

export function ServiceAreasFloor() {
  return (
    <div data-floor="service-areas" id="floor-service-areas" className="relative flex min-h-screen flex-col bg-slate-50/50 border-t border-slate-200/60">
      <section id="service-areas" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
        <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
          <div className="w-full max-w-5xl mx-auto">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                Regional Operations Command • 24/7 Rapid Dispatch
              </p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Service Areas &amp; Operations Hubs
              </h2>
              <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                Certified field engineering teams stationed at dedicated regional depots in Pune and Navi Mumbai, backed by 24/7 motorized rapid-response units and stocked OEM spare parts.
              </p>
            </div>

            {/* 2 Flagship Command Depots */}
            <div data-stagger-grid className="mt-10 grid gap-4 md:grid-cols-2">
              {/* Pune Depot */}
              <Link
                href="/locations/elevator-repair-pune"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    24/7 Field Units
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Pune Operations Depot</h3>
                <p className="font-mono text-xs text-slate-500 mt-1">
                  Pune • PCMC &amp; Western Corridors
                </p>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Primary regional depot deploying certified engineers for 24/7 rapid emergency response, comprehensive preventative AMC, and multi-brand repairs across Pune &amp; PCMC.
                </p>
              </Link>

              {/* Mumbai & Navi Mumbai HQ */}
              <Link
                href="/locations/elevator-repair-navi-mumbai"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    24/7 Field Units
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Mumbai &amp; Navi Mumbai HQ</h3>
                <p className="font-mono text-xs text-slate-500 mt-1">
                  Airoli, Navi Mumbai • MMR Metropolitan Region
                </p>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Central operations command providing 24/7 emergency dispatch, certified lift servicing, and genuine OEM parts across Navi Mumbai, Mumbai, and MMR metropolitan corridors.
                </p>
              </Link>
            </div>

            {/* Below the Card: Pune & PCMC Covered Localities Pill Strip */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Pune &amp; PCMC Covered Localities ({PUNE_DEPOT_LOCALITIES.length} Active Hubs):
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {PUNE_DEPOT_LOCALITIES.map((locality) => (
                  <Link
                    key={locality}
                    href="/locations/elevator-repair-pune"
                    className="rounded-full border border-slate-300 bg-slate-100/90 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:bg-orange-50/80 hover:text-brand-orange hover:shadow-md cursor-pointer no-underline"
                  >
                    {locality}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
              >
                Request Immediate Dispatch
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/locations"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
              >
                All Service Locations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION BAR 4: OPERATIONAL TRACK RECORD */}
      <section id="certifications" className="transition-floor-bar relative">
        <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
        <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
          <div className="mx-auto w-full text-center max-w-6xl">
            <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">Proven Operational Track Record</h2>
            <div data-stagger-grid className="mx-auto grid max-w-5xl grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-3 xl:grid-cols-5">
              <div className="h-full min-h-0">
                <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                  <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">15+ Years</h3>
                  <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Pune &amp; Mumbai Ops</p>
                </div>
              </div>

              <div className="h-full min-h-0">
                <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                  <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                      <line x1="9" y1="2" x2="9" y2="22" />
                      <line x1="15" y1="2" x2="15" y2="22" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">350+ Elevators</h3>
                  <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Under Active Care</p>
                </div>
              </div>

              <div className="h-full min-h-0">
                <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                  <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">15+ Engineers</h3>
                  <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Pune Field Team</p>
                </div>
              </div>

              <div className="h-full min-h-0">
                <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                  <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">24/7 Dispatch</h3>
                  <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Rapid Field Units</p>
                </div>
              </div>

              <div className="h-full min-h-0">
                <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                  <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">~30% Savings</h3>
                  <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Direct OEM Spares</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
