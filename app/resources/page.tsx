import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';

export const metadata: Metadata = {
  title: 'Elevator Maintenance Resources & Safety Guides | NSE',
  description: 'Access elevator engineering resources, safety maintenance checklists, equipment inspection guidelines, and technical documentation.',
};

const stateGuides = [
  {
    state: 'Illinois',
    slug: 'elevator-codes-illinois',
    agency: 'OSFM & Chicago DOB',
    code: 'ASME A17.1-2019 / Chicago Title 14B',
    desc: 'Mandatory annual Category 1 safety testing and Chicago Department of Buildings compliance protocols for commercial facilities.',
  },
  {
    state: 'Texas',
    slug: 'elevator-codes-texas',
    agency: 'TDLR Elevator Safety Division',
    code: 'ASME A17.1-2016 & Texas HSC Chapter 754',
    desc: 'Third-party QEI inspection witness requirements, annual filing deadlines, and TDLR Certificate of Operation procedures.',
  },
  {
    state: 'Georgia',
    slug: 'elevator-codes-georgia',
    agency: 'Georgia Safety Fire Commissioner (OCI)',
    code: 'ASME A17.1-2019 & O.C.G.A. Title 25',
    desc: 'Semi-annual and annual passenger hoistway inspection guidelines, operating permit renewals, and municipal requirements.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="w-full bg-surface-50 min-h-screen">
      <section className="bg-steel-950 text-white py-16 sm:py-24 border-b border-steel-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-steel-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-steel-200 font-semibold">Resources</li>
            </ol>
          </nav>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergency-500 block mb-2">
            Engineering &amp; Safety Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Elevator Engineering Resources &amp; Guides
          </h1>
          <p className="text-base text-steel-300 mt-4 max-w-3xl leading-relaxed text-justify">
            Review safety inspection schedules, engineering maintenance standards, equipment health checklists, and preventative procedures across facilities.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-steel-950 mb-2">Jurisdictional Code Compliance Guides</h2>
          <p className="text-sm text-steel-600">Select your region for mandatory inspection frequencies, governing agencies, and penalty schedules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stateGuides.map((guide) => (
            <div key={guide.slug} data-card-unit className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emergency-500 bg-emergency-500/10 px-2.5 py-0.5 rounded-sm">
                  {guide.agency}
                </span>
                <h3 className="text-lg font-bold text-steel-950 mt-3 mb-2">{guide.state} Elevator Codes</h3>
                <div className="text-xs font-mono text-steel-500 mb-3">{guide.code}</div>
                <p className="text-xs text-steel-600 leading-relaxed mb-6 text-justify">{guide.desc}</p>
              </div>
              <Link
                href={`/resources/${guide.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-emergency-500 hover:text-emergency-600 font-mono"
              >
                Read State Guide →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-steel-900 text-white rounded-2xl p-8 border border-steel-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Need Comprehensive Safety Inspection or Audit?</h3>
            <p className="text-xs text-steel-400">Our certified engineers provide thorough multi-point safety audits and detailed condition reports.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact/schedule-inspection"
              className="bg-emergency-500 hover:bg-emergency-600 text-white font-mono font-bold text-xs px-6 py-3 rounded-sm"
            >
              Schedule Inspection
            </Link>
            <Link
              href="/contact"
              className="border border-steel-600 hover:bg-steel-800 text-white font-mono font-bold text-xs px-6 py-3 rounded-sm"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
