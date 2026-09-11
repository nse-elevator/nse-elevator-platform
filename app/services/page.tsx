import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';
import { ScrollDepthTracker } from '../../components/ScrollDepthTracker';

export const metadata: Metadata = {
  title: 'Elevator Maintenance, AMC & Modernization Services | NSE',
  description: 'Comprehensive and non-comprehensive elevator AMC maintenance, 24/7 breakdown repair, turnkey modernizations, and multi-point safety audits across Navi Mumbai & Pune.',
};

const allServices = [
  {
    title: 'Preventive Elevator Maintenance',
    slug: 'elevator-maintenance',
    desc: 'Customized commercial maintenance agreements designed to maximize equipment reliability, prevent costly shutdowns, and protect capital longevity.',
    badge: 'Core Program',
  },
  {
    title: '24/7 Emergency Breakdown Repair',
    slug: 'elevator-repair',
    desc: 'Immediate dispatch and rapid root-cause troubleshooting for unexpected shut-downs, door jams, and passenger entrapments.',
    badge: '24/7 SLA',
  },
  {
    title: 'Turnkey Elevator Modernization',
    slug: 'elevator-modernization',
    desc: 'Replace obsolete, unsupported OEM controllers with modern non-proprietary hardware. Increase speed, energy efficiency, and ride quality.',
    badge: 'Capital Upgrade',
  },
  {
    title: 'Safety Audits & Multi-Point Testing',
    slug: 'safety-inspections-code-compliance',
    desc: 'Comprehensive multi-point safety testing, load brake verification, and rapid mechanical deficiency remediation.',
    badge: 'Safety First',
  },
  {
    title: 'Cab Remodeling & Interior Refurbishment',
    slug: 'elevator-cab-remodeling',
    desc: 'Architectural cab interior upgrades, durable high-impact wall cladding, LED energy-saving lighting, and custom floor finishes.',
    badge: 'Aesthetic',
  },
  {
    title: 'Hydraulic & Traction Conversions',
    slug: 'hydraulic-traction-conversions',
    desc: 'Submersible power units, cylinder replacements, and machine room overhauls engineered for high-cycle commercial properties.',
    badge: 'Heavy Mechanical',
  },
  {
    title: 'Non-Proprietary Systems & Controls',
    slug: 'non-proprietary-elevator-service',
    desc: 'Universal open-architecture controllers from MCE and Smartrise. Break free from OEM proprietary software locks.',
    badge: 'Cost Saver',
  },
  {
    title: 'New Elevator Design & Installation',
    slug: 'elevator-installation',
    desc: 'Turnkey mechanical design, hoistway engineering, and installation for new commercial developments and multi-family structures.',
    badge: 'New Construction',
  },
];

export default function ServicesHubPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <ScrollDepthTracker />
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Engineered Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Commercial Elevator Services &amp; Contracts
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Full lifecycle mechanical and electrical support for commercial office buildings, healthcare centers, high-rise residential properties, and industrial facilities.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Services Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {allServices.map((service) => (
            <div
              key={service.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-wider bg-orange-50 border border-brand-orange/20 px-2 py-1 rounded-md inline-block mb-3">
                  {service.badge}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  {service.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/services/${service.slug}`}
                  className="text-xs font-mono font-bold text-slate-900 hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <span>View Technical Scope</span>
                  <span>→</span>
                </a>
                <a
                  href={`/contact/request-maintenance-quote?service=${service.slug}`}
                  className="text-[11px] font-mono text-brand-orange hover:underline font-semibold"
                >
                  Request Bid
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
