import React from 'react';
import Link from 'next/link';

export function CaseStudiesFloor() {
  return (
    <div data-floor="case-studies" id="floor-case-studies" className="relative flex min-h-screen flex-col bg-white border-t border-slate-200/60">
      <section id="case-studies" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
        <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
          <div className="w-full max-w-5xl mx-auto">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                Verified Fleet Performance • Proven Outcomes
              </p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Proven Reliability &amp; Client Outcomes
              </h2>
              <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                Real-world results for residential housing societies and commercial facilities across Maharashtra — eliminating recurring breakdowns, reducing costs, and achieving 100% compliance pass rates.
              </p>
            </div>

            {/* 3 Transformation Case Cards */}
            <div data-stagger-grid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Case 1: Greenfield Heights */}
              <Link
                href="/case-studies/greenfield-heights-amc-takeover"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                    -82% Callbacks
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Greenfield Heights CHS</h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">6 Geared Passenger Cars • Airoli</p>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Migrated from multinational OEM after chronic callback delays. Monthly failures dropped from 11/mo to under 1/mo while saving 34% annually.
                </p>
              </Link>

              {/* Case 2: Mayflower Residency */}
              <Link
                href="/case-studies/mayflower-residency-safety-audit"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                    100% ARD Pass
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Mayflower Residency CHS</h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">4 Passenger Lifts • Kothrud, Pune</p>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Emergency safety remediation and ARD battery bank restoration within 72 hours, delivering 100% fail-safe passenger rescue.
                </p>
              </Link>

              {/* Case 3: Apex Hospital */}
              <Link
                href="/case-studies"
                className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                    99.9% Uptime
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Apex Multi-Specialty Hospital</h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">3 Bed Lifts • Vashi, Navi Mumbai</p>
                <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                  Full-scope drive modernization to open-protocol microprocessor controllers, delivering 100% ARD failover reliability.
                </p>
              </Link>
            </div>

            {/* KPI Strip */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                99.8% Fleet Uptime
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                Rapid Response SLA
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                31% Average Cost Reduction
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                100% Safety Verified
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
              >
                View All Case Studies
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
              >
                Request Free Safety Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION BAR 5: STATS */}
      <section id="stats" className="transition-floor-bar relative">
        <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
        <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
          <div className="mx-auto w-full text-center max-w-6xl">
            <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">Trusted Across Maharashtra</h2>
            <div data-stagger-grid className="mx-auto grid max-w-5xl grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2">
              <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                <p className="text-xl font-bold text-brand-orange md:text-2xl">15+</p>
                <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Years in Business</p>
                <p className="text-[10px] text-slate-500 md:text-xs">Serving MH since 2011</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                <p className="text-xl font-bold text-brand-orange md:text-2xl">450+</p>
                <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Elevators Maintained</p>
                <p className="text-[10px] text-slate-500 md:text-xs">Across Navi Mumbai &amp; Pune</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                <p className="text-xl font-bold text-brand-orange md:text-2xl">4.9★</p>
                <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Google Rating</p>
                <p className="text-[10px] text-slate-500 md:text-xs">From 120+ verified reviews</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                <p className="text-xl font-bold text-brand-orange md:text-2xl">Rapid</p>
                <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Emergency Dispatch SLA</p>
                <p className="text-[10px] text-slate-500 md:text-xs">Guaranteed rapid arrival</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
