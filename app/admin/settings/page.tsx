'use client';

import React, { useEffect, useState } from 'react';

interface SiteSettings {
  companyName: string;
  brandName: string;
  contactPhone: string;
  whatsappNumber: string;
  dispatchEmail: string;
  emergencyBannerText: string;
  emergencyResponseWindow: string;
  headOfficeAddress: string;
  puneBranch1Address: string;
  businessHours: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: 'NSE – New Sahyadri Elevator',
    brandName: 'NSE SMART',
    contactPhone: '+91 90499 94679',
    whatsappNumber: '+91 90499 94679',
    dispatchEmail: 'office.pune@nsei.in',
    emergencyBannerText: 'NSE 24/7 Breakdown Dispatch • Rapid Emergency Response Across Corridors',
    emergencyResponseWindow: '24/7 Rapid Response',
    headOfficeAddress: 'Airoli, Navi Mumbai, Maharashtra',
    puneBranch1Address: 'Pune Regional Operations Depot, Pune, Maharashtra – 411046',
    businessHours: '24/7 Emergency Dispatch • Office Mon–Sat 9:00 AM – 7:00 PM',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      })
      .catch((err) => console.error('Failed to load settings:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('Settings updated successfully!');
      } else {
        setErrorMsg(data.error?.message || 'Failed to update settings');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with server');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center font-mono text-xs text-steel-500 animate-pulse">
        Loading site configuration &amp; dispatch parameters...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-steel-200 pb-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emergency-500 block">
          Platform Configuration
        </span>
        <h1 className="text-2xl font-extrabold text-steel-950 tracking-tight">
          Site Settings &amp; Emergency Dispatch Parameters
        </h1>
        <p className="text-xs text-steel-500 mt-1">
          Global company metadata, emergency response banner copy, phone numbers, and registered office locations.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-safety-500/10 border border-safety-500/30 text-safety-700 text-xs rounded-sm font-mono flex items-center justify-between">
          <span>✓ {successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-steel-400 hover:text-steel-600">✕</button>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-emergency-500/10 border border-emergency-500/30 text-emergency-600 text-xs rounded-sm font-mono flex items-center justify-between">
          <span>✕ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-steel-400 hover:text-steel-600">✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Corporate Identity */}
        <div className="bg-white border border-steel-300 rounded-sm p-6 shadow-milled space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-steel-900 border-b border-steel-200 pb-2">
            Corporate &amp; Brand Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Legal Company Name
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Public Brand Name
              </label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>
          </div>
        </div>

        {/* Dispatch & Communications */}
        <div className="bg-white border border-steel-300 rounded-sm p-6 shadow-milled space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-steel-900 border-b border-steel-200 pb-2">
            Emergency Dispatch &amp; Contact Numbers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Primary Phone &amp; Emergency Helpline
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 font-mono focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                WhatsApp Dispatch Line
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 font-mono focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Official Operations Email
              </label>
              <input
                type="email"
                value={settings.dispatchEmail}
                onChange={(e) => setSettings({ ...settings, dispatchEmail: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 font-mono focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Emergency Response Window SLA
              </label>
              <input
                type="text"
                value={settings.emergencyResponseWindow}
                onChange={(e) => setSettings({ ...settings, emergencyResponseWindow: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 font-mono focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
              Top Global Emergency Banner Text
            </label>
            <input
              type="text"
              value={settings.emergencyBannerText}
              onChange={(e) => setSettings({ ...settings, emergencyBannerText: e.target.value })}
              className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500"
            />
          </div>
        </div>

        {/* Physical Office Locations */}
        <div className="bg-white border border-steel-300 rounded-sm p-6 shadow-milled space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-steel-900 border-b border-steel-200 pb-2">
            Registered Office Locations (Navi Mumbai &amp; Pune)
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Head Office (Airoli, Navi Mumbai)
              </label>
              <input
                type="text"
                value={settings.headOfficeAddress}
                onChange={(e) => setSettings({ ...settings, headOfficeAddress: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-steel-700 mb-1">
                Pune Regional Operations Hub (Pune, Maharashtra)
              </label>
              <input
                type="text"
                value={settings.puneBranch1Address}
                onChange={(e) => setSettings({ ...settings, puneBranch1Address: e.target.value })}
                className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-emergency-500 hover:bg-emergency-600 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-sm transition-all shadow-sm flex items-center gap-2"
          >
            {saving ? <span>Updating Settings...</span> : <span>Save All Settings</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
