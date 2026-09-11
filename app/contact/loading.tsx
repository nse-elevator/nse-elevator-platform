import React from 'react';

export default function ContactLoading() {
  return (
    <div className="min-h-[85vh] w-full px-4 sm:px-6 lg:px-12 py-10 max-w-6xl mx-auto animate-pulse">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <span className="text-slate-300">/</span>
        <div className="h-3 w-20 bg-slate-200 rounded" />
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="h-3 w-36 bg-orange-200 rounded mb-3" />
        <div className="h-8 w-4/5 bg-slate-300 rounded mb-3" />
        <div className="h-4 w-full bg-slate-200 rounded" />
      </div>

      {/* 2-column layout */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs min-h-[160px]" />
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs min-h-[180px]" />
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs min-h-[420px]" />
        </div>
      </div>
    </div>
  );
}
