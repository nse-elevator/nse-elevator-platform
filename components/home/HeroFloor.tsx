import React from 'react';
import Image from 'next/image';

export function HeroFloor() {
  return (
    <div data-floor="hero" id="floor-g" className="relative flex min-h-screen flex-col">
      <section id="hero" className="relative flex-1 flex flex-col justify-center">
        {/* Background Image & Dual Overlays */}
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
                <a
                  href="#contact"
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
                </a>
                <a
                  href="tel:+919011096990"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 rounded-md px-8 text-base border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-800 hover:bg-slate-900 hover:text-white shadow-sm active:scale-95"
                >
                  +91 90110 96990
                </a>
              </div>
            </div>
          </div>

          {/* Descending Prompt */}
          <a
            href="#services"
            className="mt-8 flex shrink-0 flex-col items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-700 transition-colors"
            aria-label="Scroll down to services"
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
          </a>
        </div>
      </section>

      {/* TRANSITION BAR 1: WHY NSE */}
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
  );
}
