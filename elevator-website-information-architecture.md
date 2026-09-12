# Website Information Architecture & Technical SEO Specification
**Project:** Next.js Commercial Website for India-based Elevator Servicing Company (NSE – New Sahyadri Elevator)  
**Primary Goal:** #1 Organic Search Visibility in Navi Mumbai & Pune (Local & Regional Lift AMC SEO)  
**Secondary Goals:** Sub-second Page Speed (Core Web Vitals 95+), High-Converting Society/Commercial Lead Generation, Mobile-First Visual Polish  
**Version:** 2.0 — Aligned to Verified Indian Market Specifications  

---

## 1. Full Sitemap & Page Hierarchy

The website structure is designed around search intent clustering: **Local Search** (Housing Society chairmen and facility directors searching near them in Navi Mumbai or Pune), **Service Search** (Committees seeking Comprehensive Lift AMC, emergency repair, or modernization), and **Industry Search** (Residential CHS, Commercial IT Parks, Hospitals, Hotels, MIDC industrial hubs).

```
├── Home (/)
├── Emergency Service (/emergency-elevator-repair) [High-priority 24/7 dispatch hub]
├── Services (/services)
│   ├── Preventive Elevator Maintenance (/services/elevator-maintenance) [Comprehensive & Non-Comprehensive AMC]
│   ├── Emergency Breakdown & Repair (/services/elevator-repair)
│   ├── Elevator Modernization & Upgrades (/services/elevator-modernization)
│   ├── Safety Audits & Code Compliance (/services/safety-inspections-code-compliance) [IS 14665 & CEIG]
│   ├── Cab Remodeling & Refurbishment (/services/elevator-cab-remodeling)
│   ├── Hydraulic & Traction Overhauls (/services/hydraulic-traction-conversions)
│   ├── Multi-Brand Spares & Systems (/services/non-proprietary-elevator-service)
│   └── New Elevator Design & Installation (/services/elevator-installation)
├── Service Areas (/locations)
│   ├── Navi Mumbai Hub (HQ) (/locations/elevator-repair-navi-mumbai)
│   └── Pune Dattanagar Hub (Branch) (/locations/elevator-repair-pune-dattanagar)
├── Industries Served (/industries)
│   ├── Co-operative Housing Societies & CHS (/industries/residential-high-rises-condos)
│   ├── Commercial Office Towers & IT Parks (/industries/commercial-office-buildings)
│   ├── Hospitals & Healthcare Stretcher Lifts (/industries/hospital-healthcare-elevators)
│   ├── Hotels & Hospitality (/industries/hotel-hospitality-elevators)
│   ├── Educational Campuses & Universities (/industries/education-campuses)
│   └── Industrial MIDC & Freight Warehouses (/industries/industrial-freight-elevators)
├── Case Studies & Portfolio (/case-studies)
│   └── [Case Study Detail] (/case-studies/[caseSlug])
├── About Us (/about)
│   ├── Engineering Leadership & Field Operations (/about/team)
│   ├── Safety First & Compliance Standards (/about/safety-standards)
│   └── Careers & Apprenticeships (/careers)
│       └── [Job Opening Detail] (/careers/[jobSlug])
├── Resources & Knowledge Base (/blog)
│   ├── [Blog Post / Guide Detail] (/blog/[postSlug])
│   └── State Lift Act Compliance Guides (/resources/elevator-codes-[state])
├── Testimonials & Society Reviews (/testimonials)
└── Contact & Quote Request (/contact)
    ├── Request a Lift AMC Quote (/contact/request-maintenance-quote)
    └── Schedule a Statutory Inspection (/contact/schedule-inspection)
```

---

## 2. URL Structure & Data Sourcing Matrix

