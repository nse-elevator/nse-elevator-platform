'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AnalyticsErrorBoundary from './AnalyticsErrorBoundary';

const AnalyticsDashboardSection = dynamic(
  () => import('./AnalyticsDashboardSection'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white border border-steel-300 rounded-sm p-8 shadow-milled text-center font-mono text-xs text-steel-500">
        Loading Analytics &amp; Visualizations...
      </div>
    ),
  }
);

interface LeadStats {
  totalLeads: number;
  leadsThisWeek: number;
  statusCounts: {
    New: number;
    Contacted: number;
    Quoted: number;
    Converted: number;
    Lost: number;
  };
  topSources: Array<{ source: string; count: number }>;
  recentLeads: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    buildingName?: string;
    propertyType?: string;
    serviceUrgency?: string;
    status: string;
    createdAt: string;
  }>;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-emergency-500/10', text: 'text-emergency-500', border: 'border-emergency-500/30' },
  Contacted: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30' },
  Quoted: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  Converted: { bg: 'bg-safety-500/10', text: 'text-safety-500', border: 'border-safety-500/30' },
  Lost: { bg: 'bg-steel-500/10', text: 'text-steel-400', border: 'border-steel-600' },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/leads/stats')
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          window.location.href = '/admin/login?redirect=' + encodeURIComponent('/admin/dashboard');
          return null;
        }
        if (!res.ok) throw new Error('Failed to load dashboard metrics');
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.success) {
          setStats(data.data);
        } else {
          setError(data.error?.message || 'Error loading data');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center font-mono text-xs text-steel-500 animate-pulse">
        Loading operational telemetry &amp; lead metrics...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 bg-white border border-emergency-200 rounded-sm text-xs text-emergency-600">
        <p className="font-bold">Error loading dashboard telemetry:</p>
        <p className="mt-1">{error || 'Unknown error'}</p>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-steel-900 hover:bg-steel-800 text-white px-3 py-1.5 rounded-sm font-mono text-xs transition-colors"
          >
            Retry
          </button>
          <a
            href="/admin/login"
            className="bg-emergency-500 hover:bg-emergency-600 text-white px-3 py-1.5 rounded-sm font-mono text-xs font-bold transition-colors"
          >
            Re-login with Admin Credentials →
          </a>
        </div>
      </div>
    );
  }

  const activePipeline =
    (stats.statusCounts?.New || 0) + (stats.statusCounts?.Contacted || 0) + (stats.statusCounts?.Quoted || 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emergency-500 block">
            Executive Summary
          </span>
          <h1 className="text-2xl font-extrabold text-steel-950 tracking-tight">
            Commercial Elevator Operations &amp; Leads Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="bg-emergency-500 hover:bg-emergency-600 text-white px-4 py-2 rounded-sm font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>📥 View All Leads</span>
            <span>→</span>
          </Link>
          <Link
            href="/admin/settings"
            className="bg-white hover:bg-steel-50 border border-steel-300 text-steel-700 px-3 py-2 rounded-sm font-mono text-xs font-bold transition-all"
          >
            Site Settings
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-steel-300 p-5 rounded-sm shadow-milled">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-steel-500 block">
            Leads This Week
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-steel-950 font-mono">
              {stats.leadsThisWeek ?? 0}
            </span>
            <span className="text-[11px] font-mono text-safety-600 font-bold">Past 7 Days</span>
          </div>
          <p className="text-[11px] text-steel-500 mt-1">Inbound breakdown &amp; AMC requests</p>
        </div>

        <div className="bg-white border border-steel-300 p-5 rounded-sm shadow-milled">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-steel-500 block">
            Active Sales Pipeline
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-steel-950 font-mono">
              {activePipeline}
            </span>
            <span className="text-[11px] font-mono text-amber-600 font-bold">In Progress</span>
          </div>
          <p className="text-[11px] text-steel-500 mt-1">New, Contacted, &amp; Quoted bids</p>
        </div>

        <div className="bg-white border border-steel-300 p-5 rounded-sm shadow-milled">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-steel-500 block">
            Converted Contracts
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-safety-600 font-mono">
              {stats.statusCounts?.Converted || 0}
            </span>
            <span className="text-[11px] font-mono text-steel-400">
              ({stats.totalLeads > 0 ? Math.round(((stats.statusCounts?.Converted || 0) / stats.totalLeads) * 100) : 0}% rate)
            </span>
          </div>
          <p className="text-[11px] text-steel-500 mt-1">Active won elevator care contracts</p>
        </div>

        <div className="bg-white border border-steel-300 p-5 rounded-sm shadow-milled">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-steel-500 block">
            Total Ingested Leads
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-steel-950 font-mono">
              {stats.totalLeads ?? 0}
            </span>
            <span className="text-[11px] font-mono text-steel-400">Cumulative</span>
          </div>
          <p className="text-[11px] text-steel-500 mt-1">All-time website &amp; hotline inquiries</p>
        </div>
      </div>

      {/* Pipeline Status Breakdown Grid */}
      <div className="bg-white border border-steel-300 p-6 rounded-sm shadow-milled">
        <h2 className="text-sm font-bold text-steel-900 font-mono uppercase tracking-wider mb-4">
          Pipeline Status Breakdown
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
          {(['New', 'Contacted', 'Quoted', 'Converted', 'Lost'] as const).map((st) => {
            const count = stats.statusCounts?.[st] || 0;
            const style = statusColors[st];
            return (
              <div
                key={st}
                className={`p-3.5 rounded-sm border ${style.border} ${style.bg} flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${style.text}`}>{st}</span>
                  {st === 'New' && count > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emergency-500 animate-pulse" />
                  )}
                </div>
                <span className="text-2xl font-extrabold text-steel-950 mt-2">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Telemetry: Top Sources & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 60%: Top Lead Sources */}
        <div className="lg:col-span-7 bg-white border border-steel-300 p-6 rounded-sm shadow-milled">
          <h2 className="text-sm font-bold text-steel-900 font-mono uppercase tracking-wider mb-4">
            Top 5 Source Channels by Volume
          </h2>
          {!stats.topSources || stats.topSources.length === 0 ? (
            <p className="text-xs font-mono text-steel-400">No lead sources tracked yet.</p>
          ) : (
            <div className="space-y-3 font-mono">
              {stats.topSources.map((s, idx) => {
                const pct = stats.totalLeads > 0 ? Math.round((s.count / stats.totalLeads) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-steel-800 font-bold">{s.source}</span>
                      <span className="text-steel-500">
                        {s.count} leads ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-steel-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emergency-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.max(8, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 40%: Quick Content Administration Actions */}
        <div className="lg:col-span-5 bg-white border border-steel-300 p-6 rounded-sm shadow-milled flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-steel-900 font-mono uppercase tracking-wider mb-2">
              Content Quick Jump
            </h2>
            <p className="text-xs text-steel-500 mb-4">
              Directly edit public website specifications and emergency parameters:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <Link
                href="/admin/services"
                className="p-2.5 bg-steel-50 hover:bg-steel-100 border border-steel-200 rounded-sm text-steel-800 font-bold transition-colors block text-center"
              >
                ⚙️ Services
              </Link>
              <Link
                href="/admin/locations"
                className="p-2.5 bg-steel-50 hover:bg-steel-100 border border-steel-200 rounded-sm text-steel-800 font-bold transition-colors block text-center"
              >
                📍 Locations
              </Link>
              <Link
                href="/admin/case-studies"
                className="p-2.5 bg-steel-50 hover:bg-steel-100 border border-steel-200 rounded-sm text-steel-800 font-bold transition-colors block text-center"
              >
                📑 Case Studies
              </Link>
              <Link
                href="/admin/settings"
                className="p-2.5 bg-steel-50 hover:bg-steel-100 border border-steel-200 rounded-sm text-steel-800 font-bold transition-colors block text-center"
              >
                🛠️ Site Settings
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-steel-100 flex items-center justify-between text-[11px] font-mono text-steel-500">
            <span>Database: Persistent WiredTiger</span>
            <span className="text-safety-600 font-bold">● Nominal</span>
          </div>
        </div>
      </div>

      {/* Conversion Analytics & Demand Telemetry Section */}
      <AnalyticsErrorBoundary>
        <AnalyticsDashboardSection />
      </AnalyticsErrorBoundary>

      {/* Recent Leads Activity Feed */}
      <div className="bg-white border border-steel-300 rounded-sm shadow-milled overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-steel-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-steel-950 font-mono uppercase tracking-wider">
              Recent Inbound Leads
            </h2>
            <p className="text-xs text-steel-500 mt-0.5">Most recent breakdown and quote inquiries</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-mono font-bold text-emergency-500 hover:text-emergency-600"
          >
            Open Full CRM →
          </Link>
        </div>

        {!stats.recentLeads || stats.recentLeads.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-steel-400">
            No leads recorded in database yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-steel-50 border-b border-steel-200 text-steel-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Contact</th>
                  <th className="py-2.5 px-4">Building &amp; Type</th>
                  <th className="py-2.5 px-4">Urgency</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-100">
                {(stats.recentLeads || []).map((lead) => {
                  const style = statusColors[lead.status] || statusColors.New;
                  return (
                    <tr key={lead._id} className="hover:bg-steel-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-steel-900 block">{lead.name}</span>
                        <span className="text-[11px] text-steel-500 font-mono">{lead.email}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-steel-800 font-medium block">
                          {lead.buildingName || '—'}
                        </span>
                        <span className="text-[11px] text-steel-500">{lead.propertyType || '—'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-steel-700 font-mono text-[11px]">
                          {lead.serviceUrgency || 'Standard'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold border ${style.border} ${style.bg} ${style.text}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-steel-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
