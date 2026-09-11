import React from 'react';

export default function LocationsLoading() {
  return (
    <div className="min-h-[85vh] w-full px-4 sm:px-6 lg:px-12 py-10 max-w-6xl mx-auto animate-pulse">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <span className="text-slate-300">/</span>
        <div className="h-3 w-28 bg-slate-200 rounded" />
      </div>

      {/* Locations Header */}
      <div className="max-w-3xl mb-8">
        <div className="h-3 w-40 bg-orange-200 rounded mb-3" />
        <div className="h-8 w-3/4 bg-slate-300 rounded mb-3" />
        <div className="h-4 w-full bg-slate-200 rounded mb-2" />
      </div>

      {/* 2 Regional Depots Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs min-h-[200px]">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100" />
              <div className="h-4 w-24 bg-emerald-100 rounded" />
            </div>
            <div className="h-6 w-1/2 bg-slate-300 rounded mb-2" />
            <div className="h-3 w-2/3 bg-slate-200 rounded mb-4" />
            <div className="h-3 w-full bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Highlighted Hub Box Skeleton */}
      <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-6 min-h-[100px]" />
    </div>
  );
}