| Page / Section | Proposed URL Slug | Page Type | Data Sourcing | Rendering Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage** | `/` | Static Core | CMS / Static Config | SSG + ISR (Hourly) |
| **Emergency Hub** | `/emergency-elevator-repair` | High-Intent Static | Static Config / Dispatch API | SSG |
| **Services Hub** | `/services` | Directory Landing | CMS (`services` collection) | SSG + ISR |
| **Service Detail Pages** | `/services/[serviceSlug]` | Dynamic Template | CMS (`services` collection) | SSG (`generateStaticParams`) + ISR |
| **Locations Hub** | `/locations` | Directory Landing | CMS (`locations` collection) | SSG + ISR |
| **City Hub Pages** | `/locations/elevator-repair-[citySlug]` | Dynamic Template | CMS (`locations` collection - 2 Hubs) | SSG (`generateStaticParams`) + ISR |
| **Industries Hub** | `/industries` | Directory Landing | CMS (`industries` collection) | SSG + ISR |
| **Industry Detail Pages** | `/industries/[industrySlug]` | Dynamic Template | CMS (`industries` collection) | SSG (`generateStaticParams`) + ISR |
| **Case Studies Hub** | `/case-studies` | Portfolio Listing | CMS (`caseStudies` collection) | SSG + ISR |
| **Case Study Detail** | `/case-studies/[caseSlug]` | Dynamic Template | CMS (`caseStudies` collection) | SSG (`generateStaticParams`) + ISR |
| **About Us** | `/about` | Static Core | CMS / Static Config | SSG |
| **Safety & Compliance** | `/about/safety-standards` | Informational Static | CMS / Static Config | SSG |
| **Careers Hub** | `/careers` | Job Board | CMS (`jobPostings` collection) | SSG + ISR |
| **Job Detail Page** | `/careers/[jobSlug]` | Dynamic Template | CMS (`jobPostings` collection) | ISR (Revalidate on push) |
| **Blog / Knowledge Base** | `/blog` | Resource Center | CMS (`posts` collection) | SSG + ISR |
| **Blog Article Detail** | `/blog/[postSlug]` | Dynamic Template | CMS (`posts` collection) | SSG (`generateStaticParams`) + ISR |
| **Testimonials** | `/testimonials` | Social Proof Feed | CMS (`testimonials` collection) | SSG + ISR |
| **Contact / Quote** | `/contact` | Form Landing | Static Config | SSG (Client Form Submissions) |
| **Maintenance Quote** | `/contact/request-maintenance-quote` | Funnel Landing | Static Config | SSG (Client Form Submissions) |

---

## 3. Per-Page SEO & Content Strategy Briefs

### 3.1. Homepage (`/`)
* **Target Audience:** Housing Society (CHS) chairmen & secretaries, commercial facility directors, hospital administrators across Navi Mumbai and Pune.
* **Primary Target Keyword:** `lift maintenance company Navi Mumbai`
* **Secondary Keywords:** `lift AMC Pune`, `elevator maintenance company Navi Mumbai`, `lift repair Pune`, `multi-brand elevator AMC`
* **Recommended H1:** `NSE – New Sahyadri Elevator | Lift Maintenance, AMC & Repair`
* **Meta Title (< 60 chars):** `Lift AMC & Repair in Navi Mumbai & Pune | NSE SMART`
* **Meta Description (< 155 chars):** `Trusted partner for high-rise elevator operations — maintenance, repairs, modernization at ~30% lower cost than OEM direct. Call/WhatsApp +91 90499 94679.`
* **Core Value Propositions:**
  * 350+ Elevators Under Care
  * 15+ Certified Engineers in Pune
  * 15+ Years Mumbai / 7+ Years Pune Experience
  * < 30 Min Average Emergency Arrival Window
  * 100% Genuine OEM Spares across Schindler, KONE, OTIS, Johnson, and thyssenkrupp
  * Free 25-Point Comprehensive Elevator Health & Safety Audit

---

### 3.2. 24/7 Emergency Service Hub (`/emergency-elevator-repair`)
* **Target Audience:** Society security guards, residents, property managers facing elevator entrapments or sudden breakdowns.
* **Primary Target Keyword:** `emergency lift repair Pune`
* **Secondary Keywords:** `24/7 elevator entrapment rescue Navi Mumbai`, `urgent lift repair near me`, `lift breakdown service Pune`
* **Recommended H1:** `24/7 Emergency Lift Breakdown Repair & Passenger Rescue`
* **Meta Title (< 60 chars):** `24/7 Emergency Lift Breakdown Repair | NSE`
* **Meta Description (< 155 chars):** `Rapid 24/7 emergency elevator repair & passenger entrapment rescue. Over 15 certified engineers in Navi Mumbai & Pune. Average response < 30 mins.`
* **Key Actions:** Direct dial and WhatsApp trigger: `+91 90499 94679`.

---

### 3.3. Service Sub-Page: Preventive Maintenance (`/services/elevator-maintenance`)
* **Target Audience:** CHS managing committees seeking reliable, affordable monthly servicing without repeated breakdowns.
* **Primary Target Keyword:** `lift AMC contract Pune`
* **Secondary Keywords:** `comprehensive lift AMC Navi Mumbai`, `residential lift maintenance contract`, `society lift servicing`
* **Recommended H1:** `Customized Lift AMC Maintenance Programs`
* **Meta Title (< 60 chars):** `Lift AMC Maintenance Contracts | NSE`
* **Meta Description (< 155 chars):** `Comprehensive and non-comprehensive elevator AMC maintenance for housing societies and commercial towers. Genuine OEM parts, IS 14665 compliance.`

