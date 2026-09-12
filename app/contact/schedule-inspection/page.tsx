'use client';

import React, { useState } from 'react';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';

export default function ScheduleInspectionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    inspectionType: 'cat1',
    buildingName: '',
    address: '',
    city: '',
    state: 'IL',
    elevatorCount: '2',
    preferredDate: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    violationNotice: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen">
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-12 sm:py-16 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Comprehensive Safety Inspection &amp; Health Audit
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Schedule an Elevator Safety Inspection or Health Audit
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Coordinate experienced elevator engineers for a comprehensive multi-point safety examination across Navi Mumbai &amp; Pune.
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-card-unit className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-safety-500/10 border border-safety-500 text-safety-600 rounded-sm flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h2 className="text-xl font-bold text-steel-950">Inspection Request Scheduled</h2>
              <p className="text-sm text-steel-600 max-w-md mx-auto leading-relaxed">
                Our Chief Code Compliance Officer has received your request for <strong className="text-steel-950">{formData.buildingName}</strong>. We will confirm test weight logistics and inspector coordination within 4 business hours.
              </p>
              <div className="p-4 bg-steel-100 border border-steel-200 rounded-sm text-xs font-mono text-steel-700 max-w-md mx-auto">
                Need emergency violation clearance? Call direct: +91 90499 94679
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-steel-700 mb-2">
                  1. Inspection Category / Requirement
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'cat1', label: 'Category 1 Annual', desc: 'No-load periodic test' },
                    { id: 'cat5', label: 'Category 5 Full-Load', desc: '5-Year rated load test' },
                    { id: 'violation', label: 'Violation Clearance', desc: 'Remediate city citation' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, inspectionType: item.id })}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        formData.inspectionType === item.id
                          ? 'bg-orange-50 border-brand-orange text-brand-orange shadow-xs font-semibold ring-1 ring-brand-orange/30'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold block">{item.label}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Building or Facility Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. City Center Tower"
                    value={formData.buildingName}
                    onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sector 18, Vashi"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navi Mumbai or Pune"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-xs"
                  >
                    <option value="MH">Maharashtra</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Contact Name &amp; Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Patil, Society Secretary"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Direct Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98200 12345"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange font-mono shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. committee@sunrisetowers.in"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full border border-slate-300 bg-slate-50 focus:bg-white rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3.5 rounded-lg text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                Schedule Code Compliance Inspection →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
