'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  buildingName?: string;
  address?: string;
  propertyType?: string;
  elevatorCount: number;
  serviceUrgency?: string;
  message?: string;
  source: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Lost';
  createdAt: string;
  utmParams?: Record<string, string>;
}

const statusOptions: Array<'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Lost'> = [
  'New',
  'Contacted',
  'Quoted',
  'Converted',
  'Lost',
];

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-emergency-500/10', text: 'text-emergency-500', border: 'border-emergency-500/30' },
  Contacted: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/30' },
  Quoted: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/30' },
  Converted: { bg: 'bg-safety-500/10', text: 'text-safety-600', border: 'border-safety-500/30' },
  Lost: { bg: 'bg-steel-500/10', text: 'text-steel-500', border: 'border-steel-300' },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (statusFilter !== 'All') {
        params.set('status', statusFilter);
      }

      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setLeads(Array.isArray(result.data) ? result.data : []);
        setTotal(result.meta?.total || 0);
        setTotalPages(result.meta?.totalPages || 1);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle inline status change with immediate PATCH
  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    setStatusUpdatingId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Optimistically update table row
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
      } else {
        alert(data.error?.message || 'Failed to update lead status');
      }
    } catch (err) {
      alert('Network error updating lead status');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Secure client-side CSV export triggering blob download without exposing token in URL
  const handleExportCsv = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.set('status', statusFilter);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const res = await fetch(`/api/admin/leads/export?${params.toString()}`);
      if (!res.ok) {
        throw new Error('CSV export failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nse-leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export leads CSV: ' + (error as Error).message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emergency-500 block">
            Commercial Pipeline &amp; Dispatch Inquiries
          </span>
          <h1 className="text-2xl font-extrabold text-steel-950 tracking-tight">
            Leads Management CRM
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            disabled={exporting || leads.length === 0}
            className="bg-steel-900 hover:bg-steel-800 disabled:opacity-50 text-white border border-steel-700 px-4 py-2 rounded-sm font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{exporting ? 'Generating...' : '📥 Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white border border-steel-300 p-4 rounded-sm shadow-milled flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-mono text-xs">
          {['All', ...statusOptions].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatusFilter(tab);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-sm font-bold transition-colors whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-emergency-500 text-white shadow-sm'
                  : 'text-steel-600 hover:bg-steel-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, phone, building..."
            className="w-full bg-steel-50 border border-steel-300 focus:border-emergency-500 rounded-sm px-3 py-1.5 text-base sm:text-xs text-steel-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-emergency-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1.5 text-steel-400 hover:text-steel-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-steel-300 rounded-sm shadow-milled overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-steel-500 animate-pulse">
            Loading leads pipeline...
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-steel-400">
            No leads match the selected filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-steel-950 text-white font-mono uppercase text-[10px] tracking-wider border-b border-steel-800">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Building &amp; Type</th>
                  <th className="py-3 px-4">Lifts / Urgency</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200">
                {leads.map((lead) => {
                  const style = statusStyles[lead.status] || statusStyles.New;
                  const isUpdating = statusUpdatingId === lead._id;

                  return (
                    <tr key={lead._id} className="hover:bg-steel-50/70 transition-colors">
                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-steel-950 block text-xs">{lead.name}</span>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-steel-600 hover:text-emergency-500 font-mono text-[11px] block"
                        >
                          {lead.email}
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-steel-800 font-mono text-[11px] block mt-0.5"
                        >
                          {lead.phone}
                        </a>
                      </td>

                      {/* Building & Address */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-medium text-steel-900 block truncate">
                          {lead.buildingName || '—'}
                        </span>
                        <span className="text-[11px] text-steel-500 block truncate">
                          {lead.address || '—'}
                        </span>
                        {lead.propertyType && (
                          <span className="inline-block bg-steel-100 text-steel-700 px-1.5 py-0.2 rounded-sm text-[10px] font-mono mt-0.5">
                            {lead.propertyType}
                          </span>
                        )}
                      </td>

                      {/* Lifts & Urgency */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="text-steel-900 font-bold block">
                          {lead.elevatorCount} {lead.elevatorCount === 1 ? 'Lift' : 'Lifts'}
                        </span>
                        <span className="text-emergency-600 block text-[10px]">
                          {lead.serviceUrgency || 'Standard'}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-steel-600">
                        <span className="bg-steel-100 px-2 py-0.5 rounded-sm">
                          {lead.source || 'website'}
                        </span>
                      </td>

                      {/* Inline Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(lead._id, e.target.value as Lead['status'])
                          }
                          className={`font-mono text-[11px] font-bold px-2 py-1 rounded-sm border cursor-pointer focus:outline-none focus:ring-1 focus:ring-emergency-500 ${style.bg} ${style.text} ${style.border} disabled:opacity-50`}
                        >
                          {statusOptions.map((st) => (
                            <option key={st} value={st} className="bg-white text-steel-900">
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Received Date */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-steel-500 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      {/* View Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="bg-steel-100 hover:bg-steel-200 text-steel-800 px-2.5 py-1 rounded-sm font-mono text-[11px] font-bold"
                        >
                          View →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-4 bg-steel-50 border-t border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <span className="text-steel-600">
            Showing {leads.length} of {total} leads
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 bg-white border border-steel-300 rounded-sm font-bold disabled:opacity-40 hover:bg-steel-100"
            >
              Previous
            </button>
            <span className="text-steel-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 bg-white border border-steel-300 rounded-sm font-bold disabled:opacity-40 hover:bg-steel-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-steel-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-steel-400 rounded-sm max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-start justify-between border-b border-steel-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emergency-500 font-bold">
                  Lead Dispatch Record
                </span>
                <h2 className="text-xl font-extrabold text-steel-950 mt-0.5">{selectedLead.name}</h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-steel-400 hover:text-steel-800 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-steel-50 p-4 border border-steel-200 rounded-sm">
              <div>
                <span className="text-steel-500 block uppercase text-[10px]">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="text-emergency-600 font-bold">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-steel-500 block uppercase text-[10px]">Phone</span>
                <a href={`tel:${selectedLead.phone}`} className="text-steel-900 font-bold">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <span className="text-steel-500 block uppercase text-[10px]">Building / Facility</span>
                <span className="text-steel-900 font-bold">{selectedLead.buildingName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-steel-500 block uppercase text-[10px]">Property Type</span>
                <span className="text-steel-900 font-bold">{selectedLead.propertyType || 'N/A'}</span>
              </div>
              <div>
                <span className="text-steel-500 block uppercase text-[10px]">Elevator Count</span>
                <span className="text-steel-900 font-bold">{selectedLead.elevatorCount} Units</span>
              </div>
              <div>
                <span className="text-steel-500 block uppercase text-[10px]">Service Urgency</span>
                <span className="text-emergency-600 font-bold">{selectedLead.serviceUrgency || 'Standard'}</span>
              </div>
            </div>

            {selectedLead.address && (
              <div className="text-xs">
                <span className="text-steel-500 font-mono text-[10px] uppercase block">Location Address</span>
                <p className="text-steel-800 bg-steel-50 p-2.5 rounded-sm border border-steel-200 mt-1 font-mono">
                  {selectedLead.address}
                </p>
              </div>
            )}

            <div className="text-xs">
              <span className="text-steel-500 font-mono text-[10px] uppercase block">Client Message / Fault Description</span>
              <p className="text-steel-900 bg-white p-3 rounded-sm border border-steel-300 mt-1 leading-relaxed whitespace-pre-wrap">
                {selectedLead.message || 'No additional message provided.'}
              </p>
            </div>

            <div className="pt-3 border-t border-steel-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-steel-600">Update Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const newSt = e.target.value as Lead['status'];
                    handleStatusChange(selectedLead._id, newSt);
                    setSelectedLead({ ...selectedLead, status: newSt });
                  }}
                  className="font-mono text-xs font-bold border border-steel-300 rounded-sm px-2 py-1"
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="bg-steel-900 hover:bg-steel-800 text-white font-mono text-xs font-bold px-4 py-2 rounded-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
