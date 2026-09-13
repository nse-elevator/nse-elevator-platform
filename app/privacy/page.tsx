import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrustBadgesBar } from '../../components/TrustBadgesBar';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection (DPDP Act 2023) | NSE – New Sahyadri Elevator',
  description:
    'Privacy Policy of NSE – New Sahyadri Elevator. Learn how we handle your personal information, silent IP geolocation, user-consented GPS location, and your rights under the Digital Personal Data Protection Act, 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <li>
                <Link href="/" prefetch={true} className="hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 font-semibold">Privacy Policy</li>
            </ol>
          </nav>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block mb-2">
            Compliance &amp; Data Governance
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-slate-500 text-xs font-mono mt-3">
            Last Updated: September 4, 2026 | Compliant with the Digital Personal Data Protection (DPDP) Act, 2023 (India)
          </p>
        </div>
      </section>

      <TrustBadgesBar />

      {/* Main Content */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-card-unit className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-10 text-slate-800 leading-relaxed text-sm sm:text-base text-justify">
          {/* Section 1: Overview */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              1. Overview &amp; Data Fiduciary Identity
            </h2>
            <p className="text-steel-700">
              <strong>NSE – New Sahyadri Elevator</strong> (&quot;NSE&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy, security, and digital dignity of our clients, building management committees, and website visitors.
            </p>
            <p className="text-steel-700 mt-3">
              This Privacy Policy explains the categories of personal and technical data we collect, why we process it, how we safeguard it, and how you may exercise your statutory rights under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act, Act No. 22 of 2023, India)</strong> and applicable telecommunications and cybersecurity regulations.
            </p>
            <div className="mt-4 p-4 bg-steel-50 border-l-4 border-emergency-500 rounded-r-sm text-xs font-mono text-steel-800">
              <p className="font-bold uppercase tracking-wider text-steel-900">Data Fiduciary Details:</p>
              <p className="mt-1">NSE – New Sahyadri Elevator</p>
              <p>Registered Office: Plot No. 14, Sector 19, Airoli, Navi Mumbai, Maharashtra 400708</p>
              <p>Pune Operations Hub: Survey No. 42/3, Katraj-Kondhwa Road, Pune, Maharashtra 411046</p>
              <p>Contact Email: office.pune@nsei.in | Dispatch Hotline: +91 91585 09904</p>
            </div>
          </div>

          {/* Section 2: Two-Tier Location Data Handling */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              2. Two-Tier Location Information Architecture
            </h2>
            <p className="text-steel-700">
              To deliver elevator maintenance, technical diagnostics, and rapid emergency entrapment response across key metropolitan zones, our platform employs a disciplined, two-tier location architecture:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Tier 1 */}
              <div className="border border-steel-200 bg-surface-50 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-steel-500"></span>
                  <h3 className="font-bold text-steel-900 text-sm uppercase font-mono">
                    Tier 1: Silent IP-Based Approximate Location
                  </h3>
                </div>
                <p className="text-xs text-steel-600 leading-relaxed">
                  <strong>Scope:</strong> City, state/region, and country-level approximate indicators derived server-side from your connection&apos;s IP address.
                </p>
                <p className="text-xs text-steel-600 leading-relaxed mt-2">
                  <strong>Permission Prompt:</strong> None. It is processed passively on the backend and <em>never triggers browser permission prompts</em>.
                </p>
                <p className="text-xs text-steel-600 leading-relaxed mt-2">
                  <strong>Purpose:</strong> Used solely to identify regional traffic (e.g., Navi Mumbai, Pune, Thane, Panvel) to route inquiries to the correct regional engineering hub and safeguard against non-serviceable regional queries.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="border border-emergency-300 bg-emergency-50/20 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emergency-500"></span>
                  <h3 className="font-bold text-steel-900 text-sm uppercase font-mono">
                    Tier 2: User-Consented Precise GPS Location
                  </h3>
                </div>
                <p className="text-xs text-steel-600 leading-relaxed">
                  <strong>Scope:</strong> High-precision latitude and longitude coordinates acquired via the browser&apos;s native Geolocation API.
                </p>
                <p className="text-xs text-steel-600 leading-relaxed mt-2">
                  <strong>Permission Prompt:</strong> Explicit native browser consent modal shown <em>only after</em> you intentionally click &quot;Use my current location&quot; or &quot;Check my distance to nearest service hub&quot;.
                </p>
                <p className="text-xs text-steel-600 leading-relaxed mt-2">
                  <strong>Purpose:</strong> Reverse-geocoded via OpenStreetMap Nominatim solely to auto-fill building address fields and calculate straight-line/driving distance to our nearest field engineering depot.
                </p>
                <p className="text-xs text-steel-600 leading-relaxed mt-2 font-semibold">
                  You can decline the prompt at any time; manual address entry remains 100% functional without penalty.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Information We Collect */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              3. Categories of Information Collected
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-steel-700 text-sm">
              <li>
                <strong>Inquiry &amp; Contact Details:</strong> Full name, phone number, society/commercial building name, email address, physical property address, and service requirement details submitted via our quote calculator, AMC request forms, emergency callback forms, or audit request tools.
              </li>
              <li>
                <strong>Elevator Technical Specifications:</strong> Number of lifts/elevators, equipment age, building typology (residential CHS, commercial IT park, hospital, industrial), current OEM brand (Otis, Schindler, Kone, ThyssenKrupp/TK, Johnson, etc.), and operational complaints.
              </li>
              <li>
                <strong>Attribution &amp; Marketing Parameters:</strong> First-touch and last-touch UTM parameters (source, medium, campaign, term, content), Google Click Identifiers (gclid), Meta Click Identifiers (fbclid), and referral sources.
              </li>
              <li>
                <strong>Technical Telemetry &amp; Session Metrics:</strong> Anonymous visitor UUIDs (stored in local cookies), page views, scroll depth milestones (25%, 50%, 75%, 100%), time spent on mission-critical pages, quote calculator funnel progression/drop-off, and contact method preference (phone call vs. WhatsApp).
              </li>
              <li>
                <strong>Session Recording Data:</strong> We may utilize privacy-preserving diagnostic tools (such as Microsoft Clarity) with keystroke masking enabled to analyze navigation usability. Sensitive form inputs (passwords, phone numbers, addresses) are strictly masked and never recorded.
              </li>
            </ul>
          </div>

          {/* Section 4: Purpose & Legal Basis */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              4. Purposes of Processing &amp; Legal Basis under DPDP Act 2023
            </h2>
            <p className="text-steel-700 text-sm">
              In accordance with Section 4 and Section 6 of the Digital Personal Data Protection Act, 2023, NSE processes personal data exclusively for lawful purposes for which you have provided clear, affirmative consent or for specified legitimate commercial uses:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border border-steel-200 font-sans">
                <thead className="bg-steel-100 font-mono text-steel-900 uppercase">
                  <tr>
                    <th className="p-3 border-b border-steel-200">Processing Purpose</th>
                    <th className="p-3 border-b border-steel-200">Data Processed</th>
                    <th className="p-3 border-b border-steel-200">Legal Ground (DPDP Act)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-200 text-steel-700">
                  <tr>
                    <td className="p-3 font-semibold">AMC Quote Generation &amp; Site Surveys</td>
                    <td className="p-3">Contact details, building name, lift count, location coordinates</td>
                    <td className="p-3">Informed affirmative consent (form submission)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Emergency Entrapment &amp; Breakdown Dispatch</td>
                    <td className="p-3">Caller telephone, building address, GPS location</td>
                    <td className="p-3">Vital interest &amp; rapid emergency response</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Elevator Maintenance &amp; Safety Audit Recordkeeping</td>
                    <td className="p-3">Building name, technical inspection logs, equipment service history</td>
                    <td className="p-3">Preventative maintenance verification &amp; operational safety standards</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Nearest Service Hub Distance Calculation</td>
                    <td className="p-3">User-consented GPS coordinates or approximate IP city</td>
                    <td className="p-3">Explicit opt-in consent via location button</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Telemetry &amp; Site Security Optimization</td>
                    <td className="p-3">Pseudonymous visitor ID, browser headers, page events</td>
                    <td className="p-3">Legitimate interest in security and service optimization</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Third-Party Disclosures & No Sale Policy */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              5. Third-Party Sharing &amp; Absolute No-Sale Commitment
            </h2>
            <div className="bg-safety-500/10 border-l-4 border-safety-500 p-4 rounded-r-sm text-sm text-steel-800 font-semibold mb-3">
              NSE does NOT sell, rent, monetize, or trade your personal information, society elevator records, or location coordinates to any third-party marketing brokers or data exchanges.
            </div>
            <p className="text-steel-700 text-sm">
              We only share limited operational data with vetted service partners bound by non-disclosure agreements:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-steel-700 text-xs sm:text-sm mt-2">
              <li>
                <strong>Certified Field Service Technicians:</strong> Contact and address information dispatched to our field technicians in Navi Mumbai and Pune to execute maintenance or breakdown service.
              </li>
              <li>
                <strong>Cloud &amp; Telemetry Infrastructure:</strong> Secure database hosting (MongoDB, AWS, Vercel) adhering to strict enterprise encryption at rest (AES-256) and in transit (TLS 1.3).
              </li>
              <li>
                <strong>Reverse Geocoding Infrastructure:</strong> Ephemeral latitude/longitude queries sent to OpenStreetMap Nominatim for human-readable address resolution. No persistent personal identifiers are transmitted during reverse geocoding queries.
              </li>
              <li>
                <strong>Competent Legal Authorities:</strong> When strictly mandated by applicable judicial summons, court order, or formal legal process under Indian jurisdiction.
              </li>
            </ul>
          </div>

          {/* Section 6: Data Retention & Security Measures */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              6. Data Retention &amp; Security Measures
            </h2>
            <p className="text-steel-700 text-sm">
              We retain personal data only for as long as necessary to fulfill the operational, legal, and safety verification purposes described in this policy:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-steel-700 text-xs sm:text-sm mt-2">
              <li>
                <strong>General Web Inquiries &amp; Quotes:</strong> Retained for 24 months after last contact or until consent is explicitly withdrawn.
              </li>
              <li>
                <strong>Executed AMC &amp; Modernization Contracts:</strong> Retained for 7 years following contract completion in accordance with Indian commercial record-retention laws.
              </li>
              <li>
                <strong>Elevator Safety Inspection &amp; Service Records:</strong> Retained for the operational lifecycle of the elevator system to ensure comprehensive maintenance history and equipment safety verification.
              </li>
              <li>
                <strong>Pseudonymous Telemetry &amp; Location Analytics:</strong> Raw telemetry logs are automatically aggregated and depersonalized after 12 months.
              </li>
            </ul>
            <p className="text-steel-700 text-sm mt-3">
              We enforce administrative, technical, and physical safeguards including strict role-based access control (RBAC), bcrypt credential hashing, salted token generation, automated rate limiting, and routine vulnerability patch cycles.
            </p>
          </div>

          {/* Section 7: Data Principal Rights */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              7. Your Rights under the DPDP Act, 2023
            </h2>
            <p className="text-steel-700 text-sm">
              As a Data Principal under Indian law, you possess the following enforceable rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs font-mono">
              <div className="border border-steel-200 p-3 rounded-sm bg-steel-50">
                <p className="font-bold text-steel-900">Right to Access Information</p>
                <p className="text-steel-600 mt-1">Obtain a summary of personal data being processed and the identities of any data fiduciaries.</p>
              </div>
              <div className="border border-steel-200 p-3 rounded-sm bg-steel-50">
                <p className="font-bold text-steel-900">Right to Correction &amp; Erasure</p>
                <p className="text-steel-600 mt-1">Request rectification of inaccurate data or complete deletion of unnecessary personal records.</p>
              </div>
              <div className="border border-steel-200 p-3 rounded-sm bg-steel-50">
                <p className="font-bold text-steel-900">Right of Grievance Redressal</p>
                <p className="text-steel-600 mt-1">Have your complaints investigated and resolved within statutory turnaround windows.</p>
              </div>
              <div className="border border-steel-200 p-3 rounded-sm bg-steel-50">
                <p className="font-bold text-steel-900">Right to Nominate</p>
                <p className="text-steel-600 mt-1">Designate an authorized representative to exercise rights in the event of death or incapacity.</p>
              </div>
            </div>
            <p className="text-steel-700 text-sm mt-4">
              To exercise any of these statutory rights, please send a written request to our Grievance Officer using the contact details below. We will verify your identity and respond within thirty (30) business days.
            </p>
          </div>

          {/* Section 8: Grievance Officer & Contact */}
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-steel-950 tracking-wide border-b border-steel-200 pb-2 mb-4">
              8. Grievance Redressal Officer Contact
            </h2>
            <p className="text-steel-700 text-sm">
              In compliance with Section 10 of the Digital Personal Data Protection Act, 2023, the details of our designated Data Grievance Redressal Officer are as follows:
            </p>
            <div className="mt-4 bg-steel-900 text-white p-6 rounded-sm space-y-2 text-xs font-mono">
              <p className="text-emergency-400 font-bold uppercase tracking-wider">Designated Grievance Redressal Officer</p>
              <p className="text-base font-sans font-bold text-white">Compliance &amp; Technical Operations Lead</p>
              <p>Organization: NSE – New Sahyadri Elevator</p>
              <p>Email: <a href="mailto:office.pune@nsei.in" className="text-emergency-400 underline">office.pune@nsei.in</a></p>
              <p>Dispatch Hotline: +91 91585 09904</p>
              <p>Operations Address: Survey No. 42/3, Katraj-Kondhwa Road, Pune, Maharashtra 411046</p>
              <p>Operating Hours: Monday – Saturday, 09:00 AM to 06:00 PM IST</p>
            </div>
            <p className="text-steel-600 text-xs mt-3">
              If an issue cannot be resolved through our internal grievance mechanism, you have the statutory right under the DPDP Act 2023 to submit a complaint to the Data Protection Board of India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
