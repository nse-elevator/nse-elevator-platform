import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';
import { FreeAuditLeadMagnet } from '../../components/FreeAuditLeadMagnet';
import { getCaseStudies } from '../../lib/api';

export const revalidate = 3600; // ISR: 1 hour

export const metadata: Metadata = {
  title: 'Elevator Modernization & AMC Case Studies | NSE – New Sahyadri Elevator',
  description: 'Explore real-world elevator modernizations, AMC takeovers, emergency responses, and safety audit results across housing societies and hospitals in Navi Mumbai and Pune.',
};

interface CaseStudyItem {
  slug: string;
  buildingName: string;
  city: string;
  units: string;
  scope?: string;
  angleTag?: string;
  metaTitle?: string;
  resultsSummary: string;
  results: Array<{ label: string; value: string }>;
  pullQuote?: {
    quote: string;
    author: string;
    role: string;
  };
}

const fallbackCaseStudies: CaseStudyItem[] = [
  {
    slug: 'greenfield-heights-amc-takeover',
    buildingName: 'Greenfield Heights CHS',
    city: 'Airoli, Navi Mumbai',
    units: '8 High-Rise Cars (16 Floors)',
    angleTag: 'Cost Savings',
    resultsSummary: 'Reduced breakdown frequency from 14 monthly calls to under 1, lowered annual society maintenance expenditure by 31%, and sustained 99.8% verified fleet uptime.',
    results: [
      { label: 'Cost Savings', value: '31% vs OEM' },
      { label: 'Breakdown Drop', value: '-92%' },
      { label: 'Fleet Uptime', value: '99.8%' },
    ],
    pullQuote: {
      quote: 'Switching to NSE cut our society elevator expenditure by nearly a third while our lifts finally run without daily morning breakdowns.',
      author: 'Ramesh Thorat',
      role: 'Chairman, Greenfield Heights CHS',
    },
  },
  {
    slug: 'mayflower-residency-safety-audit',
    buildingName: 'Mayflower Residency CHS',
    city: 'Pune, Maharashtra',
    units: '6 Passenger Elevators (12 Floors)',
    angleTag: 'Safety & ARD Overhaul',
    resultsSummary: 'Restored failing ARD power units within 14 days, achieved 100% successful emergency battery landings during power cut simulations, and eliminated sudden passenger entrapment risks.',
    results: [
      { label: 'Turnaround', value: '14 Days' },
      { label: 'ARD Success', value: '100% Tested' },
      { label: 'Brake Overhaul', value: 'Completed' },
    ],
    pullQuote: {
      quote: 'NSE saved our committee from recurring lift shutdowns by rectifying our ARD systems and recalibrating the brakes in just two weeks.',
      author: 'Deepak Shirodkar',
      role: 'Hon. Secretary, Mayflower Residency CHS',
    },
  },
  {
    slug: 'shree-samarth-emergency-rescue',
    buildingName: 'Shree Samarth Horizon CHS',
    city: 'Airoli, Navi Mumbai',
    units: '4 High-Rise Traction Elevators',
    angleTag: 'Emergency Response',
    resultsSummary: 'Reached site in 19 minutes on a rainy Sunday, safely evacuated all passengers within 8 minutes of arrival with zero injuries, and restored normal elevator operation that night.',
    results: [
      { label: 'Emergency Arrival', value: '19 Mins' },
      { label: 'Passenger Rescue', value: 'Zero Injury' },
      { label: 'Service Restored', value: '< 2 Hours' },
    ],
    pullQuote: {
      quote: 'Their technician was on-site in 19 minutes on a Sunday evening. The calm, professional way they rescued our residents was commendable.',
      author: 'Sanjay More',
      role: 'Managing Committee Member, Shree Samarth Horizon CHS',
    },
  },
  {
    slug: 'panchsheel-business-square-modernization',
    buildingName: 'Panchsheel Business Square',
    city: 'Pune, Maharashtra',
    units: '4 Commercial Passenger Lifts',
    angleTag: 'Modernization',
    resultsSummary: 'Reduced elevator electricity consumption by 38%, achieved precision floor leveling within ±2mm, and eliminated 75% of cabin ride vibration.',
    results: [
      { label: 'Energy Cut', value: '-38%' },
      { label: 'Leveling Precision', value: '±2 mm' },
      { label: 'Vibration Cut', value: '-75%' },
    ],
    pullQuote: {
      quote: 'Tenants thought we had installed brand new elevator shafts. The ride is whisper quiet, and our building power bills dropped immediately.',
      author: 'Kishore Bandopadhyaya',
      role: 'Commercial Estate Manager, Panchsheel Business Square',
    },
  },
];

function getAngleBadgeClasses(tag?: string) {
  switch (tag) {
    case 'Cost Savings':
      return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30';
    case 'Safety & Compliance':
      return 'bg-blue-500/10 text-blue-700 border-blue-500/30';
    case 'Emergency Response':
      return 'bg-emergency-500/10 text-emergency-700 border-emergency-500/30';
    case 'Modernization':
      return 'bg-purple-500/10 text-purple-700 border-purple-500/30';
    default:
      return 'bg-steel-100 text-steel-700 border-steel-300';
  }
}

export default async function CaseStudiesPage() {
  const fetched = await getCaseStudies();
  // If fetched has full items, use them; otherwise fallback
  const items: CaseStudyItem[] =
    fetched && fetched.length > 0 && fetched[0].resultsSummary
      ? fetched
      : fallbackCaseStudies;

  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Verified Engineering Performance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Elevator Modernization &amp; AMC Case Studies
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Measurable breakdown reductions, transparent society cost savings, and rapid emergency dispatch across Navi Mumbai and Pune.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((cs) => (
            <div
              key={cs.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* Top Row: Location + Units + Angle Tag */}
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 mb-3">
                  <span className="text-slate-600 font-semibold">{cs.city}</span>
                  <div className="flex items-center gap-2">
                    {cs.angleTag && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md border font-mono text-[10px] font-bold uppercase tracking-wider ${getAngleBadgeClasses(
                          cs.angleTag
                        )}`}
                      >
                        {cs.angleTag}
                      </span>
                    )}
                    <span className="text-slate-800 font-bold bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">
                      {cs.units}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug">
                  {cs.buildingName}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed mb-6 text-justify">
                  {cs.resultsSummary}
                </p>

                {/* Key Metrics Grid */}
                {cs.results && cs.results.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100 bg-slate-50 p-3 rounded-xl text-center mb-4">
                    {cs.results.map((m, idx) => (
                      <div key={idx}>
                        <span className="text-base font-mono font-extrabold text-slate-900 block">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pull Quote */}
                {cs.pullQuote && (
                  <div className="bg-slate-50 border-l-2 border-brand-orange p-3 rounded-r-lg my-4">
                    <p className="text-xs text-slate-700 italic text-justify">
                      &ldquo;{cs.pullQuote.quote}&rdquo;
                    </p>
                    <p className="text-[10px] font-bold text-slate-900 mt-1">
                      — {cs.pullQuote.author}, <span className="font-normal text-slate-500">{cs.pullQuote.role}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/case-studies/${cs.slug}`}
                  className="min-h-[44px] text-xs font-mono font-bold text-slate-900 hover:text-brand-orange transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Read Full Case Study</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FreeAuditLeadMagnet />
    </div>
  );
}
