import React from 'react';
import { DynamicQuoteCalculator } from '../DynamicQuoteCalculator';

export function ContactFloor() {
  return (
    <div data-floor="contact" id="floor-contact" className="relative flex min-h-screen flex-col bg-white border-t border-slate-200/60">
      <section id="contact" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
        <div className="floor-content relative z-10 flex min-h-[90vh] flex-col justify-start px-6 py-12 lg:py-16 lg:pr-12">
          <div className="w-full max-w-5xl mx-auto">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                Contact NSE &amp; Instant AMC Quote
              </p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Request Service or Instant AMC Quote
              </h2>
              <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                Connect directly with our 24/7 central dispatch desk or calculate an instant, transparent maintenance proposal for your building.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              {/* Left: Contact Details */}
              <div className="space-y-4 lg:col-span-5">
                <div data-card-unit className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-md text-slate-800">
                  <span className="text-xs font-mono font-bold uppercase text-brand-orange">
                    24/7 Central Dispatch Hotline
                  </span>
                  <h3 className="font-bold text-slate-900 text-xl mt-1">Immediate Assistance</h3>
                  <p className="text-slate-600 text-sm mt-2 text-justify">
                    For passenger entrapments or sudden elevator breakdowns across Navi Mumbai and Pune.
                  </p>
                  <a
                    href="tel:+919011096990"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-3 font-semibold text-sm text-white w-full shadow-md transition-all hover:bg-brand-orange-dark active:scale-95"
                  >
                    Call +91 90110 96990
                  </a>
                </div>

                <div data-card-unit className="rounded-xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-md text-slate-800">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Navi Mumbai Regional Hub</h4>
                    <p className="text-slate-600 text-xs mt-0.5">Airoli, Navi Mumbai, Maharashtra</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm">Pune Operations Depot</h4>
                    <p className="text-slate-600 text-xs mt-0.5">Dattanagar, Pune, Maharashtra</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-xs font-mono text-zinc-400">Email: office.pune@nsei.in</span>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Quote Form */}
              <div data-card-unit className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl lg:col-span-7 text-slate-800">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Instant AMC Proposal Calculator</h3>
                <p className="text-slate-600 text-xs mb-4 text-justify">Select your elevator specifications to receive an instant transparent estimate.</p>
                <DynamicQuoteCalculator embedded={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
