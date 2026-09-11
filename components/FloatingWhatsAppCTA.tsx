'use client';

import React, { useState } from 'react';

export function FloatingWhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    import('../lib/analytics').then(({ trackPhoneClick }) => {
      trackPhoneClick({
        location: 'floating_whatsapp_always_on_screen',
        phoneNumber: '+91 90110 96990',
        contactMethod: 'whatsapp',
      });
    });
  };

  const whatsappUrl =
    'https://wa.me/919011096990?text=' +
    encodeURIComponent('Hello NSE, I need elevator service assistance.');

  return (
    <div
      className="fixed z-50 transition-all duration-300 bottom-20 right-4 sm:right-6 lg:bottom-6 lg:right-6 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with New Sahyadri Elevator on WhatsApp"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] border-2 border-white/20 transition-all duration-200 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        {/* Pulsing Beacon Ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* WhatsApp Official SVG Icon */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white transition-transform duration-200 group-hover:scale-110"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {/* Live Online Badge Dot */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white border border-[#25D366]" />
          </span>
        </div>

        {/* Text Label: Visible on desktop, subtle and professional */}
        <div className="hidden sm:flex flex-col text-left pr-1 leading-none">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/90">
            24/7 Fast Help
          </span>
          <span className="text-xs font-extrabold tracking-tight text-white mt-0.5">
            WhatsApp Us
          </span>
        </div>
      </a>

      {/* Floating Tooltip Callout on Desktop Hover */}
      <div
        className={`hidden lg:block absolute bottom-full right-0 mb-3 pointer-events-none transition-all duration-200 transform ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <div className="bg-slate-900 text-white text-[11px] font-mono py-1.5 px-3 rounded-md shadow-xl border border-slate-700 whitespace-nowrap flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Average response &lt; 5 mins • Pune &amp; Mumbai</span>
        </div>
      </div>
    </div>
  );
}
