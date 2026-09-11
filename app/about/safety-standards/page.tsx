import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';
import { FreeAuditLeadMagnet } from '../../../components/FreeAuditLeadMagnet';

export const metadata: Metadata = {
  title: 'Elevator Safety Standards & Inspection Framework | NSE',
  description: 'Review our multi-point safety audit framework, preventative maintenance protocols, and emergency response standards for residential and commercial elevators.',
};

const safetyPillars = [
  {
    title: 'Comprehensive Multi-Point Safety Inspection Framework',
    desc: 'Rigorous systematic checks covering monthly preventative servicing, brake gear calibration, governor overspeed tripping, and traction rope tensioning.',
    tag: 'Engineering Standards',
  },
  {
    title: 'Complete Hoistway & Door Interlock Verification',
    desc: 'Every elevator under our care undergoes periodic safety audits examining hoistway clearances, landing door interlocks, car top safety switches, and pit buffers.',
    tag: 'Safety Protocols',
  },
  {
    title: '15+ Certified Engineers & Continuous Field Safety Training',
    desc: 'Our certified field engineers in Navi Mumbai and Pune undergo continuous training covering electrical lockout, hoistway hazards, and emergency car leveling.',
    tag: 'Field Safety',
  },
  {
    title: 'Safe Entrapment Rescue Protocols (24/7 Rapid Response)',
    desc: 'Standard operating procedures for rapid passenger extraction: power lockout, brake release verification, and controlled car leveling at landing.',
    tag: 'Emergency Rescue',
  },
];

export default function SafetyStandardsPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <li><Link href="/" prefetch={true} className="hover:text-slate-900 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/about" prefetch={true} className="hover:text-slate-900 transition-colors">About Us</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 font-semibold">Safety Standards</li>
            </ol>
          </nav>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block mb-2">
            Multi-Point Elevator Safety Framework
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight max-w-4xl tracking-tight">
            &apos;Safety First&apos; is &apos;Safety Always&apos;
          </h1>
          <p className="text-lg text-brand-orange font-semibold mt-2">
            Your Trust. Our Commitment. Safe Rides. Every Time.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mt-4 text-justify">
            At NSE – New Sahyadri Elevator, passenger safety is our foundational commitment. We maintain disciplined periodic safety audits, proactive electromechanical testing, and 24/7 rapid emergency rescue readiness across Navi Mumbai and Pune.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safetyPillars.map((p, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
                {p.tag}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-4 mb-2">{p.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Certificate Inspection Verification Box */}
        <div data-card-unit className="mt-12 bg-white border border-slate-200 text-slate-900 p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Request a 25-Point Lift Safety Audit for Your Society</h3>
            <p className="text-xs text-slate-600 mt-1 text-justify">
              Have our experienced engineers conduct a 25-point comprehensive examination of your hoistways, machine rooms, and safety mechanisms.
            </p>
          </div>
          <Link
            href="/contact/schedule-inspection"
            prefetch={true}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm px-6 py-3 rounded-lg whitespace-nowrap shadow-md transition-all active:scale-[0.98]"
          >
            Request Audit →
          </Link>
        </div>
      </section>

      <FreeAuditLeadMagnet />
    </div>
  );
}
