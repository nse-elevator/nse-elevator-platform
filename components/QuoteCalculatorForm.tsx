'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  trackQuoteFormSubmit,
  trackQuoteStepViewed,
  trackQuoteStepAbandoned,
  trackPreciseLocation,
  getApproxLocation,
  getAnonymousId,
  getUrlAttribution,
} from '../lib/analytics';

interface FormDataState {
  buildingType: string;
  elevatorCount: number;
  equipmentType: string;
  serviceScope: string;
  buildingName: string;
  buildingAddress: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  preciseLocation?: {
    lat: number;
    lng: number;
    source: 'gps';
    consentedAt: Date;
  };
}

const buildingOptions = [
  { id: 'commercial', label: 'Commercial Office', icon: '🏢' },
  { id: 'residential', label: 'Residential High-Rise / HOA', icon: '🏙️' },
  { id: 'healthcare', label: 'Hospital / Healthcare', icon: '🏥' },
  { id: 'hospitality', label: 'Hotel / Hospitality', icon: '🏨' },
  { id: 'industrial', label: 'Warehouse / Freight', icon: '🏭' },
  { id: 'education', label: 'University / Campus', icon: '🏛️' },
];

const scopeOptions = [
  {
    id: 'maintenance',
    title: 'Preventive Maintenance Contract',
    desc: 'Scheduled monthly/quarterly maintenance to reduce downtime & ensure compliance.',
  },
  {
    id: 'repair',
    title: 'Emergency Breakdown / Repair',
    desc: 'Immediate dispatch or diagnostic troubleshooting on shutdown cars.',
  },
  {
    id: 'modernization',
    title: 'Elevator Modernization Survey',
    desc: 'Full system upgrade for aging controllers, door equipment, or cab interiors.',
  },
  {
    id: 'inspection',
    title: 'Mandated Code Testing & Violations',
    desc: 'Category 1 / Category 5 testing or resolving municipal violation notices.',
  },
];

interface QuoteCalculatorFormProps {
  embedded?: boolean;
}

