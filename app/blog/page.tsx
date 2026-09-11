import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';

export const metadata: Metadata = {
  title: 'Elevator Engineering Blog & Technical Guides | NSE',
  description: 'Technical insights on elevator maintenance, genuine OEM spare parts, preventative care routines, and energy-efficient modernizations across Mumbai and Pune.',
};

const blogPosts = [
  {
    slug: 'why-proprietary-elevator-software-costs-thousands',
    title: 'Genuine OEM Spares vs. Counterfeit Parts: Why Quality Matters for High-Rise Lifts',
    category: 'Safety & Spares',
    readTime: '6 Min Read',
    date: 'August 14, 2026',
    author: 'Sachin Patil',
    summary: 'Why New Sahyadri Elevator insists on 100% genuine OEM replacement parts for Schindler, KONE, OTIS, and Johnson lifts, preserving passenger safety while reducing costs.',
  },
  {
    slug: 'asme-a17-category-1-vs-category-5-testing-explained',
    title: 'Housing Society Elevator Safety & Maintenance: A Managing Committee Guide',
    category: 'Safety & Maintenance',
    readTime: '7 Min Read',
    date: 'July 28, 2026',
    author: 'Dinesh Shinde',
    summary: 'Essential 25-point safety inspection checklist, emergency rescue protocols, and routine maintenance practices every housing society managing committee should know.',
  },
  {
    slug: 'warning-signs-hydraulic-elevator-cylinder-failure',
    title: '5 Warning Signs Your Society Elevator Needs Immediate Brake or Wire Rope Service',
    category: 'Mechanical Engineering',
    readTime: '5 Min Read',
    date: 'June 19, 2026',
    author: 'Pravin Jadhav',
    summary: 'How to detect brake wear, wire rope fatigue, and leveling drift before sudden mechanical failure or passenger entrapments occur.',
  },
];

export default function BlogHubPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Technical Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Elevator Engineering &amp; Safety Knowledge Base
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Practical advice for facility managers, housing society managing committees, and property owners navigating elevator maintenance, safety inspections, and modernizations.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3">
                  <span className="bg-orange-50 text-brand-orange border border-brand-orange/20 px-2 py-0.5 rounded-md font-bold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 text-justify">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-mono">
                  <span className="text-slate-800 font-bold block">{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-xs font-mono font-bold text-slate-900 hover:text-brand-orange transition-colors flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
