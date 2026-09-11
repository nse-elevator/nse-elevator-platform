'use client';

import React, { useState } from 'react';

interface BrandCapability {
  brand: string;
  tagline: string;
  modelsSupported: string;
  amcCapability: string;
  breakdownResponse: string;
  sparesAvailability: string;
  costAdvantage: string;
}

const brandData: BrandCapability[] = [
  {
    brand: 'Schindler',
    tagline: 'Schindler India Series',
    modelsSupported: 'Schindler 3100, 3300 AP, 5500, Smart MRL & Micronic controllers',
    amcCapability: 'Comprehensive & Non-Comprehensive AMC with monthly preventative service',
    breakdownResponse: 'Rapid 24/7 emergency response; OEM-grade diagnostic tools & testing',
    sparesAvailability: '100% Genuine OEM drives, door rollers, VF contacts & PCBs',
    costAdvantage: 'Approx. 30% lower annual maintenance cost vs direct OEM contract',
  },
  {
    brand: 'KONE',
    tagline: 'KONE India Systems',
    modelsSupported: 'MonoSpace, TranSys, MiniSpace, EcoDisc motors & LCE controllers',
    amcCapability: 'Complete mechanical & electronic AMC maintenance packages',
    breakdownResponse: 'Certified technicians on 24/7 call across Navi Mumbai & Pune corridors',
    sparesAvailability: 'Original KONE guide shoes, brake pads, door operators & encoders',
    costAdvantage: 'Transparent pricing with no unexpected diagnostic or service surcharges',
  },
  {
    brand: 'OTIS',
    tagline: 'OTIS India Lifts',
    modelsSupported: 'Gen2 series, 2000VF, SkyRise, SPEC60, flat polyurethane steel belts',
    amcCapability: 'Preventative vibration analysis, belt pulse monitoring & regular lubrication',
    breakdownResponse: 'Immediate dispatch for door interlock failures, sensor drift & stoppages',
    sparesAvailability: 'Original OTIS RBI belt inspection, guide rails, pushbuttons & interlocks',
    costAdvantage: 'OEM-grade engineering precision at ~30% lower than typical OEM quote',
  },
  {
    brand: 'Johnson Lifts',
    tagline: 'Johnson Lifts India',
    modelsSupported: 'Standard passenger gearless, hydraulic lifts, commercial freight & bed lifts',
    amcCapability: 'Annual contracts tailored for residential societies, hospitals & commercial hubs',
    breakdownResponse: 'Dedicated field engineers with deep familiarity with Johnson hardware',
    sparesAvailability: 'Full local inventory of Johnson power packs, valves, ropes & car frames',
    costAdvantage: 'Flexible society billing with transparent ledger reporting',
  },
  {
    brand: 'thyssenkrupp / TKE',
    tagline: 'TKE India Elevators',
    modelsSupported: 'synergy, evolution, meta100, TAC50/TAC32 microprocessor controllers',
    amcCapability: 'Full lifecycle maintenance, drive diagnostics & code compliance verification',
    breakdownResponse: 'Trained high-rise specialists equipped with full safety lockout gear',
    sparesAvailability: 'Factory-grade TKE safety gear, governor assemblies & door clutches',
    costAdvantage: 'Up to 30% annual savings with dedicated local engineer assigned to site',
  },
];

