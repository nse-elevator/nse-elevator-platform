import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';

export const metadata: Metadata = {
  title: 'Industries Served | Housing Societies, Commercial IT & Hospitals | NSE',
  description: 'Specialized elevator maintenance for residential housing societies (CHS), commercial IT parks, hospitals, hotels, and MIDC industrial warehouses in Mumbai & Pune.',
};

const industries = [
  {
    title: 'Commercial Office Buildings',
    slug: 'commercial-office-buildings',
    desc: 'High-traffic morning and evening passenger handling, destination dispatch optimization, and zero midday downtime guarantees.',
  },
  {
    title: 'Multi-Family Residential & HOAs',
    slug: 'residential-high-rises-condos',
    desc: 'Round-the-clock reliability for tenant satisfaction, quiet mechanical operation, and predictable long-term reserve fund planning.',
  },
  {
    title: 'Hospitals & Healthcare Facilities',
    slug: 'hospital-healthcare-elevators',
    desc: 'Mission-critical bed lifts and trauma elevator uptime. Strict adherence to NFPA 99 healthcare safety and hygiene standards.',
  },
  {
    title: 'Hotels & Luxury Hospitality',
    slug: 'hotel-hospitality-elevators',
    desc: 'Flawless ride quality, architectural cab interiors, and discreet off-peak technician servicing to protect guest experience scores.',
  },
  {
    title: 'Higher Education & Campuses',
    slug: 'education-campuses',
    desc: 'Durable, high-abuse elevator equipment engineered for university residence halls, research laboratories, and lecture centers.',
  },
  {
    title: 'Industrial & Freight Warehouses',
    slug: 'industrial-freight-elevators',
    desc: 'Heavy-capacity freight elevator servicing, hydraulic cylinder rebuilds, and rugged interlock hardware for logistics operations.',
  },
];

export default function IndustriesHubPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Sector-Specific Engineering
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Elevator Maintenance Engineered For Your Industry
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every building category has unique uptime constraints, passenger traffic patterns, and regulatory compliance standards.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((ind) => (
            <div
              key={ind.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{ind.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{ind.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/industries/${ind.slug}`}
                  className="min-h-[44px] text-xs font-mono font-bold text-slate-900 hover:text-brand-orange transition-colors inline-flex items-center gap-1"
                >
                  <span>View Vertical Standards</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
