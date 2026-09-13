'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export const DynamicQuoteCalculator = dynamic(
  () => import('./QuoteCalculatorForm').then((mod) => mod.QuoteCalculatorForm),
  {
    ssr: true,
    loading: () => (
      <div className="w-full max-w-4xl mx-auto my-12 rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto mb-4" />
        <div className="h-10 bg-slate-100 rounded w-2/3 mx-auto" />
      </div>
    ),
  }
);
