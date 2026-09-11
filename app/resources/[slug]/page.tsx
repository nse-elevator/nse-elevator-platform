import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TrustBadgesBar } from '../../../components/TrustBadgesBar';
import { FaqAccordion } from '../../../components/FaqAccordion';

interface StateCodeGuide {
  stateName: string;
  regulatoryAgency: string;
  governingCode: string;
  cat1Frequency: string;
  cat5Frequency: string;
  finesPerDay: string;
  overview: string;
  mandatedChecklist: string[];
  faqs: { question: string; answer: string }[];
}

const stateCodes: Record<string, StateCodeGuide> = {
  illinois: {
    stateName: 'Illinois',
    regulatoryAgency: 'Illinois Office of the State Fire Marshal (OSFM) & Chicago Department of Buildings',
    governingCode: 'ASME A17.1-2019 / Chicago Municipal Code Title 14B',
    cat1Frequency: 'Annual (12 Months)',
    cat5Frequency: 'Every 5 Years (60 Months)',
    finesPerDay: 'Up to $1,000 / Day for Operating on Expired Certificate',
    overview: 'The State of Illinois and City of Chicago mandate strict adherence to ASME A17.1 safety protocols. All commercial elevators must undergo annual Category 1 testing witnessed by an authorized third-party inspector.',
    mandatedChecklist: [
      'Annual no-load safety brake drop test and governor trip switch verification',
      'Door reopening device and infrared door edge safety reverse testing',
      'Two-way emergency cab communication testing connected to 24-hour monitoring station',
      'Phase I emergency fire recall and Phase II in-cab firefighter service operation',
    ],
    faqs: [
      { question: 'Who files the inspection report in Illinois?', answer: 'The authorized inspection agency files the electronic compliance report directly into the OSFM portal or City of Chicago DOB system.' },
    ],
  },
  texas: {
    stateName: 'Texas',
    regulatoryAgency: 'Texas Department of Licensing and Regulation (TDLR) Elevator Safety Division',
    governingCode: 'ASME A17.1-2016 & Texas Health and Safety Code Chapter 754',
    cat1Frequency: 'Annual (Every 12 Months)',
    cat5Frequency: 'Every 5 Years for Traction Systems',
    finesPerDay: 'Up to $5,000 per violation from TDLR Enforcement',
    overview: 'Under Texas law, building owners are legally responsible for contracting an independent third-party safety inspector and an accredited elevator contractor to conduct annual safety examinations.',
    mandatedChecklist: [
      'Registered contractor must conduct and witness annual tests',
      'Annual filing fee and inspection report submitted within 60 days of inspection',
      'Display of current valid TDLR Certificate of Operation in elevator cab or building management office',
      'Category 5 full-load test required on traction systems before Certificate renewal',
    ],
    faqs: [
      { question: 'What happens if our Texas TDLR certificate expires?', answer: 'TDLR assesses administrative fines and may issue a cease-operation order prohibiting building tenants from utilizing the elevator until required tests are completed.' },
    ],
  },
  georgia: {
    stateName: 'Georgia',
    regulatoryAgency: 'Georgia Office of Insurance and Safety Fire Commissioner (OCI) - Safety Engineering',
    governingCode: 'ASME A17.1-2019 & Official Code of Georgia Annotated (O.C.G.A.) Title 25 Chapter 2',
    cat1Frequency: 'Annual Semi-Annual / Annual depending on building occupancy',
    cat5Frequency: 'Every 5 Years for Traction Units',
    finesPerDay: 'Administrative Penalties and Red Tag Shutdown',
    overview: 'The Georgia Safety Engineering Division enforces elevator compliance across Fulton, Gwinnett, Cobb, and all state counties. Equipment must maintain current operating permits issued by the State Fire Commissioner.',
    mandatedChecklist: [
      'Qualified mechanical contractor must perform code testing',
      'Emergency light battery backup testing for minimum 90-minute illumination',
      'Hydraulic relief valve seal inspection and oil level verification',
      'Fire alarm initiating device coordination testing with central building panel',
    ],
    faqs: [
      { question: 'How quickly can NSE resolve a violation citation?', answer: 'Our engineering technicians typically complete corrective remediation within 48 to 72 hours of receiving the deficiency inspection report.' },
    ],
  },
};

function getStateGuide(slug: string) {
  const normalizedKey = slug.replace(/^elevator-codes-/, '');
  return stateCodes[normalizedKey] || stateCodes[slug] || null;
}

export function generateStaticParams() {
  return [
    { slug: 'elevator-codes-illinois' },
    { slug: 'elevator-codes-texas' },
    { slug: 'elevator-codes-georgia' },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getStateGuide(params.slug);
  if (!guide) return { title: 'Code Guide Not Found | NSE – New Sahyadri Elevator' };
  return {
    title: `${guide.stateName} Elevator Code Compliance Guide | NSE`,
    description: `Complete guide to ${guide.stateName} elevator inspections, regulations, testing, and violation resolution.`,
  };
}

export default function StateCodeGuidePage({ params }: { params: { slug: string } }) {
  const guide = getStateGuide(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="w-full bg-surface-50">
      <section className="bg-steel-950 text-white py-16 sm:py-24 border-b border-steel-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-steel-400">
              <li><Link href="/" prefetch={true} className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/resources" prefetch={true} className="hover:text-white">Resources</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-steel-200 font-semibold">{guide.stateName} Elevator Codes</li>
            </ol>
          </nav>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergency-500 block mb-2">
            Jurisdictional Code Compliance Guide
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {guide.stateName} Commercial Elevator Code &amp; Testing Guide
          </h1>
          <p className="text-base text-steel-300 mt-4 leading-relaxed text-justify">
            {guide.overview}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-steel-800 text-xs font-mono">
            <div>
              <span className="text-steel-500 block text-[10px] uppercase">Enforcing Agency:</span>
              <span className="text-white font-bold">{guide.regulatoryAgency}</span>
            </div>
            <div>
              <span className="text-steel-500 block text-[10px] uppercase">Governing Standard:</span>
              <span className="text-white font-bold">{guide.governingCode}</span>
            </div>
            <div>
              <span className="text-steel-500 block text-[10px] uppercase">Testing Cadence:</span>
              <span className="text-safety-400 font-bold">Cat 1: {guide.cat1Frequency}</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBadgesBar />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div data-card-unit className="bg-white border border-steel-300 p-8 rounded-sm shadow-milled space-y-6">
          <h2 className="text-lg font-bold text-steel-950">
            Mandated {guide.stateName} Safety Inspection Checklist:
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-steel-600">
            {guide.mandatedChecklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-safety-500 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-steel-200">
            <h3 className="text-sm font-bold text-steel-950 mb-2">Late Filing &amp; Non-Compliance Penalties:</h3>
            <p className="text-xs text-emergency-600 font-mono font-bold">
              {guide.finesPerDay}
            </p>
          </div>

          <div className="pt-6 border-t border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-steel-900 block">Need safety inspection or maintenance scheduled?</span>
              <span className="text-xs text-steel-500">We coordinate certified engineering inspections and provide comprehensive safety audits.</span>
            </div>
            <a
              href="/contact/schedule-inspection"
              className="bg-emergency-500 hover:bg-emergency-600 text-white font-mono font-bold text-xs px-6 py-3 rounded-sm text-center"
            >
              Schedule Testing →
            </a>
          </div>
        </div>
      </section>

      <FaqAccordion items={guide.faqs} title={`${guide.stateName} Code Compliance FAQs`} />
    </div>
  );
}
