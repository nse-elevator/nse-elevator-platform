import React from 'react';
import type { Metadata } from 'next';
import { FaqAccordion } from '../../components/FaqAccordion';
import { TimeOnPageTracker } from '../../components/TimeOnPageTracker';

export const metadata: Metadata = {
  title: '24/7 Emergency Lift Breakdown & Repair | NSE – New Sahyadri Elevator',
  description: 'Immediate 24/7 elevator repair and passenger entrapment rescue across Navi Mumbai and Pune. Prompt on-site engineering dispatch. Call/WhatsApp +91 90110 96990.',
};

const emergencyFaqs = [
  {
    question: 'What happens when I call the 24/7 NSE Emergency Dispatch line?',
    answer: 'Your call connects directly to our 24/7 dispatch desk in Navi Mumbai/Pune. We identify your society/building address, determine passenger entrapment urgency, and route the nearest field technician van immediately.',
  },
  {
    question: 'How do your engineers handle passenger entrapments safely?',
    answer: 'Our experienced lift engineers follow strict entrapment rescue safety protocols: reassuring passengers, confirming ARD status, isolating incoming three-phase power, safely releasing mechanical brakes, manually leveling the car at floor landing, and releasing passengers.',
  },
  {
    question: 'Do you carry multi-brand OEM replacement parts on service vehicles?',
    answer: 'Yes. Our rapid-response field vans carry high-failure components including door lock interlocks, safety switches, landing rollers, auxiliary contactors, phase-failure relays, and battery backup units for Schindler, KONE, OTIS, Johnson, and thyssenkrupp elevators.',
  },
];

export default function EmergencyElevatorRepairPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen">
      <TimeOnPageTracker />
      {/* High-Impact Emergency Hero */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 px-3 py-1 rounded-full text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            24/7 Emergency Dispatch Active Across Navi Mumbai &amp; Pune
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            Rapid Emergency Elevator Repair &amp; Passenger Rescue
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Immediate engineering dispatch for sudden lift breakdowns, passenger entrapments, drive errors, and door lock failures. Dedicated field engineers stationed in Pune and Navi Mumbai.
          </p>

          {/* Emergency Direct Call CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="emergency-page-call-btn"
              href="tel:+919011096990"
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-dark active:scale-[0.98] text-white font-mono font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 90110 96990 (Call Now)</span>
            </a>
          </div>

          <div data-stagger-grid className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 text-xs font-mono text-slate-600">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-slate-900 font-bold block text-sm">Rapid Response</span>
              <span>Emergency Dispatch</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-slate-900 font-bold block text-sm">24/7/365</span>
              <span>Continuous Dispatch</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-slate-900 font-bold block text-sm">15+ Engineers</span>
              <span>Pune &amp; Navi Mumbai Field Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Protocols Guide */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            What to Do If an Elevator Shuts Down or Passengers Are Entrapped
          </h2>

          <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs">
              <span className="text-2xl font-mono text-brand-orange font-bold block mb-2">01</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Reassure Passengers</h3>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                Use the cab intercom or talk through the landing door. Reassure passengers that modern elevators have automatic mechanical safety clamps and adequate ventilation.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs">
              <span className="text-2xl font-mono text-brand-orange font-bold block mb-2">02</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Do NOT Force Doors Open</h3>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                Never permit security guards or residents to pry open landing doors with crowbars. Uncontrolled egress without trained technicians is the primary hazard during entrapments.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs">
              <span className="text-2xl font-mono text-brand-orange font-bold block mb-2">03</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Call NSE Emergency Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                Dial <strong className="text-slate-900">+91 90110 96990</strong> immediately. State your building name, floor level, and elevator brand. Our nearest patrol engineer will be routed immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion items={emergencyFaqs} title="Emergency Breakdown & Entrapment FAQs" />
    </div>
  );
}