---

### 3.4. Service Sub-Page: Elevator Modernization (`/services/elevator-modernization`)
* **Target Audience:** Housing societies with 15-20 year old elevators facing frequent breakdowns, outdated controllers, and high OEM parts costs.
* **Primary Target Keyword:** `elevator modernization Pune`
* **Secondary Keywords:** `lift controller upgrade Navi Mumbai`, `VVVF drive installation lift`, `lift cabin renovation`
* **Recommended H1:** `Turnkey Lift Modernization & Energy-Efficient Upgrades`
* **Meta Title (< 60 chars):** `Elevator Modernization & Upgrades | NSE`
* **Meta Description (< 155 chars):** `Upgrade aging elevator controllers, VVVF drives, and cab interiors. Save up to 30% vs OEM direct quotes with genuine spares.`

---

### 3.5. Service Sub-Page: Statutory Compliance & Inspections (`/services/safety-inspections-code-compliance`)
* **Target Audience:** Building owners and managing committees preparing for annual government inspection renewals.
* **Primary Target Keyword:** `Maharashtra Lift Act compliance inspection`
* **Secondary Keywords:** `CEIG lift inspection Pune`, `PWD lift license renewal Mumbai`, `IS 14665 lift testing`
* **Recommended H1:** `Certified Lift Safety Inspections & Government Compliance`
* **Meta Title (< 60 chars):** `Lift Safety Audits & Maharashtra Lift Act Compliance | NSE`
* **Meta Description (< 155 chars):** `Comprehensive IS 14665 lift safety audits, CEIG license renewals, and PWD Form A/B testing in Navi Mumbai and Pune.`

---

### 3.6. Local Service Hub Pages (`/locations/elevator-repair-[citySlug]`)
* **Hub 1: Navi Mumbai** (`/locations/elevator-repair-navi-mumbai`): Airoli Headquarters, Vashi, Kopar Khairane, Mahape MIDC, Belapur, Panvel.
* **Hub 2: Pune Dattanagar** (`/locations/elevator-repair-pune-dattanagar`): Dattanagar Branch, Katraj, Ambegaon, Dhankawadi, Sinhagad Road, Kothrud.

---

## 4. Multi-Brand OEM Spare Parts Positioning

Rather than an anti-OEM or US-specific "non-proprietary" stance, the website positions **Multi-Brand Engineering Capability** as a premier differentiator:
* **The Challenge:** Building owners with Schindler, KONE, OTIS, Johnson, or thyssenkrupp lifts face captive OEM pricing, slow service dispatch, and aggressive pushes for expensive total replacement.
* **The NSE Advantage:** One certified engineering partner capable of servicing all 5 major brands using **100% genuine OEM spare parts**, backed by local engineers on 24/7 call and approximately **30% lower annual maintenance costs** than going direct to the OEM.

---

## 5. Schema Markup & Structured Data Blueprint

### LocalBusiness Schema (`app/locations/[locationSlug]/page.tsx` & `app/layout.tsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "NSE – New Sahyadri Elevator - Navi Mumbai",
  "image": "https://nsei.in/fleet.jpg",
  "telephone": "+91-90499-94679",
  "priceRange": "₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop No. 2, Sai Saburi CHS, Airoli",
    "addressLocality": "Navi Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400708",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.1558,
    "longitude": 72.9986
  },
  "areaServed": [
    { "@type": "City", "name": "Navi Mumbai" },
    { "@type": "City", "name": "Pune" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
```

---

## 6. Client Asset Requirements & Lead Capture

1. **Lead Magnet**: "Free 25-Point Comprehensive Elevator Health & Safety Audit"
   * Inclusion 1: Complete Health Check (Mechanical, Electrical, Door Operators, ARD)
   * Inclusion 2: Detailed Condition Report (Written Scorecard & Risk Assessment)
   * Inclusion 3: Maintenance Assessment (Independent Quality & Spares Appraisal)
   * Badge: 100% Free – No Obligation
2. **Emergency Contacts**:
   * Phone / WhatsApp: `+91 90499 94679`
   * Email: `office.pune@nsei.in`
   * Motto: "Excellence in Service"
   * Tagline: "Your Trust. Our Commitment. Safe Rides. Every Time."
   * Closing Statement: "Safe Today. Secure Tomorrow. Together Always."
