'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackPhoneClick } from '../lib/analytics';

const serviceLinks = [
  { name: 'Preventive Elevator Maintenance (AMC)', href: '/services/elevator-maintenance' },
  { name: '24/7 Emergency Breakdown Repair', href: '/services/elevator-repair' },
  { name: 'Turnkey Elevator Modernization', href: '/services/elevator-modernization' },
  { name: 'Safety Audits & Code Compliance', href: '/services/safety-inspections-code-compliance' },
  { name: 'Elevator Cab Interior Remodeling', href: '/services/elevator-cab-remodeling' },
  { name: 'Hydraulic & Traction Conversions', href: '/services/hydraulic-traction-conversions' },
  { name: 'Multi-Brand Maintenance & Spares', href: '/services/non-proprietary-elevator-service' },
  { name: 'New Elevator Installation & Design', href: '/services/elevator-installation' },
];

const industryLinks = [
  { name: 'Co-operative Housing Societies (CHS)', href: '/industries/residential-high-rises-condos' },
  { name: 'Commercial Towers & IT Parks', href: '/industries/commercial-office-buildings' },
  { name: 'Hospitals & Healthcare Bed Lifts', href: '/industries/hospital-healthcare-elevators' },
  { name: 'Hotels & Luxury Hospitality', href: '/industries/hotel-hospitality-elevators' },
  { name: 'Universities & Educational Campuses', href: '/industries/education-campuses' },
  { name: 'Industrial MIDC & Freight Warehouses', href: '/industries/industrial-freight-elevators' },
];

const locationLinks = [
  { name: 'Navi Mumbai Hub (HQ)', href: '/locations/elevator-repair-navi-mumbai' },
  { name: 'Pune Hub (Dattanagar)', href: '/locations/elevator-repair-pune-dattanagar' },
  { name: 'All Service Corridors', href: '/locations' },
];

