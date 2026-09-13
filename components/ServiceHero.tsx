'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { trackServicePageView, trackPhoneClick } from '../lib/analytics';

interface ServiceHeroProps {
  title: string;
  keywordHighlight?: string;
  categoryBadge?: string;
  leadText: string;
  bulletPoints: string[];
  serviceSlug: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

export function ServiceHero({
  title,
  keywordHighlight,
  categoryBadge = 'MULTI-BRAND ENGINEERING EXPERTISE',
  leadText,
  bulletPoints,
  serviceSlug,
  primaryCtaText = 'Request Engineering Proposal',
  secondaryCtaText = 'Speak to a Field Engineer',
}: ServiceHeroProps) {
  useEffect(() => {
    trackServicePageView({
      serviceSlug,
      serviceCategory: categoryBadge,
    });
  }, [serviceSlug, categoryBadge]);

  const handlePhoneClick = () => {
    trackPhoneClick({
      location: `service_hero_${serviceSlug}`,
      phoneNumber: '+91 90499 94679',
      contactMethod: 'phone',
    });
  };

  return (
    <section 
      aria-label="Service Overview Hero"
      className="w-full bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden py-12 lg:py-20"
    >
      {/* Background Precision Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation Trail */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <li>
              <Link href="/" prefetch={true} className="hover:text-slate-900 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" prefetch={true} className="hover:text-slate-900 transition-colors">Services</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <div className="max-w-4xl space-y-6">
          {/* Category / Standard Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 border border-brand-orange/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-orange" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
              {categoryBadge}
            </span>
          </div>

          {/* H1 SEO Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            {title}{' '}
            {keywordHighlight && (
              <span className="text-brand-orange">
                {keywordHighlight}
              </span>
            )}
          </h1>

          {/* Value Proposition Lead Paragraph */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal text-justify">
            {leadText}
          </p>

          {/* Technical Value Props List */}
          <ul className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-orange-50 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>

          {/* Primary / Secondary Conversion Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href={serviceSlug ? `/contact/request-maintenance-quote?service=${serviceSlug}` : '/contact/request-maintenance-quote'}
              prefetch={true}
              className="min-h-[44px] bg-brand-orange hover:bg-brand-orange-dark active:scale-[0.98] text-white font-semibold px-6 py-3.5 rounded-md text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{primaryCtaText}</span>
              <span aria-hidden="true">→</span>
            </Link>

            <a
              href="tel:+919049994679"
              onClick={handlePhoneClick}
              className="min-h-[44px] bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-800 border border-slate-300 font-semibold px-6 py-3.5 rounded-md text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{secondaryCtaText}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
