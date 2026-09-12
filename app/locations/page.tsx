import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const TrustBadgesBar = dynamic(
  () => import('../../components/TrustBadgesBar').then((mod) => mod.TrustBadgesBar),
  { ssr: true }
);

const LocalCoverageMap = dynamic(
  () => import('../../components/LocalCoverageMap').then((mod) => mod.LocalCoverageMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-slate-400 font-mono text-sm">Loading coverage map...</span>
      </div>
    ),
  }
);

const ScrollDepthTracker = dynamic(
  () => import('../../components/ScrollDepthTracker').then((mod) => mod.ScrollDepthTracker),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Service Areas & Operations Hubs | NSE – New Sahyadri Elevator',
  description: 'Explore lift maintenance and repair service areas in Navi Mumbai and Pune. 24/7 breakdown dispatch with rapid emergency response. Call/WhatsApp +91 90499 94679.',
};

const locations = [
  {
    city: 'Navi Mumbai, MH',
    slug: 'elevator-repair-navi-mumbai',
    hub: 'Navi Mumbai Regional Headquarters',
    address: 'Airoli, Navi Mumbai, Maharashtra',
    phone: '+91 90499 94679',
    areas: 'Airoli, Vashi, Kopar Khairane, Ghansoli, Mahape MIDC, Belapur, Panvel',
    operationsCoverage: '24/7 Rapid Dispatch • Priority Coverage',
  },
  {
    city: 'Pune (Dattanagar), MH',
    slug: 'elevator-repair-pune-dattanagar',
    hub: 'Pune Regional Operations Hub',
    address: 'Dattanagar, Pune, Maharashtra',
    phone: '+91 90499 94679',
    areas: 'Dattanagar, Katraj, Ambegaon, Dhankawadi, Sinhagad Road, Kothrud, Pune City, Baner, Pashan, Wakad, Hinjewadi, Ravet, Punavale, Tathawade, Mamurdi, Marunji, Nere, Chinchwad',
    operationsCoverage: '15+ Certified Engineers • 24/7 Emergency Units',
  },
];

export default function LocationsHubPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <ScrollDepthTracker />
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Regional Coverage Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Lift Maintenance &amp; Repair Hubs in Navi Mumbai &amp; Pune
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Over 15 certified engineers stationed across Navi Mumbai and Pune. Guaranteed 24/7 emergency breakdown dispatch.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <LocalCoverageMap />

      {/* Directory Grid */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
          Select Your Service Hub
        </h2>
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-brand-orange uppercase">
                    Field Dispatch Hub
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    24/7 Field Units Active
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {loc.city}
                </h3>
                {loc.slug === 'elevator-repair-pune-dattanagar' ? (
                  <div className="mt-3 p-3 bg-orange-50/80 border border-brand-orange/30 rounded-lg">
                    <span className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-wider block mb-0.5">
                      📍 Pune Operations Hub
                    </span>
                    <p className="text-xs font-semibold text-slate-900">
                      Swant Plaza, Shop No. 203, Dattanagar, Pune, Maharashtra – 411046
                    </p>
                  </div>
                ) : (
                  <p className="text-xs font-mono text-slate-500 mt-1">{loc.address}</p>
                )}

                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <p className="text-justify"><strong className="text-slate-900">Key Corridors:</strong> {loc.areas}</p>
                  <p><strong className="text-slate-900">Operations:</strong> {loc.operationsCoverage}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/locations/${loc.slug}`}
                  className="text-xs font-mono font-bold text-slate-900 hover:text-brand-orange transition-colors flex items-center gap-1"
                >
                  <span>Explore {loc.city.split(',')[0]} Services</span>
                  <span>→</span>
                </a>
                <a
                  href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-xs font-mono font-bold text-brand-orange hover:underline"
                >
                  {loc.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
