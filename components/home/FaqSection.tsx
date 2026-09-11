'use client';

import React, { useState } from 'react';

const faqItems = [
  {
    q: 'How quickly does NSE respond to elevator breakdowns and passenger entrapments?',
    a: 'Our emergency dispatch operates 24/7/365 with rapid response across Navi Mumbai and Pune. Certified field engineers are stationed in motorized rapid-response units stocked with critical OEM replacement spares.',
  },
  {
    q: 'Do you service all elevator makes, models, and discontinued brands?',
    a: 'Yes. Where multinational OEMs only service their own proprietary systems or push expensive replacements, our engineers diagnose and repair virtually any residential or commercial elevator — including Schindler, KONE, OTIS, Johnson, and TKE.',
  },
  {
    q: 'What is the difference between Comprehensive AMC and Non-Comprehensive AMC?',
    a: 'Comprehensive AMC (CAMC) covers all monthly preventive routines, emergency breakdown callbacks, and 100% cost of all replacement spare parts and oils. Non-Comprehensive AMC covers scheduled monthly maintenance routines and breakdown labor, with parts billed at transparent factory rates.',
  },
  {
    q: 'How does NSE achieve ~30% lower cost than OEM direct pricing?',
    a: 'Unlike multinational conglomerates with heavy corporate overheads and proprietary lock-in pricing, NSE operates lean local engineering hubs with direct supply channels for original OEM components, transparent itemized billing, and zero hidden diagnostic surcharges.',
  },
  {
    q: 'What is included in the Free 25-Point Elevator Health & Safety Audit?',
    a: 'Our certified engineers evaluate traction wire ropes, machine brakes, door operators, safety gear, ARD functioning, and hoistway limits, providing your housing society committee with an unbiased condition report with photographic evidence.',
  },
];

export function FaqSection() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  return (
    <section id="faq" className="transition-floor-bar relative">
      <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
      <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
        <div className="mx-auto w-full text-center max-w-3xl">
          <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">Frequently Asked Questions</h2>
          <div className="mx-auto rounded-xl border border-slate-200/90 bg-white p-3 text-left shadow-sm hover:border-brand-orange/40 md:p-4 transition-all text-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-orange transition-colors md:text-base">
                {faqItems[activeFaqIndex].q}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                {faqItems[activeFaqIndex].a}
              </p>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveFaqIndex((prev) => (prev === 0 ? faqItems.length - 1 : prev - 1))}
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-brand-orange hover:text-brand-orange shadow-xs cursor-pointer"
                aria-label="Previous question"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <div className="flex items-center gap-1">
                {faqItems.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveFaqIndex(i)}
                    className="flex min-h-[44px] min-w-[24px] items-center justify-center px-1 cursor-pointer"
                    aria-label={`Go to question ${i + 1}`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all block ${
                        activeFaqIndex === i ? 'w-6 bg-brand-orange' : 'w-1.5 bg-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveFaqIndex((prev) => (prev === faqItems.length - 1 ? 0 : prev + 1))}
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-brand-orange hover:text-brand-orange shadow-xs cursor-pointer"
                aria-label="Next question"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
