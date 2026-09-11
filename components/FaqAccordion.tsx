'use client';

import React, { useState } from 'react';
import { JsonLd } from './JsonLd';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  includeSchema?: boolean;
}

export function FaqAccordion({
  items,
  title = 'Frequently Answered Engineering & Compliance Questions',
  subtitle = 'Technical details regarding maintenance contracts, modernization lead times, and mandated ASME inspections.',
  includeSchema = true,
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  // Structured Data (JSON-LD FAQPage)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section 
      aria-labelledby="faq-section-title"
      className="w-full bg-slate-50 py-16 sm:py-24 border-b border-slate-200"
    >
      {includeSchema && <JsonLd schema={faqSchema} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block">
            Client Knowledge Base &amp; FAQ
          </span>
          <h2 id="faq-section-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion Container */}
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            const questionId = `faq-q-${idx}`;
            const answerId = `faq-a-${idx}`;

            return (
              <div key={idx} className="py-5">
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full flex items-center justify-between text-left gap-4 group focus-ring rounded-lg py-2.5 min-h-[44px] cursor-pointer"
                  >
                    <span className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                      {item.question}
                    </span>
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:border-brand-orange/40 group-hover:text-brand-orange shadow-xs transition-colors">
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3 pr-8 text-sm text-slate-600 leading-relaxed space-y-2 text-justify">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
