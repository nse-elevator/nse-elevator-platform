import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';
import { FreeAuditLeadMagnet } from '../../components/FreeAuditLeadMagnet';
import { DynamicQuoteCalculator as QuoteCalculatorForm } from '../../components/DynamicQuoteCalculator';
import { AnimatedCounter } from '../../components/AnimatedCounter';

export const metadata: Metadata = {
  title: 'About NSE – New Sahyadri Elevator | Lift Maintenance & Modernization',
  description: 'Trusted partner for high-rise elevator operations across Navi Mumbai and Pune. 350+ elevators under care, 15+ certified engineers, 15y Mumbai / 7y Pune AMC experience.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <li><Link href="/" prefetch={true} className="hover:text-slate-900 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 font-semibold">About Us</li>
            </ol>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange block mb-2">
            Excellence in Service • High-Rise Operations
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight max-w-4xl">
            NSE – New Sahyadri Elevator
          </h1>
          <p className="text-lg text-brand-orange font-semibold mt-2">
            &quot;Your Trust. Our Commitment. Safe Rides. Every Time.&quot;
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mt-4 text-justify">
            Trusted partner for high-rise elevator operations — maintenance, repairs, modernization for residential housing societies and commercial complexes. OEM-grade engineering precision with genuine spare parts at approximately 30% lower cost than typical OEM direct pricing.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Verified Track Record Stats Bar */}
      <section className="bg-slate-100/90 border-b border-slate-200 py-10 text-slate-900">
        <div data-stagger-grid className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 text-center font-mono">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 block">
              <AnimatedCounter target={350} suffix="+" />
            </span>
            <span className="text-xs text-slate-500 mt-1 block">Elevators Under Care</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-orange block">
              <AnimatedCounter target={15} suffix="+" />
            </span>
            <span className="text-xs text-slate-500 mt-1 block">Certified Engineers in Pune</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">
              <AnimatedCounter target={15} suffix="y" /> / <AnimatedCounter target={7} suffix="y" />
            </span>
            <span className="text-xs text-slate-500 mt-1 block">Mumbai &amp; Pune Experience</span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-orange block">
              <AnimatedCounter target={30} prefix="< " suffix=" Min" />
            </span>
            <span className="text-xs text-slate-500 mt-1 block">Average Emergency Arrival</span>
          </div>
        </div>
      </section>

      {/* Core Values: Safety First | Customer Focused | Excellence Always */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Safety First • Customer Focused • Excellence Always
          </h2>
        </div>

        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <span className="text-2xl font-mono font-extrabold text-brand-orange block mb-3">01</span>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Safety First is Safety Always</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Rigorous preventative maintenance protocols, multi-point hoistway safety checks, regular safety gear calibration, ARD battery health testing, and precision door interlock inspection.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <span className="text-2xl font-mono font-extrabold text-brand-orange block mb-3">02</span>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Customer Focused Service</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Direct communication with certified engineers without call center bureaucracy. Transparent billing with no hidden diagnostic charges and dedicated assistance for society committees.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <span className="text-2xl font-mono font-extrabold text-brand-orange block mb-3">03</span>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Excellence Always</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              100% genuine OEM replacement spare parts for Schindler, KONE, OTIS, Johnson, and thyssenkrupp elevators, ensuring maximum equipment lifespan and zero compromises.
            </p>
          </div>
        </div>

        {/* Company Quick Links */}
        <div className="mt-12 p-8 bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900">Explore Company Operations &amp; Safety Programs</h3>
            <p className="text-xs text-slate-600 mt-1">Review our multi-point safety audit procedures, certified engineering workforce, and regional branch hubs.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/about/safety-standards" prefetch={true} className="min-h-[44px] inline-flex items-center bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2 rounded-lg text-xs font-mono font-bold shadow-sm">
              Safety Standards →
            </Link>
            <Link href="/about/team" prefetch={true} className="min-h-[44px] inline-flex items-center bg-brand-orange hover:bg-brand-orange-dark text-white px-4 py-2 rounded-lg text-xs font-mono font-bold shadow-sm">
              Engineering Team →
            </Link>
          </div>
        </div>
      </section>

      <FreeAuditLeadMagnet />

      <QuoteCalculatorForm />
    </div>
  );
}
