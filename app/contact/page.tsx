import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';
import { FreeAuditLeadMagnet } from '../../components/FreeAuditLeadMagnet';
import { TimeOnPageTracker } from '../../components/TimeOnPageTracker';

export const metadata: Metadata = {
  title: 'Contact NSE – New Sahyadri Elevator | 24/7 Breakdown Dispatch & AMC',
  description: 'Connect with NSE – New Sahyadri Elevator. 24/7 Breakdown Dispatch & WhatsApp: +91 90499 94679. Email: office.pune@nsei.in. Offices in Navi Mumbai and Pune.',
};

export default function ContactPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <TimeOnPageTracker />
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Direct Communications &amp; Dispatch Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Contact NSE – New Sahyadri Elevator
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Your Trust. Our Commitment. Safe Rides. Every Time. Immediate 24/7 breakdown dispatch, housing society lift AMCs, and modernization proposals across Navi Mumbai &amp; Pune.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: 24/7 Emergency Dispatch */}
          <div className="bg-white border-2 border-brand-orange p-8 rounded-2xl text-slate-900 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                <span className="text-xs font-mono font-bold uppercase text-brand-orange">
                  Priority 24/7 Channel
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                24/7 Breakdown &amp; Entrapment Dispatch
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                For passenger entrapments, lift shutdowns, or electrical interlock trips across Navi Mumbai and Pune. Prompt on-site engineering dispatch.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <a
                href="tel:+919049994679"
                className="w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 min-h-[44px] flex items-center justify-center rounded-lg text-sm shadow-md transition-all"
              >
                CALL / WHATSAPP: +91 90499 94679
              </a>
              <span className="text-[11px] font-mono text-slate-500 text-center block">
                Direct Email: <a href="mailto:office.pune@nsei.in" className="text-brand-orange underline font-medium">office.pune@nsei.in</a>
              </span>
            </div>
          </div>

          {/* Card 2: Maintenance Quote & AMC */}
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-slate-500 mb-3 block">
                Housing Society &amp; Commercial AMC
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Request Lift AMC Proposal
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                Choose from Comprehensive and Non-Comprehensive AMC packages covering Schindler, KONE, OTIS, Johnson, and thyssenkrupp elevators with genuine OEM spares.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href="/contact/request-maintenance-quote"
                className="w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-mono font-bold py-3 min-h-[44px] flex items-center justify-center rounded-lg text-sm shadow-md"
              >
                Launch AMC Quote Builder →
              </a>
              <span className="text-[11px] font-mono text-slate-500 text-center block mt-2">
                ~30% Lower Cost Than OEM Direct
              </span>
            </div>
          </div>

          {/* Card 3: Code Inspections & Audits */}
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-slate-500 mb-3 block">
                Safety Standards
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Schedule Lift Safety Audit
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                Comprehensive 25-point inspection, hoistway safety mechanism verification, electromechanical brake testing, and ARD battery health review.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href="/contact/schedule-inspection"
                className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-mono font-bold py-3 min-h-[44px] flex items-center justify-center rounded-lg text-sm"
              >
                Schedule Inspection →
              </a>
              <span className="text-[11px] font-mono text-slate-500 text-center block mt-2">
                25-Point Comprehensive Audit
              </span>
            </div>
          </div>
        </div>

        {/* Corporate & Branch Office Directory (ONLY 2 LOCATIONS) */}
        <div data-card-unit className="mt-16 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">
            Registered Office &amp; Branch Directory
          </h3>
          <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 font-mono">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase text-brand-orange font-bold block mb-1">Corporate Headquarters</span>
              <strong className="text-sm text-slate-900 block mb-2">Navi Mumbai (Airoli Hub)</strong>
              <p className="text-slate-700">Airoli, Navi Mumbai, Maharashtra</p>
              <p className="mt-2 text-slate-900 font-bold">Phone / WhatsApp: +91 90499 94679</p>
              <p className="mt-1 text-slate-500">Service Coverage: Airoli, Vashi, Kopar Khairane, Mahape, Belapur, Panvel</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase text-brand-orange font-bold block mb-1">Regional Operations</span>
              <strong className="text-sm text-slate-900 block mb-2">Pune Operations Hub</strong>
              <p className="text-slate-700">Pune, Maharashtra</p>
              <p className="mt-2 text-slate-900 font-bold">Phone / WhatsApp: +91 90499 94679</p>
              <p className="mt-1 text-slate-500">Service Coverage: Hinjewadi, Baner, Wakad, Hadapsar, PCMC &amp; Western Corridors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free 25-Point Elevator Health & Safety Audit Lead Magnet */}
      <FreeAuditLeadMagnet />
    </div>
  );
}
