import React from 'react';
import Link from 'next/link';
import { FaqSection } from './FaqSection';

export function IndustriesFloor() {
  return (
    <div data-floor="industries" id="floor-industries" className="relative flex min-h-screen flex-col bg-white border-t border-slate-200/60">
      <section id="industries" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
        <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
          <div className="w-full max-w-5xl mx-auto">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                Sector-Specific Engineering • Tailored Mobility
              </p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Industries &amp; Facilities We Serve
              </h2>
              <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                Every building environment demands a tailored duty-cycle, traffic profile, and safety protocol — from commercial IT parks and hospitals to housing societies and freight warehouses.
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div data-stagger-grid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Commercial Office */}
              <Link
                href="/industries/commercial-office-buildings"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Commercial Office Buildings</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Destination dispatch optimization, 1.5–2.5 m/s VVVF gearless speeds, and sub-25s hall wait times for corporate IT parks.
                </p>
              </Link>

              {/* Card 2: Housing Societies */}
              <Link
                href="/industries/residential-high-rises-condos"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Housing Societies (CHS)</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Whisper-quiet leveling, ARD auto-rescue battery failover, and ~30% lower costs to safeguard society reserve funds.
                </p>
              </Link>

              {/* Card 3: Hospitals */}
              <Link
                href="/industries/hospital-healthcare-elevators"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Hospitals &amp; Healthcare</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Mission-critical bed lifts and trauma elevator uptime with 20-min emergency priority and sterile clean-room protocols.
                </p>
              </Link>

              {/* Card 4: Hotels */}
              <Link
                href="/industries/hotel-hospitality-elevators"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Hotels &amp; Hospitality</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Vibration-free ride quality, architectural cab finishes, and discreet off-peak night servicing to protect guest reviews.
                </p>
              </Link>

              {/* Card 5: Education */}
              <Link
                href="/industries/education-campuses"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Universities &amp; Campuses</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  High-durability vandal-resistant door fixtures engineered for student halls and research laboratory complexes.
                </p>
              </Link>

              {/* Card 6: Industrial */}
              <Link
                href="/industries/industrial-freight-elevators"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Industrial &amp; Freight</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Heavy 3,000kg+ capacity freight elevators, reinforced sill plates, and hydraulic cylinder overhauls for warehouses.
                </p>
              </Link>
            </div>

            {/* Pill Chips Strip */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                15+ Years Pune &amp; Mumbai
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                350+ Elevators Under Care
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                15+ Certified Engineers
              </span>
              <span className="rounded-full border border-brand-orange/40 bg-brand-orange/15 px-4 py-1.5 text-sm font-semibold text-brand-orange backdrop-blur-sm">
                24/7 Rapid Response Dispatch
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
              >
                Request Facility Assessment
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/industries"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
              >
                All Industries Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION BAR 3: FAQS */}
      <FaqSection />
    </div>
  );
}