export function GlobalFooter() {
  return (
    <footer 
      id="site-footer"
      role="contentinfo" 
      aria-label="Global Corporate Directory & Compliance"
      className="relative z-10 w-full bg-[#0B1120] text-slate-400 border-t border-slate-800 text-xs pt-14 pb-24 lg:pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top Emergency Action Bar */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 border border-brand-orange/40 text-brand-orange rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                Emergency Lift Breakdown or Passenger Entrapment?
              </h4>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed text-justify">
                Central Dispatch operates 24/7 across Navi Mumbai &amp; Pune with prompt on-site engineering dispatch.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-start md:justify-end">
            <a
              id="footer-emergency-call-btn"
              href="tel:+919049994679"
              onClick={() => {
                trackPhoneClick({
                  location: 'global_footer',
                  phoneNumber: '+91 90499 94679',
                  contactMethod: 'phone',
                });
              }}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-mono font-bold px-6 py-3 min-h-[44px] inline-flex items-center justify-center rounded-lg transition-all text-xs shadow-lg active:scale-95 cursor-pointer whitespace-nowrap w-full sm:w-auto"
            >
              CALL / WHATSAPP: +91 90499 94679
            </a>
          </div>
        </div>

        {/* Directory Grid: 1-col on mobile, 2-col on tablet, balanced 12-col on laptop/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Credentials (3/12 on xl, 4/12 on lg) */}
          <div className="space-y-4 md:col-span-2 lg:col-span-4 xl:col-span-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-700/50 hover:shadow-md transition-all">
                <Image
                  src="/images/nse-logo-nav.webp"
                  alt="NSE Elevator Services - New Sahyadri Elevator"
                  width={156}
                  height={88}
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white uppercase">
                NSE – <span className="text-brand-orange">New Sahyadri Elevator</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs text-justify">
              Trusted partner for high-rise elevator operations — maintenance, repairs, modernization for residential societies and commercial complexes at approximately 30% lower cost than OEM direct.
            </p>
            <div className="pt-2 text-[11px] font-mono space-y-1">
              <p className="text-emerald-400 font-bold">350+ Elevators Under Care</p>
              <p className="text-slate-300">15+ Certified Engineers in Pune</p>
              <p className="text-slate-400">15+ Yrs Mumbai • 7+ Yrs Pune Experience</p>
              <p className="text-brand-orange font-semibold">24/7 Rapid Emergency Response</p>
            </div>
          </div>

          {/* Column 2: Services Directory (2/12 on xl, 4/12 on lg) */}
          <div className="space-y-3 md:col-span-1 lg:col-span-4 xl:col-span-2">
            <h5 className="font-mono text-brand-orange text-xs font-bold uppercase tracking-[0.15em]">
              Elevator Offerings
            </h5>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={true} className="text-slate-400 hover:text-white transition-colors block leading-snug">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries (2/12 on xl, 4/12 on lg) */}
          <div className="space-y-3 md:col-span-1 lg:col-span-4 xl:col-span-2">
            <h5 className="font-mono text-brand-orange text-xs font-bold uppercase tracking-[0.15em]">
              Sectors Served
            </h5>
            <ul className="space-y-2">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={true} className="text-slate-400 hover:text-white transition-colors block leading-snug">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Service Corridors (2/12 on xl, 6/12 on lg) */}
          <div className="space-y-3 md:col-span-1 lg:col-span-6 xl:col-span-2">
            <h5 className="font-mono text-brand-orange text-xs font-bold uppercase tracking-[0.15em]">
              Service Hubs
            </h5>
            <ul className="space-y-2">
              {locationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={true} className="text-slate-400 hover:text-white transition-colors block leading-snug">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-[11px] text-slate-400">
              <span className="font-bold text-white block">Email Dispatch:</span>
              <a href="mailto:office.pune@nsei.in" className="hover:underline text-brand-orange font-medium">
                office.pune@nsei.in
              </a>
            </div>
          </div>

          {/* Column 5: Regional Operations Hubs (3/12 on xl, 6/12 on lg) */}
          <div className="space-y-3 md:col-span-1 lg:col-span-6 xl:col-span-3 min-w-0">
            <h5 className="font-mono text-brand-orange text-xs font-bold uppercase tracking-[0.15em]">
              Regional Hubs
            </h5>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <span className="text-white block font-bold text-xs uppercase tracking-wider font-mono">Head Office:</span>
                <p className="mt-0.5 text-slate-400 leading-relaxed">Airoli, Navi Mumbai, Maharashtra</p>
              </div>
              <div className="pt-1">
                <span className="text-white block font-bold text-xs uppercase tracking-wider font-mono">Pune Branch:</span>
                <div className="mt-1.5 p-2 bg-orange-950/40 border border-brand-orange/30 rounded-lg">
                  <span className="text-[10px] font-mono text-brand-orange font-bold block mb-0.5">📍 Pune Operations Hub</span>
                  <p className="text-slate-200 text-[11px] font-medium leading-snug">Swant Plaza, Shop No. 203, Dattanagar, Pune – 411046</p>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-emerald-400 font-bold block text-xs uppercase tracking-wider font-mono">Service Commitment:</span>
                <p className="mt-0.5 text-slate-400 leading-relaxed">24/7 Rapid Emergency Dispatch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Taglines & WhatsApp Clearance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            <p className="text-slate-300 font-bold">Safe Today. Secure Tomorrow. Together Always.</p>
            <p className="text-slate-500 text-[10px] mt-0.5">© {new Date().getFullYear()} NSE – New Sahyadri Elevator. All rights reserved. Excellence in Service.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 lg:pr-48 xl:pr-56">
            <Link href="/about/safety-standards" prefetch={true} className="hover:text-white transition-colors">Safety Standards</Link>
            <Link href="/privacy" prefetch={true} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact/request-maintenance-quote" prefetch={true} className="hover:text-white transition-colors">Request AMC Quote</Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
