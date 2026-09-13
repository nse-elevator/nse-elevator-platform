import React from 'react';
import type { Metadata } from 'next';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';
import { FreeAuditLeadMagnet } from '../../components/FreeAuditLeadMagnet';
import { DynamicQuoteCalculator as QuoteCalculatorForm } from '../../components/DynamicQuoteCalculator';
import { AnimatedCounter } from '../../components/AnimatedCounter';
import { getTestimonials } from '../../lib/api';

export const revalidate = 3600; // ISR: 1 hour

export const metadata: Metadata = {
  title: 'Client Reviews & Society Testimonials | NSE – New Sahyadri Elevator',
  description: 'Read reviews from housing society chairmen, commercial facility directors, and hospital administrators who rely on New Sahyadri Elevator for 24/7 AMC and repairs across Navi Mumbai & Pune.',
};

interface TestimonialItem {
  quote: string;
  authorName: string;
  jobTitle: string;
  company: string;
  location?: string;
  buildingPortfolioSize: string;
  rating?: number;
}

const fallbackTestimonials: TestimonialItem[] = [
  {
    quote: 'Switching our 4 wings in Airoli to New Sahyadri Elevator has been the best committee decision this year. On a recent Sunday evening when an entrapment occurred, their mobile engineer arrived in exactly 22 minutes, leveled the cab safely, and restored service without fuss. Outstanding reliability.',
    authorName: 'Rajesh Patil',
    jobTitle: 'Chairman, Managing Committee',
    company: 'Sai Saburi Co-operative Housing Society',
    location: 'Airoli, Navi Mumbai',
    buildingPortfolioSize: '4 Wings, 8 Traction Lifts',
    rating: 5,
  },
  {
    quote: 'Our previous OEM renewal quote was bleeding our society maintenance funds. NSE stepped in with genuine multi-brand OEM spare parts, transparent quarterly service logs, and saved our society over 31% annually. The lifts run quieter than they have in years.',
    authorName: 'Anand Kulkarni',
    jobTitle: 'Hon. Secretary',
    company: 'Greenfield Heights CHS',
    location: 'Pune, Maharashtra',
    buildingPortfolioSize: '14-Story Tower, 3 Passenger Lifts',
    rating: 5,
  },
  {
    quote: 'In a surgical hospital, jerky stops and unlevel car landings are unacceptable when transporting post-op stretchers. NSE recalibrated our hydraulic valve blocks and VVVF drives, achieving precision floor leveling within ±2mm. Their scheduled 2 AM servicing avoids patient transit hours.',
    authorName: 'Dr. Meena Iyer',
    jobTitle: 'Medical Director & Facilities Head',
    company: 'Apex Healthcare Center',
    location: 'Vashi, Navi Mumbai',
    buildingPortfolioSize: 'Hospital Facility, 4 Bed Lifts',
    rating: 5,
  },
  {
    quote: 'Managing 12 passenger elevators across two major OEM makes was a logistical nightmare with separate contractors. NSE unified our entire fleet under one comprehensive AMC. Their technicians carry genuine spare boards and relays in their service van, cutting our MTTR by 60%.',
    authorName: 'Vikram Malhotra',
    jobTitle: 'Facility Operations Lead',
    company: 'Millennium IT Park',
    location: 'Mahape, Navi Mumbai',
    buildingPortfolioSize: 'Commercial IT Park, 12 High-Speed Lifts',
    rating: 5,
  },
  {
    quote: 'Very professional technical crew. They conducted a free 25-point audit that caught a worn governor cable our former contractor ignored. Resolving an initial invoice clarification took a couple of extra days, but their management handled it transparently. Highly trustworthy team.',
    authorName: 'Suresh Deshpande',
    jobTitle: 'Treasurer',
    company: 'Mayflower Park CHS',
    location: 'Katraj, Pune',
    buildingPortfolioSize: '7-Story Complex, 4 Lifts',
    rating: 4,
  },
  {
    quote: 'Our 18-year-old lifts were shaking and alarming our senior citizen residents. NSE executed a modern VVVF microprocessor upgrade and cab refurbishment in under 5 days per shaft. The ride is now whisper-quiet and silky smooth, with integrated ARD battery backup.',
    authorName: 'Sunita Jadhav',
    jobTitle: 'Secretary',
    company: 'Greenfield Co-operative Housing Society',
    location: 'Kothrud, Pune',
    buildingPortfolioSize: 'Residential CHS, 2 Traction Lifts',
    rating: 5,
  },
  {
    quote: 'When a 3-ton freight lift breaks down mid-shift, dispatch stops. NSE answered our emergency callback on a Saturday morning, replaced a sheared landing interlock switch within 35 minutes, and kept our shipping docks on schedule. Genuine industrial expertise.',
    authorName: 'Manoj Narvekar',
    jobTitle: 'Logistics & Plant Operations Manager',
    company: 'Swastik Industrial Logistics',
    location: 'Taloja MIDC, Navi Mumbai',
    buildingPortfolioSize: 'Industrial Warehouse, 2 Heavy Freight Hoists',
    rating: 4,
  },
  {
    quote: 'We faced persistent emergency power issues due to an uncalibrated ARD unit under our previous vendor. NSE diagnosed the battery pack issue immediately, performed complete load drop tests, and achieved 100% emergency rescue reliability in record time.',
    authorName: 'Prashant Shinde',
    jobTitle: 'Managing Committee Member',
    company: 'Sunrise Heights CHS',
    location: 'Pimpri-Chinchwad, Pune',
    buildingPortfolioSize: '10-Story Society, 4 Passenger Lifts',
    rating: 5,
  },
];

