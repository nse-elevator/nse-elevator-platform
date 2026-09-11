import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';
import { FaqAccordion } from '../../../components/FaqAccordion';
import { DynamicQuoteCalculator as QuoteCalculatorForm } from '../../../components/DynamicQuoteCalculator';
import { getIndustries, getIndustryBySlug } from '../../../lib/api';

export const revalidate = 3600; // ISR: 1 hour

export async function generateStaticParams() {
  const industries = await getIndustries();
  return (industries || []).map((ind) => ({
    industrySlug: ind.slug,
  }));
}

export async function generateMetadata({ params }: { params: { industrySlug: string } }): Promise<Metadata> {
  const ind = await getIndustryBySlug(params.industrySlug);
  if (!ind) return { title: 'Industry Not Found | NSE – New Sahyadri Elevator' };
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
  };
}

export default async function IndustryPage({ params }: { params: { industrySlug: string } }) {
  const ind = await getIndustryBySlug(params.industrySlug);

  if (!ind) {
    notFound();
  }

  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <li><Link href="/" prefetch={true} className="hover:text-slate-900 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/industries" prefetch={true} className="hover:text-slate-900 transition-colors">Industries</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 font-semibold">{ind.name}</li>
            </ol>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange block mb-2">
            Industry Specification
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Elevator Maintenance for {ind.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mt-4 text-justify">
            {ind.description}
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Challenges & Solutions Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ind.criticalChallenges && (
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Industry-Specific Operational Pitfalls</span>
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {ind.criticalChallenges.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-mono">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ind.vanguardSolutions && (
              <div className="bg-white border-2 border-brand-orange/40 p-8 rounded-2xl shadow-md">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>The NSE Engineering Solution</span>
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  {ind.vanguardSolutions.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {ind.faqs && ind.faqs.length > 0 && (
        <FaqAccordion items={ind.faqs} title={`Frequently Answered Questions: ${ind.name}`} />
      )}

      <QuoteCalculatorForm />
    </div>
  );
}