export function MultiBrandExpertiseTable() {
  const [activeBrand, setActiveBrand] = useState<string>('Schindler');

  const selectedData = brandData.find((b) => b.brand === activeBrand) || brandData[0];

  return (
    <section 
      aria-labelledby="multibrand-heading"
      className="w-full bg-surface-50 py-16 sm:py-24 border-b border-steel-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergency-500 bg-emergency-500/10 border border-emergency-500/20 px-3 py-1 rounded-sm">
            Multi-Brand Engineering Capability
          </span>
          <h2 id="multibrand-heading" className="text-2xl sm:text-3xl lg:text-h2 font-extrabold text-steel-950 mt-4 tracking-tight">
            One Trusted Partner for Every Major Elevator Brand
          </h2>
          <p className="text-steel-600 text-sm sm:text-base mt-3 leading-relaxed">
            Whether your society or commercial complex operates Schindler, KONE, OTIS, Johnson, or thyssenkrupp elevators, NSE provides OEM-grade maintenance precision with genuine spare parts — at approximately 30% lower cost than going direct.
          </p>
        </div>

        {/* Value Proposition Callout Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-steel-900 text-white p-6 rounded-sm shadow-machined-card border border-steel-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-sm bg-safety-500/20 border border-safety-500/30 text-safety-400 font-bold flex items-center justify-center shrink-0">
              ✓
            </span>
            <div>
              <span className="text-xs font-bold block">100% Genuine OEM Spares</span>
              <span className="text-[11px] text-steel-400">Authentic manufacturer parts for all 5 brands</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-steel-800 pt-3 sm:pt-0 sm:pl-4">
            <span className="w-8 h-8 rounded-sm bg-emergency-500/20 border border-emergency-500/30 text-emergency-400 font-bold flex items-center justify-center shrink-0">
              ⚡
            </span>
            <div>
              <span className="text-xs font-bold block">Rapid Emergency Response</span>
              <span className="text-[11px] text-steel-400">Rapid dispatch across Navi Mumbai &amp; Pune</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-steel-800 pt-3 sm:pt-0 sm:pl-4">
            <span className="w-8 h-8 rounded-sm bg-caution-500/20 border border-caution-500/30 text-caution-400 font-bold flex items-center justify-center shrink-0">
              ₹
            </span>
            <div>
              <span className="text-xs font-bold block">~30% Annual Cost Savings</span>
              <span className="text-[11px] text-steel-400">Transparent billing without OEM monopolistic markups</span>
            </div>
          </div>
        </div>

        {/* Mobile View: Brand Tabs + Card */}
        <div className="md:hidden space-y-4">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {brandData.map((b) => (
              <button
                key={b.brand}
                type="button"
                onClick={() => setActiveBrand(b.brand)}
                className={`px-4 py-2 text-xs font-bold font-mono rounded-sm shrink-0 transition-all ${
                  activeBrand === b.brand
                    ? 'bg-steel-900 text-white shadow-milled'
                    : 'bg-white text-steel-700 border border-steel-300'
                }`}
              >
                {b.brand}
              </button>
            ))}
          </div>

          <div className="bg-white border border-steel-300 p-6 rounded-sm shadow-milled space-y-4 text-xs">
            <div className="border-b border-steel-200 pb-3">
              <span className="text-[10px] font-mono text-steel-500 uppercase block font-bold">Brand Focus</span>
              <h3 className="text-base font-bold text-steel-950 mt-0.5">{selectedData.brand}</h3>
              <p className="text-steel-600 mt-1 font-mono text-[11px]">{selectedData.modelsSupported}</p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-bold text-steel-900 block font-mono text-[11px] uppercase text-steel-500">
                  AMC Service Program:
                </span>
                <p className="text-steel-700 mt-0.5">{selectedData.amcCapability}</p>
              </div>

              <div>
                <span className="font-bold text-steel-900 block font-mono text-[11px] uppercase text-steel-500">
                  Breakdown SLA:
                </span>
                <p className="text-steel-700 mt-0.5">{selectedData.breakdownResponse}</p>
              </div>

              <div>
                <span className="font-bold text-steel-900 block font-mono text-[11px] uppercase text-steel-500">
                  Genuine Spares:
                </span>
                <p className="text-safety-600 font-medium mt-0.5">{selectedData.sparesAvailability}</p>
              </div>

              <div>
                <span className="font-bold text-steel-900 block font-mono text-[11px] uppercase text-steel-500">
                  Cost Efficiency:
                </span>
                <p className="text-emergency-600 font-bold mt-0.5">{selectedData.costAdvantage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Comprehensive Table */}
        <div className="hidden md:block overflow-hidden bg-white border border-steel-300 rounded-sm shadow-machined-card">
          <table className="w-full text-left border-collapse" aria-label="Multi-Brand Elevator Maintenance Capabilities">
            <thead>
              <tr className="border-b border-steel-300 bg-steel-100">
                <th scope="col" className="w-1/6 p-4 text-steel-900 font-mono text-xs uppercase font-bold tracking-wider">
                  Elevator Brand
                </th>
                <th scope="col" className="w-1/4 p-4 text-steel-900 font-mono text-xs uppercase font-bold tracking-wider border-l border-steel-200">
                  Models &amp; Controllers Serviced
                </th>
                <th scope="col" className="w-1/4 p-4 text-steel-900 font-mono text-xs uppercase font-bold tracking-wider border-l border-steel-200">
                  AMC Scope &amp; Response SLA
                </th>
                <th scope="col" className="w-1/5 p-4 text-steel-900 font-mono text-xs uppercase font-bold tracking-wider border-l border-steel-200">
                  OEM Spares Guarantee
                </th>
                <th scope="col" className="w-1/6 p-4 text-steel-900 font-mono text-xs uppercase font-bold tracking-wider border-l border-steel-200 bg-steel-900 text-white">
                  Client Advantage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-200 text-xs">
              {brandData.map((row, idx) => (
                <tr key={idx} className="group hover:bg-steel-100/90 transition-all duration-150 relative hover:shadow-[inset_4px_0_0_0_#e63920]">
                  <td className="p-4 font-bold text-steel-950 font-mono text-sm">
                    {row.brand}
                    <span className="text-[10px] text-steel-500 font-sans block font-normal mt-0.5">
                      {row.tagline}
                    </span>
                  </td>
                  <td className="p-4 text-steel-700 border-l border-steel-200 leading-relaxed font-mono text-[11px]">
                    {row.modelsSupported}
                  </td>
                  <td className="p-4 text-steel-800 border-l border-steel-200 leading-relaxed">
                    <p className="font-semibold text-steel-900">{row.amcCapability}</p>
                    <p className="text-[11px] text-steel-500 font-mono mt-1 flex items-center gap-1.5">
                      <span className="text-emergency-500 font-bold">⚡</span>
                      <span>{row.breakdownResponse}</span>
                    </p>
                  </td>
                  <td className="p-4 text-steel-700 border-l border-steel-200 leading-relaxed">
                    <span className="inline-flex items-center gap-1.5 text-safety-600 font-semibold text-[11px]">
                      <span>✓</span>
                      <span>{row.sparesAvailability}</span>
                    </span>
                  </td>
                  <td className="p-4 bg-steel-900/5 border-l border-steel-200 font-bold text-steel-950 text-[11px]">
                    <span className="text-emergency-600 block">{row.costAdvantage}</span>
                    <span className="text-[10px] text-steel-500 font-normal font-sans block mt-0.5">
                      Zero OEM lock-in penalties
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote Action */}
        <div className="mt-8 text-center">
          <a
            href="/contact/request-maintenance-quote"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-steel-900 hover:text-emergency-500 transition-colors bg-white px-5 py-2.5 border border-steel-300 rounded-sm shadow-milled hover:border-emergency-500"
          >
            <span>Request a Multi-Brand AMC Assessment for Your Society or Commercial Complex</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
