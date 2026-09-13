import React from 'react';
import Link from 'next/link';

export function ServicesFloor() {
  return (
    <div data-floor="services" id="floor-services" className="relative flex min-h-screen flex-col bg-slate-50/50 border-t border-slate-200/60">
      <section id="services" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
        <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
          <div className="w-full max-w-5xl mx-auto">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                Navi Mumbai &amp; Pune • Maharashtra
              </p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Residential &amp; Commercial Elevator Services
              </h2>
              <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                From turnkey new installations and 24/7 breakdown rescue to structured preventive AMC maintenance, comprehensive safety audits, and open-architecture modernization. We also provide <a href="#contact" className="underline hover:text-brand-orange">instant AMC quotes</a>.
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div data-stagger-grid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Installation */}
              <Link
                href="/services/elevator-installation"
                className="group h-full border border-slate-200/80 bg-slate-50/80 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="4" y="3" width="16" height="18" rx="1" />
                    <line x1="9" y1="3" x2="9" y2="21" strokeDasharray="2 2" />
                    <line x1="15" y1="3" x2="15" y2="21" strokeDasharray="2 2" />
                    <rect x="7" y="9" width="10" height="8" rx="1" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Elevator Installation</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Turnkey mechanical design, hoistway engineering, Machine-Room-Less (MRL) and geared lifts with complete precision commissioning.
                </p>
              </Link>

              {/* Card 2: Breakdown Repair */}
              <Link
                href="/services/elevator-repair"
                className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Emergency Breakdown Repair</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  24/7 rapid mobile response with prompt engineering dispatch across Navi Mumbai and Pune.
                </p>
              </Link>

              {/* Card 3: AMC Maintenance */}
              <Link
                href="/services/elevator-maintenance"
                className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 2v4" />
                    <path d="m16.2 7.8 2.9-2.9" />
                    <path d="M18 12h4" />
                    <path d="m16.2 16.2 2.9 2.9" />
                    <path d="M12 18v4" />
                    <path d="m4.9 19.1 2.9-2.9" />
                    <path d="M2 12h4" />
                    <path d="m4.9 4.9 2.9 2.9" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Preventative AMC Maintenance</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Comprehensive and non-comprehensive contracts with monthly 25-point safety inspections and genuine parts.
                </p>
              </Link>

              {/* Card 4: Inspection & Testing */}
              <Link
                href="/services/safety-inspections-code-compliance"
                className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Inspection &amp; Testing</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  25-point comprehensive health audits, safety gear calibration, full-load drop tests, and ARD battery verification.
                </p>
              </Link>

              {/* Card 5: Modernization */}
              <Link
                href="/services/elevator-modernization"
                className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" y1="22" x2="12" y2="12" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Modernization &amp; Upgrades</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Microprocessor VVVF controller conversions, regenerative drives, energy-efficient machines, and modern cab interior remodels.
                </p>
              </Link>

              {/* Card 6: AMC Services */}
              <Link
                href="/contact/request-maintenance-quote"
                className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">AMC Services &amp; Quote</h3>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Comprehensive &amp; Non-Comprehensive annual maintenance contracts for housing societies at ~30% below OEM direct pricing.
                </p>
              </Link>
            </div>

            {/* Pill Chips Strip */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                Schindler Lifts
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                KONE MonoSpace
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                OTIS Gen2
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                Johnson Lifts
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                Thyssenkrupp / TKE
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                Monarch &amp; Step
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
              >
                Request Service
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
              >
                All Services Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
