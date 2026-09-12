'use client';

import React from 'react';

export function StickyMobileCTA() {
  const handleCallClick = () => {
    import('../lib/analytics').then(({ trackPhoneClick, trackEmergencyCtaClick }) => {
      trackPhoneClick({
        location: 'sticky_mobile_cta',
        phoneNumber: '+91 90499 94679',
        contactMethod: 'phone',
      });
      trackEmergencyCtaClick({
        source: 'sticky_mobile_cta',
        action: 'direct_call',
      });
    });
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined') {
      const isHome = window.location.pathname === '/' || window.location.pathname === '';
      if (isHome) {
        e.preventDefault();
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '#contact');
          }
        }
      }
    }
  };

  return (
    <aside 
      aria-label="Mobile Quick Action Bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] lg:hidden shadow-lg"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        {/* Left CTA: 24/7 Emergency Dispatch Direct Phone */}
        <a
          id="sticky-mobile-call-btn"
          href="tel:+919049994679"
          onClick={handleCallClick}
          className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark active:scale-[0.98] text-white h-12 rounded-lg font-bold text-xs sm:text-sm font-mono tracking-wide transition-all shadow-md cursor-pointer"
        >
          <svg 
            className="w-4 h-4 shrink-0 animate-pulse" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>CALL / DISPATCH</span>
        </a>

        {/* Right CTA: Fast Maintenance Quote */}
        <a
          href="/contact/request-maintenance-quote"
          onClick={handleQuoteClick}
          className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 border border-slate-300 h-12 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
        >
          <svg 
            className="w-4 h-4 shrink-0 text-brand-orange" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>GET AMC QUOTE</span>
        </a>
      </div>
    </aside>
  );
}
