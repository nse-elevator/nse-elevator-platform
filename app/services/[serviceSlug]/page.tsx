import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceHero } from '../../../components/ServiceHero';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';
import { FaqAccordion } from '../../../components/FaqAccordion';
import dynamic from 'next/dynamic';
import { getServices, getServiceBySlug } from '../../../lib/api';

const ScrollDepthTracker = dynamic(
  () => import('../../../components/ScrollDepthTracker').then((mod) => mod.ScrollDepthTracker),
  { ssr: false }
);

export const revalidate = 3600; // ISR: 1 hour

export async function generateStaticParams() {
  const services = await getServices();
  return (services || []).map((s) => ({
    serviceSlug: s.slug,
  }));
}

export async function generateMetadata({ params }: { params: { serviceSlug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.serviceSlug);
  if (!service) return { title: 'Service Not Found | NSE – New Sahyadri Elevator' };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServiceSubPage({ params }: { params: { serviceSlug: string } }) {
  const service = await getServiceBySlug(params.serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full">
      <ScrollDepthTracker />
      {/* 1. Service Hero Component */}
      <ServiceHero
        title={service.title}
        keywordHighlight={service.keywordHighlight}
        categoryBadge={service.categoryBadge}
        leadText={service.leadText}
        bulletPoints={service.checklist || []}
        serviceSlug={params.serviceSlug}
      />

      {/* 2. Trust Strip */}
      <TrustBadgesBar />

      {/* 3. Engineering Workflow Steps */}
      {service.workflowSteps && service.workflowSteps.length > 0 && (
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block">
                Standard Operating Procedure
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Our 4-Phase Engineering Methodology
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Precision execution designed to minimize building disruption and ensure peak operational reliability and safety.
              </p>
            </div>

            <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {service.workflowSteps.map((step: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-2xl font-mono font-extrabold text-brand-orange block mb-2">
                      {step.step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FaqAccordion
          items={service.faqs}
          title={`Frequently Answered Questions: ${service.keywordHighlight || service.title}`}
        />
      )}

      {/* 5. Bottom Conversion Callout */}
      <section className="bg-slate-100 text-slate-900 py-16 border-b border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Need an On-Site Engineering Survey for Your Building?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Contact our senior engineering team to schedule an equipment evaluation, compliance review, or modernization proposal across Navi Mumbai and Pune.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`/contact/request-maintenance-quote?service=${params.serviceSlug}`}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all shadow-md active:scale-[0.98]"
            >
              Request Engineering Survey →
            </a>
            <a
              href="tel:+919049994679"
              className="text-slate-700 hover:text-brand-orange font-mono text-xs font-bold transition-colors"
            >
              Or Call Dispatch: +91 90499 94679
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
