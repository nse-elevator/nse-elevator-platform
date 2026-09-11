import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';

export const metadata: Metadata = {
  title: 'Engineering Leadership & Field Operations | NSE – New Sahyadri Elevator',
  description: 'Meet the engineering and operational leadership of New Sahyadri Elevator. 15+ certified engineers across Navi Mumbai and Pune with multi-brand expertise.',
};

const leaders = [
  {
    name: 'Sachin Patil',
    role: 'Chief Technical Officer & Modernization Lead',
    experience: '18+ Years in High-Rise Elevator Engineering',
    bio: 'Leads modernization architecture, microprocessor control retrofits, and regenerative VVVF drive integrations across residential societies and commercial towers.',
    credentials: 'Microprocessor Control & VVVF Drive Specialist',
  },
  {
    name: 'Dinesh Shinde',
    role: 'Head of Field Operations & Maintenance',
    experience: '15+ Years in Mumbai & Navi Mumbai AMC Operations',
    bio: 'Oversees preventative maintenance routes, 24/7 rapid breakdown response dispatch, and genuine OEM spare parts supply chains.',
    credentials: 'Preventative Maintenance & OEM Spare Parts Specialist',
  },
  {
    name: 'Pravin Jadhav',
    role: 'Senior Field Service Lead (Pune Hub)',
    experience: '12+ Years in Pune Elevator Operations',
    bio: 'Directs the 15+ certified field engineer team in Pune, managing residential society AMCs, emergency entrapment callbacks, and mechanical overhauls.',
    credentials: 'Senior Electromechanical & Emergency Dispatch Lead',
  },
  {
    name: 'Vikas Kadam',
    role: 'Head of Safety & Quality Audits',
    experience: '14+ Years in Elevator Safety & Maintenance',
    bio: 'Coordinates 25-point comprehensive health audits, safety gear calibration routines, and emergency ARD power-cut failover inspections.',
    credentials: 'Elevator Safety Auditor & Technical Operations Lead',
  },
];

export default function TeamPage() {
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
              <li className="text-slate-900 font-semibold">Leadership &amp; Engineers</li>
            </ol>
          </nav>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block mb-2">
            Technical Leadership &amp; Field Operations
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight max-w-4xl tracking-tight">
            Led By Certified Elevator Engineers &amp; Multi-Brand Specialists
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mt-4 text-justify">
            Over 15 certified engineers in Pune and 15+ years of Mumbai AMC experience safeguarding high-rise residential societies and commercial complexes with OEM-grade precision.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.map((lead, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-brand-orange block mb-1">
                  {lead.role}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{lead.name}</h2>
                <span className="text-xs text-slate-500 font-mono block mb-4">{lead.experience}</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{lead.bio}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-500 block uppercase font-bold">Certifications &amp; Accreditations:</span>
                <span className="text-xs font-mono font-bold text-slate-800">{lead.credentials}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
