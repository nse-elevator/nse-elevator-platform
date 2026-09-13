'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackPreciseLocation } from '../lib/analytics';
import { AnimatedCounter } from './AnimatedCounter';

interface MetroRegion {
  id: string;
  name: string;
  stateCode: string;
  hqAddress: string;
  phone: string;
  avgResponseMins: number;
  coveredCounties: string[];
  serviceCoverage: string;
  operationsNote: string;
  lat: number;
  lng: number;
}

const metroRegions: MetroRegion[] = [
  {
    id: 'navi-mumbai',
    name: 'Navi Mumbai Headquarters',
    stateCode: 'MH',
    hqAddress: 'Airoli, Navi Mumbai, Maharashtra',
    phone: '+91 90499 94679',
    avgResponseMins: 30,
    coveredCounties: ['Airoli', 'Vashi', 'Kopar Khairane', 'Ghansoli', 'Mahape MIDC', 'CBD Belapur', 'Panvel'],
    serviceCoverage: '7 Key Suburbs & Industrial Corridors',
    operationsNote: 'Central Rapid Response Dispatch Hub',
    lat: 19.1557,
    lng: 72.9986,
  },
  {
    id: 'pune',
    name: 'Pune Operations Hub',
    stateCode: 'MH',
    hqAddress: 'Pune, Maharashtra',
    phone: '+91 90499 94679',
    avgResponseMins: 30,
    coveredCounties: [
      'Pune City',
      'Ravet',
      'Punavale',
      'Tathawade',
      'Baner',
      'Pashan',
      'Wakad',
      'Mamurdi',
      'Hinjewadi',
      'Marunji',
      'Nere',
      'Chinchwad',
    ],
    serviceCoverage: 'PCMC & Hinjewadi IT Corridors',
    operationsNote: '15+ Certified Field Engineers Stationed Locally',
    lat: 18.4529,
    lng: 73.8553,
  },
];

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function LocalCoverageMap() {
  const [selectedMetro, setSelectedMetro] = useState<MetroRegion>(metroRegions[0]);
  const [calculatingDistance, setCalculatingDistance] = useState(false);
  const [distanceResult, setDistanceResult] = useState<{
    nearestHub: string;
    distanceKm: number;
    arrivalEstimate: string;
  } | null>(null);

  const radarRef = useRef<HTMLDivElement>(null);
  const [isRadarInView, setIsRadarInView] = useState(false);
  const [ringsDrawn, setRingsDrawn] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsRadarInView(true);
      setRingsDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsRadarInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setRingsDrawn(true);
        }
      },
      { threshold: 0.15 }
    );

    if (radarRef.current) {
      observer.observe(radarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCheckDistance = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return;
    }

    setCalculatingDistance(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // 1. Dispatch consented precise location event
        trackPreciseLocation({
          lat: latitude,
          lng: longitude,
          context: 'locations_distance_checker',
        });

        // 2. Calculate distance to both hubs
        const distNavi = haversineDistanceKm(latitude, longitude, metroRegions[0].lat, metroRegions[0].lng);
        const distPune = haversineDistanceKm(latitude, longitude, metroRegions[1].lat, metroRegions[1].lng);

        if (distNavi <= distPune) {
          setSelectedMetro(metroRegions[0]);
          setDistanceResult({
            nearestHub: 'Navi Mumbai Hub (Airoli HQ)',
            distanceKm: distNavi,
            arrivalEstimate: 'Priority Dispatch Active',
          });
        } else {
          setSelectedMetro(metroRegions[1]);
          setDistanceResult({
            nearestHub: 'Pune Operations Hub',
            distanceKm: distPune,
            arrivalEstimate: 'Priority Dispatch Active',
          });
        }
        setCalculatingDistance(false);
      },
      () => {
        // User denied or error: fail silently with zero popup disruption
        setCalculatingDistance(false);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  return (
    <section 
      aria-labelledby="coverage-heading"
      className="w-full bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block">
              Operational Corridors &amp; Service Hubs
            </span>
            <h2 id="coverage-heading" className="text-2xl sm:text-3xl lg:text-h2 font-extrabold text-slate-900 mt-2 tracking-tight">
              Rapid Response Service Hubs in Navi Mumbai &amp; Pune
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              15+ certified engineers stationed across Navi Mumbai and Pune for prompt emergency dispatch and preventative care.
            </p>
          </div>

          {/* Metro Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {metroRegions.map((metro) => (
              <button
                key={metro.id}
                type="button"
                onClick={() => setSelectedMetro(metro)}
                className={`px-4 py-2 min-h-[44px] text-xs font-mono font-bold rounded-lg border transition-all focus-ring flex items-center justify-center cursor-pointer ${
                  selectedMetro.id === metro.id
                    ? 'bg-brand-orange border-brand-orange text-white shadow-sm'
                    : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400'
                }`}
              >
                {metro.name.split(' ')[0]} ({metro.stateCode})
              </button>
            ))}
          </div>
        </div>

        {/* Split Grid: Map View & Field Hub Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Radar & Response Radius Graphic */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-md">
            {/* Background Map Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-slate-900 uppercase font-bold">
                  {selectedMetro.name} Dispatch Radar
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Dispatch Status: <strong className="text-slate-900">24/7 Rapid Response</strong>
              </span>
            </div>

            {/* Tactical Vector Radar Map Graphic */}
            <div ref={radarRef} className="relative z-10 my-4 py-4 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 min-[360px]:w-72 min-[360px]:h-72 sm:w-80 sm:h-80 max-w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full overflow-visible select-none"
                  aria-label={`${selectedMetro.name} Tactical Dispatch Radar and Coverage Zones`}
                >
                  <defs>
                    {/* Radar Sweep Gradient */}
                    <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff5c00" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#ff5c00" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#ff5c00" stopOpacity="0" />
                    </linearGradient>

                    {/* Outer glow filter for hub beacon */}
                    <filter id="hubGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Tactical Grid & Compass Crosshairs */}
                  <line x1="20" y1="150" x2="280" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="150" y1="20" x2="150" y2="280" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="60" y1="60" x2="240" y2="240" stroke="#e2e8f0" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.7" />
                  <line x1="240" y1="60" x2="60" y2="240" stroke="#e2e8f0" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.7" />

                  {/* Concentric Response Zone Rings with Self-Drawing Stroke-Dashoffset */}
                  {/* Zone 3: Outer Metro Ring (r=130, circumference ~817) */}
                  <circle
                    cx="150"
                    cy="150"
                    r="130"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                    strokeDasharray="817"
                    strokeDashoffset={ringsDrawn ? 0 : 817}
                    style={{ transition: 'stroke-dashoffset 1200ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />

                  {/* Zone 2: Sub-Urban Corridor Ring (r=95, circumference ~597) */}
                  <circle
                    cx="150"
                    cy="150"
                    r="95"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="597"
                    strokeDashoffset={ringsDrawn ? 0 : 597}
                    style={{ transition: 'stroke-dashoffset 1200ms cubic-bezier(0.16, 1, 0.3, 1) 150ms' }}
                  />

                  {/* Zone 1: Core Hub Service Area Ring (r=60, circumference ~377) */}
                  <circle
                    cx="150"
                    cy="150"
                    r="60"
                    fill="rgba(255, 92, 0, 0.05)"
                    stroke="#ff5c00"
                    strokeWidth="1.75"
                    strokeDasharray="377"
                    strokeDashoffset={ringsDrawn ? 0 : 377}
                    style={{ transition: 'stroke-dashoffset 1200ms cubic-bezier(0.16, 1, 0.3, 1) 300ms' }}
                  />

                  {/* Radiating Radar Ripple Pulse Waves (paused when off-screen) */}
                  <circle
                    cx="150"
                    cy="150"
                    r="130"
                    fill="none"
                    stroke="#ff5c00"
                    className={`radar-pulse-wave-1 ${isRadarInView ? '' : 'radar-paused'}`}
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="130"
                    fill="none"
                    stroke="#ff5c00"
                    className={`radar-pulse-wave-2 ${isRadarInView ? '' : 'radar-paused'}`}
                  />

                  {/* 360° Rotating Radar Sweep Scanner (paused when off-screen) */}
                  <g className={`radar-sweep-scanner ${isRadarInView ? '' : 'radar-paused'}`}>
                    {/* Sweep Sector Wedge (45-degree angle) */}
                    <path
                      d="M 150 150 L 150 20 A 130 130 0 0 1 242 58 Z"
                      fill="url(#radarSweepGrad)"
                    />
                    {/* Leading Scanner Ray */}
                    <line
                      x1="150"
                      y1="150"
                      x2="150"
                      y2="20"
                      stroke="#ff5c00"
                      strokeWidth="1.75"
                      opacity="0.9"
                    />
                  </g>

                  {/* Radar Technical Coordinates & Scale Annotations */}
                  <text x="150" y="14" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="monospace" letterSpacing="0.05em">
                    METROPOLITAN COVERAGE BOUNDARY (25 KM)
                  </text>
                  <text x="150" y="82" textAnchor="middle" fill="#ff5c00" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    CORE HUB SERVICE AREA
                  </text>
                  <text x="282" y="146" textAnchor="end" fill="#64748b" fontSize="7" fontFamily="monospace">
                    RADAR ACTIVE
                  </text>
                  <text x="18" y="146" textAnchor="start" fill="#64748b" fontSize="7" fontFamily="monospace">
                    GPS TRACKED
                  </text>

                  {/* Central Hub Marker & Beacon */}
                  <g className={`radar-beacon ${isRadarInView ? '' : 'radar-paused'}`} filter="url(#hubGlow)">
                    <circle cx="150" cy="150" r="14" fill="#ff5c00" opacity="0.3" />
                    <circle cx="150" cy="150" r="8" fill="#ff5c00" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="150" cy="150" r="3" fill="#ffffff" />
                  </g>
                </svg>
              </div>
              <p className="text-xs text-slate-500 text-center font-mono mt-2">
                Mobile Field Technicians Positioned for High-Rise Societies &amp; IT Hubs
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-slate-200 text-center">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Emergency Response</span>
                <span className="text-base font-mono font-bold text-brand-orange">24/7 Rapid</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Lifts Under Care</span>
                <span className="text-base font-mono font-bold text-emerald-700">
                  <AnimatedCounter target={350} suffix="+ Units" />
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Availability</span>
                <span className="text-base font-mono font-bold text-slate-900">24/7/365</span>
              </div>
            </div>

            {/* Interactive Hub Proximity Calculator */}
            <div className="relative z-10 pt-4 mt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCheckDistance}
                disabled={calculatingDistance}
                className="w-full min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 hover:border-brand-orange py-2.5 px-4 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {calculatingDistance ? (
                  <span className="flex items-center gap-2 text-brand-orange">
                    <span className="animate-spin inline-block w-3 h-3 border-b-2 border-brand-orange rounded-full" />
                    <span>Locating Nearest Engineer Dispatch Hub...</span>
                  </span>
                ) : (
                  <span>📍 Check My Distance to Nearest Service Hub</span>
                )}
              </button>
              <p className="text-[10px] text-slate-500 font-mono mt-1.5 text-center leading-tight">
                🔒 Precise GPS location is accessed only with your permission to calculate your distance to our nearest Navi Mumbai or Pune service hub under our{' '}
                <Link href="/privacy" prefetch={true} className="text-brand-orange underline hover:text-brand-orange-dark">
                  Privacy Policy
                </Link>
                .
              </p>
              {distanceResult && (
                <div className="mt-3 p-3 bg-orange-50/70 border border-brand-orange/30 rounded-lg text-center">
                  <p className="text-xs font-mono text-slate-900">
                    Nearest Operations Hub: <strong className="text-brand-orange">{distanceResult.nearestHub}</strong>
                  </p>
                  <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                    Calculated Distance: <strong className="text-slate-900">{distanceResult.distanceKm} km</strong> • Dispatch SLA:{' '}
                    <strong className="text-emerald-700">{distanceResult.arrivalEstimate}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Local Branch Details & Contact */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-mono font-bold text-slate-700 uppercase">
                  Verified Local Hub Office
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {selectedMetro.name}
              </h3>

              <div className="space-y-4 mt-6 text-xs">
                <div>
                  <span className="text-slate-500 font-mono uppercase block text-[10px]">Office Location:</span>
                  {selectedMetro.id === 'pune' ? (
                    <div className="mt-1.5 p-2.5 bg-orange-50/80 border border-brand-orange/30 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs">📍</span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded">
                          Pune Operations Hub
                        </span>
                      </div>
                      <p className="text-slate-900 font-semibold text-xs leading-snug">
                        Pune Regional Operations Depot, Pune, Maharashtra
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-800 font-medium mt-0.5">{selectedMetro.hqAddress}</p>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 font-mono uppercase block text-[10px]">Emergency Hotline &amp; WhatsApp:</span>
                  <a href={`tel:${selectedMetro.phone.replace(/[^0-9+]/g, '')}`} className="text-base font-mono font-bold text-brand-orange hover:text-brand-orange-dark transition-colors block mt-0.5">
                    {selectedMetro.phone}
                  </a>
                </div>

                <div>
                  <span className="text-slate-500 font-mono uppercase block text-[10px]">Operations &amp; Dispatch:</span>
                  <p className="text-slate-800 font-mono mt-0.5">{selectedMetro.operationsNote}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{selectedMetro.serviceCoverage}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-mono uppercase block text-[10px]">Key Local Service Corridors:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedMetro.coveredCounties.map((county, idx) => (
                      <span key={idx} className="bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] text-slate-700 rounded-md font-mono">
                        {county}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <a
                href={`/locations/elevator-repair-${selectedMetro.id}`}
                className="w-full min-h-[44px] flex items-center justify-center text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold py-2.5 px-4 rounded-lg text-xs border border-slate-300 focus-ring transition-all"
              >
                View Hub Details →
              </a>
              <a
                href={`tel:${selectedMetro.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full min-h-[44px] flex items-center justify-center text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-mono font-bold py-2.5 px-4 rounded-lg text-xs focus-ring transition-all shadow-md"
              >
                Call Dispatch Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
