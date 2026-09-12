'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ElevatorControlPanel } from './ElevatorControlPanel';
import { GlobalFooter } from './GlobalFooter';

const QuoteCalculatorForm = dynamic(
  () => import('./QuoteCalculatorForm').then((mod) => mod.QuoteCalculatorForm),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto mb-4" />
        <div className="h-10 bg-slate-100 rounded w-2/3 mx-auto" />
      </div>
    ),
  }
);

const PUNE_DEPOT_LOCALITIES = [
  'Dattanagar',
  'Katraj',
  'Ambegaon',
  'Dhankawadi',
  'Sinhagad Road',
  'Kothrud',
  'Hinjewadi',
  'Baner',
  'Wakad',
  'Hadapsar',
  'Ravet',
  'Punavale',
  'Tathawade',
  'Chinchwad',
  'Pashan',
  'Mamurdi',
  'Marunji',
  'Nere',
];

export function GuidedElevatorHomepage() {
  const [currentFloor, setCurrentFloor] = useState('floor-g');
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  // Monitor active floor via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'hero',
      'services',
      'industries',
      'service-areas',
      'case-studies',
      'about',
      'contact',
    ];

    // Handle hash on initial mount (e.g. /#services)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentFloor(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToFloor = (sectionId: string) => {
    setCurrentFloor(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', sectionId === 'hero' ? '/' : `#${sectionId}`);
      }
    }
  };

  const faqItems = [
    {
      q: 'How quickly does NSE respond to elevator breakdowns and passenger entrapments?',
      a: 'Our emergency dispatch operates 24/7/365 with rapid response across Navi Mumbai and Pune. Certified field engineers are stationed in motorized rapid-response units stocked with critical OEM replacement spares.',
    },
    {
      q: 'Do you service all elevator makes, models, and discontinued brands?',
      a: 'Yes. Where multinational OEMs only service their own proprietary systems or push expensive replacements, our engineers diagnose and repair virtually any residential or commercial elevator — including Schindler, KONE, OTIS, Johnson, and TKE.',
    },
    {
      q: 'What is the difference between Comprehensive AMC and Non-Comprehensive AMC?',
      a: 'Comprehensive AMC (CAMC) covers all monthly preventive routines, emergency breakdown callbacks, and 100% cost of all replacement spare parts and oils. Non-Comprehensive AMC covers scheduled monthly maintenance routines and breakdown labor, with parts billed at transparent factory rates.',
    },
    {
      q: 'How does NSE achieve ~30% lower cost than OEM direct pricing?',
      a: 'Unlike multinational conglomerates with heavy corporate overheads and proprietary lock-in pricing, NSE operates lean local engineering hubs with direct supply channels for original OEM components, transparent itemized billing, and zero hidden diagnostic surcharges.',
    },
    {
      q: 'What is included in the Free 25-Point Elevator Health & Safety Audit?',
      a: 'Our certified engineers evaluate traction wire ropes, machine brakes, door operators, safety gear, ARD functioning, and hoistway limits, providing your housing society committee with an unbiased condition report with photographic evidence.',
    },
  ];

  const testimonials = [
    {
      name: 'Sunil Deshmukh',
      role: 'Society Secretary',
      org: 'Sai Saburi CHS, Airoli',
      text: 'NSE rescued our 12-floor building after our previous OEM direct service gave terrible callback delays. Their technician arrived within 20 minutes and permanently fixed our recurring door drive issue.',
      date: '1 month ago',
    },
    {
      name: 'Rajesh Patil',
      role: 'Facility Director',
      org: 'Swant Plaza Commercial Hub, Pune',
      text: 'Transparent billing and genuine OEM spare parts. We migrated 4 high-speed commercial passenger elevators to NSE Comprehensive AMC and reduced society operational costs by 35% while improving uptime.',
      date: '3 months ago',
    },
    {
      name: 'Dr. Meera Kulkarni',
      role: 'Chief Medical Administrator',
      org: 'Apex Multi-Specialty Hospital, Vashi',
      text: 'In a hospital, stretcher lift reliability is a matter of life and safety. NSE engineers maintain our bed elevators flawlessly with monthly 25-point routines and immediate emergency priority.',
      date: '6 months ago',
    },
    {
      name: 'Anand Shinde',
      role: 'Managing Committee Chairman',
      org: 'Mayflower Residency, Kothrud, Pune',
      text: 'Our 14-year-old geared elevators suffered recurring breakdown issues under our previous contractor. NSE performed precision brake relining, counterweight rebalancing, and restored reliable, smooth operation in 48 hours.',
      date: '8 months ago',
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-brand-orange selection:text-white font-sans antialiased">
      {/* 1. Elevator Control Operating Panel (COP) Sidebar Header */}
      <ElevatorControlPanel
        currentFloor={currentFloor}
        onSelectFloor={scrollToFloor}
        direction="idle"
      />

      {/* 2. Elevator Door Jamb Reveal Line (Desktop - Matching Reference) */}
      <div
        className="pointer-events-none fixed inset-y-0 left-[var(--cop-width,300px)] z-[5] hidden w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent lg:block"
        aria-hidden="true"
      />

      {/* 3. Main Elevator Cab Viewport (Floors & Exact Reference Spacing) */}
      <div className="pl-0 lg:pl-[var(--cop-width,300px)]">
        {/* =========================================================================
            FLOOR G (GROUND): HERO SECTION (Exact Reference Typography & Spacing)
           ========================================================================= */}
        <div data-floor="hero" id="floor-g" className="relative flex min-h-screen flex-col">
          <section id="hero" className="relative flex-1 flex flex-col justify-center">
            {/* Background Image & Dual Overlays Matching Reference */}
            <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              <Image
                alt="View from inside elevator looking outward into Maharashtra commercial atrium"
                className="object-cover object-center"
                src="/images/hero-elevator.webp"
                fill
                priority
                quality={80}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/35 to-white/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/30 to-white/45 lg:from-white/60" />
            </div>

            {/* Floor Hero Content */}
            <div className="floor-content relative z-10 flex min-h-[100vh] flex-col items-center px-6 pb-8 pt-12 text-center lg:pr-12">
              <div className="flex w-full flex-1 flex-col items-center justify-center">
                <div className="max-w-4xl mx-auto">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                    Navi Mumbai &amp; Pune • Maharashtra
                  </p>
                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                    Reliable Elevator &amp; Lift Service You Can Trust
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl font-normal leading-relaxed">
                    Experts in residential society and commercial elevator installation, repair, AMC maintenance,
                    and safety inspections — multi-brand mastery at <strong className="text-slate-900 font-semibold">~30% lower cost</strong> than OEM direct.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToFloor('contact')}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
                    >
                      Request Service
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 ml-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                    <a
                      href="tel:+919049994679"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                    >
                      +91 90499 94679
                    </a>
                  </div>
                </div>
              </div>

              {/* Descending Prompt */}
              <div
                onClick={() => scrollToFloor('services')}
                className="mt-8 flex shrink-0 flex-col items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-700 transition-colors"
                aria-hidden="true"
              >
                <span className="text-xs uppercase tracking-widest font-mono">Descending</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 animate-bounce"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRANSITION BAR 1: WHY NSE (Exact Reference Layout & Typography)
             ========================================================================= */}
          <section id="trust" className="transition-floor-bar relative">
            <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
            <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
              <div className="mx-auto w-full text-center max-w-6xl">
                <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                  Why NSE – New Sahyadri Elevator
                </h2>
                <div data-stagger-grid className="mx-auto grid max-w-5xl grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2">
                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex flex-col p-3 text-center h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">Fast Response</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs leading-relaxed">
                        When your elevator is down, we prioritize getting you back up and running with rapid emergency response.
                      </p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex flex-col p-3 text-center h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">Precision Engineering</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs leading-relaxed">
                        Component-level diagnostics, genuine OEM replacement parts, and dedicated field engineers.
                      </p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex flex-col p-3 text-center h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2.122 2.122 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">Customer First</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs leading-relaxed">
                        Dedicated local service across Navi Mumbai and Pune serving 450+ high-rise elevator cars.
                      </p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex flex-col p-3 text-center h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                          <circle cx="12" cy="8" r="6" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">15+ Years Experience</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs leading-relaxed">
                        Combined engineering expertise solving complex drive, board, and motor problems others can't.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            FLOOR 1: SERVICES (Exact Reference 3x2 Grid, Typography & Spacing)
           ========================================================================= */}
        <div data-floor="services" id="floor-services" className="relative flex min-h-screen flex-col bg-slate-50/50 border-t border-slate-200/60">
          <section id="services" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
            <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                    Navi Mumbai &amp; Pune • Maharashtra
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                    Residential &amp; Commercial Elevator Services
                  </h2>
                  <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                    From turnkey new installations and 24/7 breakdown rescue to structured preventive AMC maintenance, comprehensive safety audits, and open-architecture modernization. We also provide <a href="#contact" className="underline hover:text-brand-orange">instant AMC quotes</a>.
                  </p>
                </div>

                {/* 6 Grid Cards Matching Reference */}
                <div data-stagger-grid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Card 1: Installation */}
                  <Link
                    href="/services/elevator-installation"
                    className="group h-full border border-slate-200/80 bg-slate-50/80 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <rect x="4" y="3" width="16" height="18" rx="1" />
                        <line x1="9" y1="3" x2="9" y2="21" strokeDasharray="2 2" />
                        <line x1="15" y1="3" x2="15" y2="21" strokeDasharray="2 2" />
                        <rect x="7" y="9" width="10" height="8" rx="1" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Elevator Installation</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Turnkey mechanical design, hoistway engineering, Machine-Room-Less (MRL) and geared lifts with complete precision commissioning.
                    </p>
                  </Link>

                  {/* Card 2: Breakdown Repair */}
                  <Link
                    href="/services/elevator-repair"
                    className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Emergency Breakdown Repair</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      24/7 rapid mobile response with prompt engineering dispatch across Navi Mumbai and Pune.
                    </p>
                  </Link>

                  {/* Card 3: AMC Maintenance */}
                  <Link
                    href="/services/elevator-maintenance"
                    className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M12 2v4" />
                        <path d="m16.2 7.8 2.9-2.9" />
                        <path d="M18 12h4" />
                        <path d="m16.2 16.2 2.9 2.9" />
                        <path d="M12 18v4" />
                        <path d="m4.9 19.1 2.9-2.9" />
                        <path d="M2 12h4" />
                        <path d="m4.9 4.9 2.9 2.9" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Preventative AMC Maintenance</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Comprehensive and non-comprehensive contracts with monthly 25-point safety inspections and genuine parts.
                    </p>
                  </Link>

                  {/* Card 4: Inspection & Testing */}
                  <Link
                    href="/services/safety-inspections-code-compliance"
                    className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="m9 15 2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Inspection &amp; Testing</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      25-point comprehensive health audits, safety gear calibration, full-load drop tests, and ARD battery verification.
                    </p>
                  </Link>

                  {/* Card 5: Modernization */}
                  <Link
                    href="/services/elevator-modernization"
                    className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.29 7 12 12 20.71 7" />
                        <line x1="12" y1="22" x2="12" y2="12" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Modernization &amp; Upgrades</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Microprocessor VVVF controller conversions, regenerative drives, energy-efficient machines, and modern cab interior remodels.
                    </p>
                  </Link>

                  {/* Card 6: AMC Services */}
                  <Link
                    href="/contact/request-maintenance-quote"
                    className="group h-full border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                        <path d="M12 18V6" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">AMC Services &amp; Quote</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Comprehensive &amp; Non-Comprehensive annual maintenance contracts for housing societies at ~30% below OEM direct pricing.
                    </p>
                  </Link>
                </div>

                {/* Pill Chips Strip Matching Reference */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    Schindler Lifts
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    KONE MonoSpace
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    OTIS Gen2
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    Johnson Lifts
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    Thyssenkrupp / TKE
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    Monarch &amp; Step
                  </span>
                </div>

                {/* Exact CTA Buttons Matching Reference */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToFloor('contact')}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
                  >
                    Request Service
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                  >
                    All Services Directory
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRANSITION BAR 2: WHAT CLIENTS SAY (Reviews Carousel Matching Reference)
             ========================================================================= */}
          <section id="reviews" className="transition-floor-bar relative">
            <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
            <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
              <div className="mx-auto w-full text-center max-w-6xl">
                <div className="reviews-carousel">
                  <div className="mb-2 flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 fill-brand-orange text-brand-orange">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 md:text-xl">What Our Clients Say</h2>
                    <p className="text-xs text-slate-500">4.9 stars · 120+ verified client reviews</p>
                  </div>

                  <div className="relative">
                    <div className="reviews-carousel__viewport">
                      <div className="reviews-carousel__track">
                        {testimonials.map((t, idx) => (
                          <div key={idx} className="reviews-carousel__slide">
                            <div className="reviews-carousel__card">
                              <div style={{ marginBottom: '8px' }}>
                                <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 fill-brand-orange text-brand-orange">
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="reviews-carousel__text">“{t.text}”</p>
                              <div className="reviews-carousel__meta">
                                <p className="reviews-carousel__name">{t.name} ({t.org})</p>
                                <span className="reviews-carousel__date">{t.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="mt-1.5 text-center">
                    <Link href="/testimonials" className="text-[11px] font-medium text-brand-orange/90 underline-offset-2 transition-colors hover:text-brand-orange hover:underline">
                      Read all reviews →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            FLOOR 2: INDUSTRIES (Exact Reference 3x2 Grid, Typography & Spacing)
           ========================================================================= */}
        <div data-floor="industries" id="floor-industries" className="relative flex min-h-screen flex-col bg-white border-t border-slate-200/60">
          <section id="industries" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
            <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                    Sector-Specific Engineering • Tailored Mobility
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                    Industries &amp; Facilities We Serve
                  </h2>
                  <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                    Every building environment demands a tailored duty-cycle, traffic profile, and safety protocol — from commercial IT parks and hospitals to housing societies and freight warehouses.
                  </p>
                </div>

                {/* 6 Grid Cards Matching Reference */}
                <div data-stagger-grid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Card 1: Commercial Office */}
                  <Link
                    href="/industries/commercial-office-buildings"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Commercial Office Buildings</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Destination dispatch optimization, 1.5–2.5 m/s VVVF gearless speeds, and sub-25s hall wait times for corporate IT parks.
                    </p>
                  </Link>

                  {/* Card 2: Housing Societies */}
                  <Link
                    href="/industries/residential-high-rises-condos"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Housing Societies (CHS)</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Whisper-quiet leveling, ARD auto-rescue battery failover, and ~30% lower costs to safeguard society reserve funds.
                    </p>
                  </Link>

                  {/* Card 3: Hospitals */}
                  <Link
                    href="/industries/hospital-healthcare-elevators"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M12 8v8" />
                        <path d="M8 12h8" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Hospitals &amp; Healthcare</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Mission-critical bed lifts and trauma elevator uptime with 20-min emergency priority and sterile clean-room protocols.
                    </p>
                  </Link>

                  {/* Card 4: Hotels */}
                  <Link
                    href="/industries/hotel-hospitality-elevators"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Hotels &amp; Hospitality</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Vibration-free ride quality, architectural cab finishes, and discreet off-peak night servicing to protect guest reviews.
                    </p>
                  </Link>

                  {/* Card 5: Education */}
                  <Link
                    href="/industries/education-campuses"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Universities &amp; Campuses</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      High-durability vandal-resistant door fixtures engineered for student halls and research laboratory complexes.
                    </p>
                  </Link>

                  {/* Card 6: Industrial */}
                  <Link
                    href="/industries/industrial-freight-elevators"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Industrial &amp; Freight</h3>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Heavy 3,000kg+ capacity freight elevators, reinforced sill plates, and hydraulic cylinder overhauls for warehouses.
                    </p>
                  </Link>
                </div>

                {/* Pill Chips Strip Matching Reference */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    15+ Years Pune &amp; Mumbai
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    350+ Elevators Under Care
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    15+ Certified Engineers
                  </span>
                  <span className="rounded-full border border-brand-orange/40 bg-brand-orange/15 px-4 py-1.5 text-sm font-semibold text-brand-orange backdrop-blur-sm">
                    24/7 Rapid Response Dispatch
                  </span>
                </div>

                {/* CTA Buttons Matching Reference */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToFloor('contact')}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
                  >
                    Request Facility Assessment
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <Link
                    href="/industries"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                  >
                    All Industries Directory
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRANSITION BAR 3: FAQS (Matching Reference Layout & Typography)
             ========================================================================= */}
          <section id="faq" className="transition-floor-bar relative">
            <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
            <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
              <div className="mx-auto w-full text-center max-w-3xl">
                <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">Frequently Asked Questions</h2>
                <div className="mx-auto rounded-xl border border-slate-200/90 bg-white p-3 text-left shadow-sm hover:border-brand-orange/40 md:p-4 transition-all text-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-orange transition-colors md:text-base">
                      {faqItems[activeFaqIndex].q}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {faqItems[activeFaqIndex].a}
                    </p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveFaqIndex((prev) => (prev === 0 ? faqItems.length - 1 : prev - 1))}
                      className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-brand-orange hover:text-brand-orange shadow-xs cursor-pointer"
                      aria-label="Previous question"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-1">
                      {faqItems.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveFaqIndex(i)}
                          className="flex min-h-[44px] min-w-[24px] items-center justify-center px-1 cursor-pointer"
                          aria-label={`Go to question ${i + 1}`}
                        >
                          <span
                            className={`h-1.5 rounded-full transition-all block ${
                              activeFaqIndex === i ? 'w-6 bg-brand-orange' : 'w-1.5 bg-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveFaqIndex((prev) => (prev === faqItems.length - 1 ? 0 : prev + 1))}
                      className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-brand-orange hover:text-brand-orange shadow-xs cursor-pointer"
                      aria-label="Next question"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            FLOOR 3: SERVICE AREAS (Exact Reference Typography & Regional Depots)
           ========================================================================= */}
        <div data-floor="service-areas" id="floor-service-areas" className="relative flex min-h-screen flex-col bg-slate-50/50 border-t border-slate-200/60">
          <section id="service-areas" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
            <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                    Regional Operations Command • 24/7 Rapid Dispatch
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                    Service Areas &amp; Operations Hubs
                  </h2>
                  <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                    Certified field engineering teams stationed at dedicated regional depots in Pune and Navi Mumbai, backed by 24/7 motorized rapid-response units and stocked OEM spare parts.
                  </p>
                </div>

                {/* 2 Flagship Command Depots */}
                <div data-stagger-grid className="mt-10 grid gap-4 md:grid-cols-2">
                  {/* Pune Depot */}
                  <Link
                    href="/locations/elevator-repair-pune-dattanagar"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        24/7 Field Units
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Pune Operations Depot</h3>
                    <p className="font-mono text-xs text-slate-500 mt-1">
                      Dattanagar, Pune • PCMC &amp; Western Corridors
                    </p>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Primary regional depot deploying certified engineers for 24/7 rapid emergency response, comprehensive preventative AMC, and multi-brand repairs across Pune &amp; PCMC.
                    </p>
                  </Link>

                  {/* Mumbai & Navi Mumbai HQ */}
                  <Link
                    href="/locations/elevator-repair-navi-mumbai"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mb-3 h-10 w-10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        24/7 Field Units
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Mumbai &amp; Navi Mumbai HQ</h3>
                    <p className="font-mono text-xs text-slate-500 mt-1">
                      Airoli, Navi Mumbai • MMR Metropolitan Region
                    </p>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Central operations command providing 24/7 emergency dispatch, certified lift servicing, and genuine OEM parts across Navi Mumbai, Mumbai, and MMR metropolitan corridors.
                    </p>
                  </Link>
                </div>

                {/* Below the Card: Pune & PCMC Covered Localities Pill Strip */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      Pune &amp; PCMC Covered Localities ({PUNE_DEPOT_LOCALITIES.length} Active Hubs):
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {PUNE_DEPOT_LOCALITIES.map((locality) => (
                      <Link
                        key={locality}
                        href="/locations/elevator-repair-pune-dattanagar"
                        className="rounded-full border border-slate-300 bg-slate-100/90 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:bg-orange-50/80 hover:text-brand-orange hover:shadow-md cursor-pointer no-underline"
                      >
                        {locality}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Compact Highlighted Pune Operations Hub Box */}
                <div data-card-unit className="mt-5 rounded-xl border border-brand-orange/30 bg-orange-50/70 p-4 sm:p-5 shadow-xs transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                            Pune Operations Hub &amp; Branch Office
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-900">
                          Swant Plaza, Shop No. 203, Dattanagar, Pune, Maharashtra – 411046
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Local Hotline &amp; WhatsApp: <a href="tel:+919049994679" className="text-brand-orange font-bold hover:underline">+91 90499 94679</a> • Coverage: Pune, PCMC, Katraj, Hinjewadi &amp; Surrounding Localities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 sm:self-center">
                      <a
                        href="tel:+919049994679"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2 text-xs font-mono font-bold text-white shadow-xs transition-all hover:bg-brand-orange-dark active:scale-95 whitespace-nowrap"
                      >
                        Call Pune Hub
                      </a>
                      <Link
                        href="/locations/elevator-repair-pune-dattanagar"
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono font-bold text-slate-700 hover:border-brand-orange hover:text-brand-orange shadow-xs transition-all whitespace-nowrap"
                      >
                        <span>Hub Details</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons Matching Reference */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToFloor('contact')}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
                  >
                    Request Immediate Dispatch
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <Link
                    href="/locations"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                  >
                    All Service Locations
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRANSITION BAR 4: OPERATIONAL TRACK RECORD (Matching Reference Layout & Typography)
             ========================================================================= */}
          <section id="certifications" className="transition-floor-bar relative">
            <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
            <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
              <div className="mx-auto w-full text-center max-w-6xl">
                <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">Proven Operational Track Record</h2>
                <div data-stagger-grid className="mx-auto grid max-w-5xl grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-3 xl:grid-cols-5">
                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">15+ Years</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Pune &amp; Mumbai Ops</p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                          <line x1="9" x2="9" y1="2" y2="22" />
                          <line x1="15" x2="15" y1="2" y2="22" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">350+ Elevators</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Under Active Care</p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">15+ Engineers</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Pune Field Team</p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">24/7 Dispatch</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Rapid Field Units</p>
                    </div>
                  </div>

                  <div className="h-full min-h-0">
                    <div className="group rounded-lg border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 flex-col p-3 text-center block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent h-full !p-2">
                      <div className="flex items-center justify-center rounded-md bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white mx-auto mb-2 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">~30% Savings</h3>
                      <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-1 flex-1 line-clamp-3 text-xs">Direct OEM Spares</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            FLOOR 4: CASE STUDIES (Exact Reference Grid, Typography & Metrics)
           ========================================================================= */}
        <div data-floor="case-studies" id="floor-case-studies" className="relative flex min-h-screen flex-col bg-white border-t border-slate-200/60">
          <section id="case-studies" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
            <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                    Verified Fleet Performance • Proven Outcomes
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                    Proven Reliability &amp; Client Outcomes
                  </h2>
                  <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                    Real-world results for residential housing societies and commercial facilities across Maharashtra — eliminating recurring breakdowns, reducing costs, and achieving 100% compliance pass rates.
                  </p>
                </div>

                {/* 3 Transformation Case Cards Matching Reference */}
                <div data-stagger-grid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Case 1: Greenfield Heights */}
                  <Link
                    href="/case-studies/greenfield-heights-amc-takeover"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                        -82% Callbacks
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Greenfield Heights CHS</h3>
                    <p className="font-mono text-xs text-zinc-400 mt-1">6 Geared Passenger Cars • Airoli</p>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Migrated from multinational OEM after chronic callback delays. Monthly failures dropped from 11/mo to under 1/mo while saving 34% annually.
                    </p>
                  </Link>

                  {/* Case 2: Mayflower Residency */}
                  <Link
                    href="/case-studies/mayflower-residency-safety-audit"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                        100% ARD Pass
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Mayflower Residency CHS</h3>
                    <p className="font-mono text-xs text-zinc-400 mt-1">4 Passenger Lifts • Kothrud, Pune</p>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Emergency safety remediation and ARD battery bank restoration within 72 hours, delivering 100% fail-safe passenger rescue.
                    </p>
                  </Link>

                  {/* Case 3: Apex Hospital */}
                  <Link
                    href="/case-studies"
                    className="group border border-slate-200/90 bg-white transition-all duration-300 hover:border-brand-orange/50 hover:shadow-md hover:shadow-lg hover:shadow-brand-orange/10 rounded-xl p-5 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center bg-brand-orange/20 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white h-10 w-10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                        99.9% Uptime
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Apex Multi-Specialty Hospital</h3>
                    <p className="font-mono text-xs text-zinc-400 mt-1">3 Bed Lifts • Vashi, Navi Mumbai</p>
                    <p className="text-slate-600 transition-colors group-hover:text-slate-900 mt-2 text-sm leading-relaxed text-justify">
                      Full-scope drive modernization to open-protocol microprocessor controllers, delivering 100% ARD failover reliability.
                    </p>
                  </Link>
                </div>

                {/* KPI Strip Matching Reference */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    99.8% Fleet Uptime
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    Rapid Response SLA
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    31% Average Cost Reduction
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange hover:shadow-md">
                    100% Safety Verified
                  </span>
                </div>

                {/* CTA Buttons Matching Reference */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
                  >
                    View All Case Studies
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    onClick={() => scrollToFloor('contact')}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                  >
                    Request Free Safety Audit
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              TRANSITION BAR 5: STATS (Matching Reference Layout & Typography)
             ========================================================================= */}
          <section id="stats" className="transition-floor-bar relative">
            <div className="absolute inset-0 z-0 bg-slate-100/95 border-y border-slate-200" aria-hidden="true" />
            <div className="transition-floor-bar__inner relative z-10 lg:pr-12">
              <div className="mx-auto w-full text-center max-w-6xl">
                <h2 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">Trusted Across Maharashtra</h2>
                <div data-stagger-grid className="mx-auto grid max-w-5xl grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2">
                  <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                    <p className="text-xl font-bold text-brand-orange md:text-2xl">15+</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Years in Business</p>
                    <p className="text-[10px] text-slate-500 md:text-xs">Serving MH since 2011</p>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                    <p className="text-xl font-bold text-brand-orange md:text-2xl">450+</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Elevators Maintained</p>
                    <p className="text-[10px] text-slate-500 md:text-xs">Across Navi Mumbai &amp; Pune</p>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                    <p className="text-xl font-bold text-brand-orange md:text-2xl">4.9★</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Google Rating</p>
                    <p className="text-[10px] text-slate-500 md:text-xs">From 120+ verified reviews</p>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-black/40 p-2 backdrop-blur-md">
                    <p className="text-xl font-bold text-brand-orange md:text-2xl">Rapid</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-900 md:text-sm">Emergency Dispatch SLA</p>
                    <p className="text-[10px] text-slate-500 md:text-xs">Guaranteed rapid arrival</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            FLOOR 5: ABOUT US (Exact Reference Typography & Narrative Spacing)
           ========================================================================= */}
        <div data-floor="about" id="floor-about" className="relative flex min-h-screen flex-col bg-slate-50/50 border-t border-slate-200/60">
          <section id="about" className="relative flex-1 flex flex-col justify-center">
            <div className="floor-content relative z-10 flex min-h-[90vh] items-center px-6 py-20 lg:pr-12">
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                    An Engineering Team Built on Technical Integrity
                  </h2>
                  <p className="mt-6 max-w-4xl leading-relaxed text-slate-600 text-base sm:text-lg text-justify">
                    New Sahyadri Elevator was founded over 15 years ago with a mission to free building owners and housing societies from multinational OEM monopoly lock-in. Where multinational conglomerates push costly full replacements, our certified engineers troubleshoot and repair down to component level.
                  </p>
                  <p className="mt-4 max-w-4xl leading-relaxed text-slate-600 text-base sm:text-lg text-justify">
                    Today, our master technicians manage 350+ elevator cars across Navi Mumbai and Pune. Combining rigorous preventative multi-point safety protocols with genuine spare parts supply and ~30% lower costs, we ensure your building enjoys zero-breakdown vertical transport.
                  </p>
                </div>

                {/* 4 Operational Pillars */}
                <div data-stagger-grid className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                    <span className="font-mono text-xs font-bold text-brand-orange uppercase">Experience</span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">15+ Years</h3>
                    <p className="text-slate-500 text-xs mt-1">Mumbai &amp; Pune Operations</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Track Record</span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">450+ Lifts</h3>
                    <p className="text-slate-500 text-xs mt-1">Under active management</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase">Rapid Rescue</span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">Rapid SLA</h3>
                    <p className="text-slate-500 text-xs mt-1">Motorized mobile units</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm text-slate-700">
                    <span className="font-mono text-xs font-bold text-purple-400 uppercase">Savings</span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">~30% Lower</h3>
                    <p className="text-slate-500 text-xs mt-1">Direct from OEM pricing</p>
                  </div>
                </div>

                {/* CTA Buttons Matching Reference */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToFloor('contact')}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-brand-orange text-white shadow-md hover:bg-brand-orange-dark h-12 rounded-md px-8 text-base cursor-pointer active:scale-95"
                  >
                    Request Service
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            CONTACT / INSTANT AMC QUOTE DESK (Floor 5 Extended)
           ========================================================================= */}
        <div data-floor="contact" id="floor-contact" className="relative flex min-h-screen flex-col bg-white border-t border-slate-200/60">
          <section id="contact" className="scroll-mt-24 relative flex-1 flex flex-col justify-center">
            <div className="floor-content relative z-10 flex min-h-[90vh] flex-col justify-start px-6 py-12 lg:py-16 lg:pr-12">
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">
                    Contact NSE &amp; Instant AMC Quote
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                    Request Service or Instant AMC Quote
                  </h2>
                  <p className="mt-4 max-w-4xl text-lg text-slate-600 text-justify">
                    Connect directly with our 24/7 central dispatch desk or calculate an instant, transparent maintenance proposal for your building.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
                  {/* Left: Contact Details */}
                  <div className="space-y-4 lg:col-span-5">
                    <div data-card-unit className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-md text-slate-800">
                      <span className="text-xs font-mono font-bold uppercase text-brand-orange">
                        24/7 Central Dispatch Hotline
                      </span>
                      <h3 className="font-bold text-slate-900 text-xl mt-1">Immediate Assistance</h3>
                      <p className="text-slate-600 text-sm mt-2 text-justify">
                        For passenger entrapments or sudden elevator breakdowns across Navi Mumbai and Pune.
                      </p>
                      <a
                        href="tel:+919049994679"
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-3 font-semibold text-sm text-white w-full shadow-md transition-all hover:bg-brand-orange-dark active:scale-95"
                      >
                        Call +91 90499 94679
                      </a>
                    </div>

                    <div data-card-unit className="rounded-xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-md text-slate-800">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Navi Mumbai Regional Hub</h4>
                        <p className="text-slate-600 text-xs mt-0.5">Airoli, Navi Mumbai, Maharashtra</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <h4 className="font-bold text-slate-900 text-sm">Pune Operations Depot</h4>
                        <p className="text-slate-600 text-xs mt-0.5">Dattanagar, Pune, Maharashtra</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-xs font-mono text-zinc-400">Email: office.pune@nsei.in</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive Quote Form */}
                  <div data-card-unit className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl lg:col-span-7 text-slate-800">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Instant AMC Proposal Calculator</h3>
                    <p className="text-slate-600 text-xs mb-4 text-justify">Select your elevator specifications to receive an instant transparent estimate.</p>
                    <QuoteCalculatorForm embedded={true} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Global Footer Docked inside the cab viewport */}
          <GlobalFooter />
        </div>
      </div>
    </div>
  );
}
