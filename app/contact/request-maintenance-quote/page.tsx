import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import QuoteCalculatorForm from '../../../components/QuoteCalculatorForm';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';
import { FreeAuditLeadMagnet } from '../../../components/FreeAuditLeadMagnet';
import { TimeOnPageTracker } from '../../../components/TimeOnPageTracker';

export const metadata: Metadata = {
  title: 'Request a Lift AMC Quote | NSE – New Sahyadri Elevator',
  description: 'Request a transparent, multi-brand lift AMC proposal for your housing society or commercial complex across Navi Mumbai & Pune. Genuine OEM parts, ~30% cost savings.',
};

export default function RequestMaintenanceQuotePage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <TimeOnPageTracker />
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-12 sm:py-16 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Engineering &amp; Estimation Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Request an Elevator Service &amp; AMC Proposal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Receive a transparent technical proposal covering Schindler, KONE, OTIS, Johnson, or thyssenkrupp elevators with genuine OEM spares at ~30% lower cost than OEM direct.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-10 text-slate-800">
          <Suspense
            fallback={
              <div className="py-12 text-center">
                <div className="inline-block w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-600 font-mono text-sm">Loading Quote Assessment Engine...</p>
              </div>
            }
          >
            <QuoteCalculatorForm embedded={true} />
          </Suspense>
        </div>
      </div>

      <FreeAuditLeadMagnet />
    </div>
  );
}
