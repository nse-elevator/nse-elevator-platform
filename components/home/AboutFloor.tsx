import React from 'react';
import Link from 'next/link';

export function AboutFloor() {
  return (
    <div data-floor="about" id="floor-about" className="relative flex min-h-screen flex-col bg-slate-50/50 border-t border-slate-200/60">
      <section id="about" className="relative flex-1 flex flex-col justify-center">
        <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
          <div className="w-full max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                An Engineering Team Built on Technical Integrity
              </h2>
              <p className="mt-6 max-w-4xl leading-relaxed text-slate-600 text-base sm:text-lg text-justify">
                New Sahyadri Elevator was founded over 15 years ago with a mission to free building owners and housing societies from multinational OEM monopoly lock-in. Where multinational conglomerates push costly full replacements, our certified engineers troubleshoot and repair down to component level.
              </p>
              <p className="mt-4 max-w-4xl leading-relaxed text-slate-600 text-base sm:text-lg text-justify">
                Today, our master technicians manage 350+ elevator cars across Navi Mumbai and Pune. Combining rigorous preventative multi-point safety protocols with genuine spare parts supply and ~30% lower costs, we ensure your building enjoys zero-breakdown vertical transport.
              </p>
            </div>

            {/* 4 Operational Pillars */}
            <div data-stagger-grid className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                <span className="font-mono text-xs font-bold text-brand-orange uppercase">Experience</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">15+ Years</h3>
                <p className="text-slate-500 text-xs mt-1">Mumbai &amp; Pune Operations</p>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Track Record</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">450+ Lifts</h3>
                <p className="text-slate-500 text-xs mt-1">Under active management</p>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                <span className="font-mono text-xs font-bold text-amber-400 uppercase">Rapid Rescue</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">Rapid SLA</h3>
                <p className="text-slate-500 text-xs mt-1">Motorized mobile units</p>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                <span className="font-mono text-xs font-bold text-purple-400 uppercase">Savings</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">~30% Lower</h3>
                <p className="text-slate-500 text-xs mt-1">Direct from OEM pricing</p>
              </div>
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
                href="/about"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
              >
                More Info
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
