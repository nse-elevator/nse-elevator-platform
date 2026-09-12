'use client';

import React from 'react';
import Link from 'next/link';
import { trackPhoneClick } from '../lib/analytics';

export function FreeAuditLeadMagnet() {
  return (
    <section 
      aria-label="Free Elevator Health and Safety Audit Offer"
      className="w-full bg-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 relative overflow-hidden"
    >
      {/* Precision Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-card-unit className="bg-white border-2 border-brand-orange/40 rounded-2xl p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left: Headline & Context */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-brand-orange/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest text-brand-orange uppercase">
                  100% Free – No Obligation
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Free 25-Point Comprehensive Elevator Health &amp; Safety Audit
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
                Is your residential society or commercial complex facing recurring lift shutdowns, jerky rides, or exorbitant AMC quotes? Book a zero-cost, multi-brand diagnostic inspection conducted by certified lift engineers across Navi Mumbai and Pune.
              </p>

              {/* 3 Core Inclusions */}
              <div data-stagger-grid className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
                      Complete Health Check
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug text-justify">
                      Deep mechanical, traction rope, door operator, drive, and safety gear examination.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
                      Detailed Condition Report
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug text-justify">
                      Written technical scorecard with photographic evidence, wear levels, and risk priorities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
                      Maintenance Assessment
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug text-justify">
                      Independent appraisal of current service quality, genuine spares pricing, and ~30% cost savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Conversion Action Panel */}
            <div className="lg:w-80 shrink-0 bg-slate-50 border border-slate-200 p-6 rounded-xl text-center space-y-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold">
                Society &amp; Commercial Priority
              </span>
              <p className="text-xs text-slate-600">
                Available for high-rise buildings in Navi Mumbai &amp; Pune. No contract commitment required.
              </p>

              <Link
                href="/contact/request-maintenance-quote"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-lg focus-ring transition-all text-xs font-mono tracking-wider uppercase shadow-md block"
              >
                <span>Book Free Audit Now</span>
                <span aria-hidden="true">→</span>
              </Link>

              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 block">Need immediate response?</span>
                <a
                  href="https://wa.me/919049994679?text=Hi%20NSE,%20we%20would%20like%20to%20book%20a%20Free%2025-Point%20Elevator%20Health%20Audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackPhoneClick({
                      location: 'free_audit_lead_magnet',
                      phoneNumber: '+91 90499 94679',
                      contactMethod: 'whatsapp',
                    });
                  }}
                  className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <span>💬 WhatsApp: +91 90499 94679</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
