import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';
import { DynamicQuoteCalculator as QuoteCalculatorForm } from '../../../components/DynamicQuoteCalculator';
import { getCaseStudies, getCaseStudyBySlug } from '../../../lib/api';

export const revalidate = 3600; // ISR: 1 hour

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return (cases || []).map((cs) => ({
    caseSlug: cs.slug,
  }));
}

export async function generateMetadata({ params }: { params: { caseSlug: string } }): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.caseSlug);
  if (!cs) return { title: 'Case Study Not Found | NSE – New Sahyadri Elevator' };
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: { caseSlug: string } }) {
  const cs = await getCaseStudyBySlug(params.caseSlug);

  if (!cs) {
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
              <li><Link href="/case-studies" prefetch={true} className="hover:text-slate-900 transition-colors">Case Studies</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 font-semibold">{cs.buildingName}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
              Project Profile: {cs.city}
            </span>
            {cs.angleTag && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md border font-mono text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-brand-orange border-brand-orange/30">
                {cs.angleTag}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl">
            {cs.buildingName} - Case Study
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Property:</span>
              <span className="text-slate-900 font-bold">{cs.buildingName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Equipment:</span>
              <span className="text-slate-900 font-bold">{cs.units}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Scope:</span>
              <span className="text-slate-900 font-bold">{cs.scope}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Location:</span>
              <span className="text-brand-orange font-bold">{cs.city}</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Narrative Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {cs.problem && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Project Challenge</h2>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">{cs.problem}</p>
          </div>
        )}

        {cs.solution && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">The NSE Engineering Solution</h2>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">{cs.solution}</p>
          </div>
        )}

        {/* Client Pull-Quote Callout */}
        {cs.pullQuote && (
          <div data-card-unit className="bg-slate-50 border-l-4 border-brand-orange p-6 rounded-r-2xl shadow-xs">
            <p className="text-sm sm:text-base text-slate-800 italic font-serif leading-relaxed mb-3 text-justify">
              &ldquo;{cs.pullQuote.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{cs.pullQuote.author}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-brand-orange font-medium">{cs.pullQuote.role}</span>
            </div>
          </div>
        )}

        {/* Results Banner */}
        {cs.results && cs.results.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">Measurable Results Achieved</h3>
            <div data-stagger-grid className="grid grid-cols-3 gap-4 text-center">
              {cs.results.map((m: any, idx: number) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <span className="text-2xl font-mono font-extrabold text-emerald-700 block">{m.value}</span>
                  <span className="text-xs text-slate-500 mt-1 block">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <QuoteCalculatorForm />
    </div>
  );
}
