import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';

const certifications: Array<{
  acronym: string;
  name: string;
  code: string;
  counter?: { target: number; prefix?: string; suffix?: string };
}> = [
  {
    acronym: '350+ LIFTS',
    name: 'Elevators Under Care',
    code: 'Navi Mumbai & Pune',
    counter: { target: 350, suffix: '+ LIFTS' },
  },
  {
    acronym: '15+ ENGS',
    name: 'Certified Engineers',
    code: 'Pune Field Operations',
    counter: { target: 15, suffix: '+ ENGS' },
  },
  {
    acronym: '15Y+ EXP',
    name: '15y Mumbai • 7y Pune',
    code: 'AMC Industry Track Record',
    counter: { target: 15, suffix: 'Y+ EXP' },
  },
  {
    acronym: '24/7',
    name: 'Emergency Response SLA',
    code: '24/7 Rapid Dispatch',
    counter: { target: 24, suffix: '/7 RESP' },
  },
];

export function TrustBadgesBar() {
  return (
    <section 
      aria-label="Engineering Track Record & Trust Indicators"
      className="w-full bg-slate-100/90 border-b border-slate-200 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Title */}
          <div className="shrink-0 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold">
              Engineering Operations &amp; Track Record
            </span>
            <span className="text-xs text-slate-800 font-semibold mt-0.5 block">
              350+ Elevators Under Care • 15+ Certified Engineers • 15+ Years Experience
            </span>
          </div>

          {/* Badges Grid / Scroll Container */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center justify-start md:justify-end gap-3 sm:gap-4 min-w-max">
              {certifications.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-2 rounded-lg flex items-center gap-3 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-xs text-slate-800">
                    {item.acronym.slice(0, 4)}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block tracking-tight">
                      {item.counter ? (
                        <AnimatedCounter
                          target={item.counter.target}
                          prefix={item.counter.prefix}
                          suffix={item.counter.suffix}
                        />
                      ) : (
                        item.acronym
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {item.code}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
