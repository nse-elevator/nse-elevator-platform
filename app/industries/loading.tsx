import React from 'react';

export default function IndustriesLoading() {
  return (
    <div className="min-h-[85vh] w-full px-4 sm:px-6 lg:px-12 py-10 max-w-6xl mx-auto animate-pulse">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <span className="text-slate-300">/</span>
        <div className="h-3 w-24 bg-slate-200 rounded" />
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="h-3 w-36 bg-orange-200 rounded mb-3" />
        <div className="h-8 w-4/5 bg-slate-300 rounded mb-3" />
        <div className="h-4 w-full bg-slate-200 rounded mb-2" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
      </div>

      {/* 6 Industry Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs min-h-[220px]">
            <div className="h-10 w-10 rounded-lg bg-orange-100 mb-4" />
            <div className="h-5 w-3/4 bg-slate-300 rounded mb-2" />
            <div className="h-3 w-full bg-slate-200 rounded mb-2" />
            <div className="h-3 w-4/5 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
