import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';

export const metadata: Metadata = {
  title: 'Elevator Engineer & Technician Careers | NSE',
  description: 'Join New Sahyadri Elevator. Active engineering and technician openings across Navi Mumbai and Pune. Competitive pay, performance allowances, and field safety gear.',
};

const jobOpenings = [
  {
    slug: 'senior-elevator-service-mechanic',
    title: 'Senior Lift Maintenance Engineer',
    location: 'Pune (Dattanagar & Katraj Corridors)',
    type: 'Full-Time / Field Operations',
    salary: '₹3,60,000 - ₹5,40,000 / Year + Emergency Allowance',
    summary: 'Seeking experienced lift maintenance engineers to manage residential society and commercial service routes across South Pune.',
  },
  {
    slug: 'elevator-modernization-lead-technician',
    title: 'Elevator Modernization Lead Technician',
    location: 'Navi Mumbai (Airoli & Trans-Thane Corridors)',
    type: 'Full-Time / Modernization Team',
    salary: '₹4,20,000 - ₹6,00,000 / Year + Performance Bonus',
    summary: 'Lead turnkey modernization overhauls installing microprocessor controllers, VVVF drives, and Automatic Rescue Devices (ARD).',
  },
  {
    slug: 'certified-elevator-inspector-qei',
    title: 'Lift Safety Auditor & Compliance Specialist',
    location: 'Pune Regional Hub',
    type: 'Full-Time / Safety Team',
    salary: '₹4,00,000 - ₹5,80,000 / Year + Travel Allowance',
    summary: 'Conduct 25-point comprehensive health audits, inspect electromechanical safety gear, and prepare detailed society condition reports.',
  },
];

export default function CareersPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Field Engineering Careers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Build Your Career with New Sahyadri Elevator
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Over 15 certified engineers in Pune and 15+ years of Mumbai AMC excellence. We value technical precision, safety discipline, and genuine customer care.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Active Engineering &amp; Field Openings</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Direct inquiries &amp; applications: office.pune@nsei.in</p>
        </div>

        <div data-stagger-grid className="space-y-6 max-w-4xl mx-auto">
          {jobOpenings.map((job) => (
            <div
              key={job.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-slate-300 transition-all hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                    {job.location}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed text-justify">{job.summary}</p>
                <span className="text-xs font-mono font-bold text-slate-900 block pt-1">
                  Salary Range: {job.salary}
                </span>
              </div>

              <a
                href={`/careers/${job.slug}`}
                className="shrink-0 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-xs px-5 py-3 rounded-lg shadow-md transition-all active:scale-[0.98] text-center"
              >
                View Role Details →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