export function QuoteCalculatorForm({ embedded = false }: QuoteCalculatorFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Funnel tracking refs
  const stepStartTime = useRef<number>(Date.now());
  const isCompleted = useRef<boolean>(false);
  const activeStep = useRef<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<FormDataState>({
    buildingType: 'commercial',
    elevatorCount: 2,
    equipmentType: 'traction',
    serviceScope: 'maintenance',
    buildingName: '',
    buildingAddress: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  // Track initial Step 1 view on mount
  useEffect(() => {
    trackQuoteStepViewed({ stepNumber: 1 });
    stepStartTime.current = Date.now();
    activeStep.current = 1;

    const handleAbandonment = () => {
      if (!isCompleted.current) {
        const duration = Date.now() - stepStartTime.current;
        if (duration > 1000) {
          trackQuoteStepAbandoned({
            stepNumber: activeStep.current,
            timeSpentMs: duration,
          });
        }
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        handleAbandonment();
      }
    };

    window.addEventListener('beforeunload', handleAbandonment);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('beforeunload', handleAbandonment);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return; // Fail gracefully
    }

    setDetectingLocation(true);
    setLocationSuccessMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // 1. Dispatch consented precise location telemetry
        trackPreciseLocation({
          lat: latitude,
          lng: longitude,
          context: 'quote_calculator_autofill',
        });

        // 2. Save precise coordinates on form state
        setFormData((prev) => ({
          ...prev,
          preciseLocation: {
            lat: latitude,
            lng: longitude,
            source: 'gps',
            consentedAt: new Date(),
          },
        }));

        // 3. Reverse geocode via OpenStreetMap Nominatim (Free, no API key required)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'NSE-Elevator-Platform/1.0 (office.pune@nsei.in)',
              },
            }
          );
          if (res.ok) {
            const geoData = await res.json();
            const addr = geoData.address || {};
            const parts = [
              addr.road || addr.suburb || addr.neighbourhood,
              addr.city_district || addr.city || addr.town || addr.county,
              addr.state,
              addr.postcode,
            ].filter(Boolean);
            const formatted = parts.length > 0 ? parts.join(', ') : geoData.display_name;
            if (formatted) {
              setFormData((prev) => ({
                ...prev,
                buildingAddress: formatted,
              }));
              setLocationSuccessMsg(`Detected: ${formatted}`);
            }
          }
        } catch {
          // Fallback to coordinates format if reverse geocoder fails
          const fallback = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          setFormData((prev) => ({
            ...prev,
            buildingAddress: prev.buildingAddress || fallback,
          }));
          setLocationSuccessMsg(`Captured: ${fallback}`);
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        // User denied or error: Fail silently without any disruptive modal
        setDetectingLocation(false);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  const updateField = (field: keyof FormDataState, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      const timeSpent = Date.now() - stepStartTime.current;
      const nextStep = (currentStep + 1) as 2 | 3;
      setCurrentStep(nextStep);
      activeStep.current = nextStep;
      stepStartTime.current = Date.now();
      trackQuoteStepViewed({ stepNumber: nextStep, timeSpentMs: timeSpent });
    } else {
      setSubmitting(true);
      try {
        const attr = getUrlAttribution();
        const anonymousId = getAnonymousId();
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiBase}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.contactName,
            email: formData.contactEmail,
            phone: formData.contactPhone,
            buildingName: formData.buildingName,
            address: formData.buildingAddress,
            propertyType: formData.buildingType,
            elevatorCount: formData.elevatorCount,
            serviceUrgency: formData.serviceScope,
            source: '/contact/request-maintenance-quote',
            gclid: attr.gclid,
            fbclid: attr.fbclid,
            anonymousId,
            approxLocation: getApproxLocation() || undefined,
            preciseLocation: formData.preciseLocation,
            utmParams: {
              source: attr.utmSource,
              medium: attr.utmMedium,
              campaign: attr.utmCampaign,
              term: attr.utmTerm,
              content: attr.utmContent,
            },
          }),
        });

        const data = await res.json().catch(() => ({}));
        const leadId = data?.data?.id;
        isCompleted.current = true;

        // Track conversion event via GTM and MongoDB pipeline
        trackQuoteFormSubmit({
          leadId,
          quoteType: formData.serviceScope,
          propertyType: formData.buildingType,
          elevatorCount: formData.elevatorCount,
          buildingName: formData.buildingName,
        });
      } catch (err) {
        isCompleted.current = true;
        // Still fire tracking even if network lead creation had an error
        trackQuoteFormSubmit({
          quoteType: formData.serviceScope,
          propertyType: formData.buildingType,
          elevatorCount: formData.elevatorCount,
          buildingName: formData.buildingName,
        });
      } finally {
        setSubmitting(false);
        setSubmitted(true);
      }
    }
  };

  const formContent = (
    <>
      {/* Mechanical Step Progress Track Indicator */}
      <div className="mb-8 pb-6 border-b border-slate-100">
            {/* Step Badges and Labels */}
            <div className="relative flex items-center justify-between z-10">
              {[1, 2, 3].map((step) => {
                const isCompleted = currentStep > step;
                const isCurrent = currentStep === step;

                return (
                  <div key={step} className="flex items-center gap-3 px-2">
                    <div
                      className={`w-9 h-9 rounded-md font-mono font-bold text-xs flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? 'bg-brand-orange text-white shadow-md ring-2 ring-brand-orange/40 scale-105'
                          : isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {isCompleted ? '✓' : `0${step}`}
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block leading-none">
                        Step 0{step}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold transition-colors duration-200 ${
                          isCurrent
                            ? 'text-slate-900'
                            : isCompleted
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {step === 1 && 'Facility Profile'}
                        {step === 2 && 'Service Scope'}
                        {step === 3 && 'Contact Details'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting Mechanical Track Rail & Animated Progress Fill */}
            <div className="relative w-full mt-5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-orange transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,92,0,0.6)]"
                style={{
                  width:
                    currentStep === 1
                      ? '15%'
                      : currentStep === 2
                      ? '55%'
                      : '100%',
                }}
              />
            </div>
          </div>

          {submitted ? (
            /* Submission Confirmation Screen */
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-900">Engineering Assessment Request Received</h3>
              <p className="text-sm text-slate-800 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.contactName || 'Facility Manager'}</strong>. Your request for <strong className="text-slate-900">{formData.elevatorCount} elevator unit(s)</strong> has been dispatched directly to our Regional Chief Estimator.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto text-xs font-mono text-slate-600">
                <span>Immediate Critical Issue? Call / WhatsApp: </span>
                <a href="tel:+919011096990" className="text-brand-orange font-bold hover:underline">
                  +91 90110 96990
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-8">
              {/* STEP 1: Building & Equipment Profile */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-3">
                      1. Select Facility Classification
                    </label>
                    <div className={`grid gap-2.5 sm:gap-3 ${embedded ? 'grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'}`}>
                      {buildingOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => updateField('buildingType', opt.id)}
                          className={`p-3 sm:p-3.5 rounded-lg border text-left flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer ${
                            formData.buildingType === opt.id
                              ? 'bg-orange-50 border-brand-orange text-brand-orange shadow-xs font-semibold ring-1 ring-brand-orange/30'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-900'
                          }`}
                        >
                          <span className="text-lg shrink-0">{opt.icon}</span>
                          <span className="text-xs font-bold leading-tight">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Elevator Stepper */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Total Number of Elevator Units:
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateField('elevatorCount', Math.max(1, formData.elevatorCount - 1))}
                          className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-lg rounded-md border border-slate-300 shadow-sm transition-all"
                        >
                          -
                        </button>
                        <span className="w-16 text-center font-mono font-bold text-lg text-slate-900">
                          {formData.elevatorCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateField('elevatorCount', formData.elevatorCount + 1)}
                          className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-lg rounded-md border border-slate-300 shadow-sm transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Equipment Drive Type:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['traction', 'hydraulic', 'freight', 'unknown'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => updateField('equipmentType', type)}
                            className={`px-3.5 py-2 text-xs font-mono rounded-md border capitalize transition-all ${
                              formData.equipmentType === type
                                ? 'bg-brand-orange border-brand-orange text-white font-bold shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-900'
                            }`}
                          >
                            {type === 'unknown' ? 'Not Sure / Need Audit' : type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Service Scope & Urgency */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                    2. Select Primary Service Requirement
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {scopeOptions.map((scope) => (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => updateField('serviceScope', scope.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.serviceScope === scope.id
                            ? 'bg-orange-50 border-brand-orange shadow-xs ring-1 ring-brand-orange/30'
                            : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <h4 className="font-bold text-sm text-slate-900">{scope.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed text-justify">{scope.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Contact & Building Info */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                    3. Building &amp; Property Contact Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Building or Property Name</label>
                      <input
                        type="text"
                        required
                        autoComplete="organization"
                        value={formData.buildingName}
                        onChange={(e) => updateField('buildingName', e.target.value)}
                        placeholder="e.g. Sunrise Heights CHS or Millennium IT Park"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-sm"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-slate-600">Street Address &amp; City</label>
                        <button
                          type="button"
                          onClick={handleUseCurrentLocation}
                          disabled={detectingLocation}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-brand-orange hover:text-brand-orange-dark disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          {detectingLocation ? (
                            <span className="inline-flex items-center gap-1">
                              <span className="animate-spin inline-block w-2.5 h-2.5 border-b-2 border-brand-orange rounded-full" />
                              <span>Detecting...</span>
                            </span>
                          ) : (
                            <span>📍 Use Current Location</span>
                          )}
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        autoComplete="street-address"
                        value={formData.buildingAddress}
                        onChange={(e) => updateField('buildingAddress', e.target.value)}
                        placeholder="e.g. Sector 8, Airoli, Navi Mumbai – 400708"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-sm"
                      />
                      <p className="text-[10px] text-slate-500 font-mono mt-1 leading-tight">
                        🔒 Precise GPS location is accessed only with your permission to auto-fill your building address and calculate nearest engineer dispatch distance under our{' '}
                        <Link href="/privacy" prefetch={true} className="text-brand-orange underline hover:text-brand-orange-dark">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                      {locationSuccessMsg && (
                        <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                          <span>✓</span>
                          <span>{locationSuccessMsg}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Your Full Name &amp; Title</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.contactName}
                        onChange={(e) => updateField('contactName', e.target.value)}
                        placeholder="e.g. Rajesh Patil, Chairman"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Direct Phone Number</label>
                      <input
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.contactPhone}
                        onChange={(e) => updateField('contactPhone', e.target.value)}
                        placeholder="e.g. +91 98200 12345"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange font-mono shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Work Email Address</label>
                    <input
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      placeholder="e.g. committee@sunrisetowers.in"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3.5 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Stepper Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2)}
                    className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-md border border-slate-300 shadow-sm transition-all text-center cursor-pointer"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-base sm:text-sm rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{currentStep === 3 ? 'Generate Service Proposal' : 'Continue to Next Step'}</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}
    </>
  );

  if (embedded) {
    return <div className="w-full text-slate-800 pt-2">{formContent}</div>;
  }

  return (
    <section 
      aria-labelledby="quote-calculator-title"
      className="w-full bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange bg-brand-orange/10 border border-brand-orange/30 px-3.5 py-1.5 rounded-full inline-block">
            Instant Engineering Lead Portal
          </span>
          <h2 id="quote-calculator-title" className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 tracking-tight">
            Request a Commercial Elevator Service Proposal
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Complete this 3-step technical assessment for a non-proprietary proposal tailored to your facility within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div data-card-unit className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 sm:p-10 text-slate-800">
          {formContent}
        </div>
      </div>
    </section>
  );
}