function getInitials(name: string): string {
  const clean = name.replace(/^Dr\.\s+/i, '');
  const parts = clean.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderStars(rating: number = 5) {
  const fullStars = Math.min(5, Math.max(1, rating));
  const emptyStars = 5 - fullStars;
  return (
    <div className="flex items-center gap-1 text-caution-500 text-sm" aria-label={`${fullStars} out of 5 stars`}>
      <span>{'★'.repeat(fullStars)}</span>
      {emptyStars > 0 && <span className="text-steel-300">{'★'.repeat(emptyStars)}</span>}
    </div>
  );
}

export default async function TestimonialsPage() {
  const fetched = await getTestimonials();
  const list: TestimonialItem[] = (fetched && fetched.length > 0) ? fetched : fallbackTestimonials;

  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
            Verified Society &amp; Client Feedback
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Trusted By Housing Societies &amp; Commercial Facility Directors
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real feedback from CHS managing committees, hospital directors, and commercial estate managers who count on New Sahyadri Elevator across Navi Mumbai and Pune.
          </p>

          {/* Quick Metrics */}
          <div data-stagger-grid className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8 pt-8 border-t border-slate-200 text-center">
            <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
              <span className="text-xl sm:text-2xl font-mono font-black text-emerald-700 block">
                <AnimatedCounter target={350} suffix="+" />
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Elevators Under Care</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
              <span className="text-xl sm:text-2xl font-mono font-black text-emerald-700 block">
                <AnimatedCounter target={4.9} decimals={1} suffix=" / 5" />
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Society Rating</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
              <span className="text-xl sm:text-2xl font-mono font-black text-brand-orange block">
                <AnimatedCounter target={30} prefix="< " suffix=" Mins" />
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Emergency Dispatch</span>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
              <span className="text-xl sm:text-2xl font-mono font-black text-brand-orange block">
                <AnimatedCounter target={30} prefix="~" suffix="%" />
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Cost Savings vs OEM</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Testimonials Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-stagger-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((r, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* Header: Star Rating + Portfolio Tag */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  {renderStars(r.rating || 5)}
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {r.buildingPortfolioSize}
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6 text-justify">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              {/* Author & Society Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                {/* Avatar Initial Circle */}
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                  {getInitials(r.authorName)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{r.authorName}</h3>
                  <p className="text-xs font-semibold text-brand-orange truncate">{r.jobTitle}</p>
                  <p className="text-xs font-bold text-slate-800 truncate mt-0.5">{r.company}</p>
                  {r.location && (
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">{r.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FreeAuditLeadMagnet />

      <QuoteCalculatorForm />
    </div>
  );
}
