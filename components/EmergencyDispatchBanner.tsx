'use client';

import React from 'react';
import { trackPhoneClick, trackEmergencyCtaClick } from '../lib/analytics';

export function EmergencyDispatchBanner() {
  const handleClick = () => {
    trackPhoneClick({
      location: 'top_emergency_banner',
      phoneNumber: '+91 90499 94679',
      contactMethod: 'phone',
    });
    trackEmergencyCtaClick({
      source: 'top_emergency_banner',
      action: 'direct_call',
    });
  };

  return (
    <aside 
      aria-label="Emergency Elevator Dispatch Alert" 
      className="w-full bg-steel-950 text-steel-200 border-b border-steel-800 text-xs py-2 px-4 select-none relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Pulsing Status Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emergency-500" />
          </span>
          <span className="font-mono uppercase font-bold tracking-wider text-white text-[11px] sm:text-xs">
            24/7 Lift Breakdown Dispatch
          </span>
        </div>

        {/* Center: Response Time Guarantee (Desktop only) */}
        <div className="hidden md:flex items-center gap-2 text-steel-300 text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-safety-500" aria-hidden="true" />
          <span>Emergency Dispatch: <strong className="text-white font-mono">24/7 Rapid Response</strong></span>
          <span className="text-steel-600">|</span>
          <span className="text-steel-400">Navi Mumbai • Pune (Dattanagar)</span>
          <span className="text-steel-600">|</span>
          <span className="text-safety-400 font-mono text-[11px]">Rapid Response Dispatch</span>
        </div>

        {/* Right: Direct Dial Emergency Button */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            id="emergency-banner-call-btn"
            href="tel:+919049994679"
            onClick={handleClick}
            className="bg-emergency-500 hover:bg-emergency-600 active:scale-[0.98] text-white font-bold px-3 py-1.5 rounded-sm focus-ring flex items-center gap-1.5 transition-all text-xs font-mono"
            aria-label="Call Emergency Dispatch +91 90499 94679"
          >
            <svg 
              className="w-3.5 h-3.5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+91 90499 94679</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
