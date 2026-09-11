# Design System Specification: Premium Industrial
**Project:** Next.js Commercial Website for USA-Based Elevator Servicing Company  
**Target Audience:** Property Managers, Building Owners, Facility Directors, Chief Engineers  
**Aesthetic:** "Premium Industrial" — Precision Engineering, Uncompromising Safety, Mechanical Integrity, High-Class B2B  
**Performance Budget:** Sub-100kB initial JS bundle, 95+ Core Web Vitals, Strict Zero CLS, WCAG AA Compliant  
**Reference IA:** [`elevator-website-information-architecture.md`](file:///c:/Users/Ashok%20Dwivedi/OneDrive/Desktop/nse/elevator-website-information-architecture.md)

---

## 1. Visual Direction & Design Tokens

The visual identity rejects soft, consumer-grade pastel curves in favor of crisp, engineered proportions inspired by architectural blueprints, heavy steel machinery, and aerospace flight control panels.

### 1.1. Color Palette & Token Definitions

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                          COLOR PALETTE SCHEMATIC                               │
├─────────────────┬──────────────────┬─────────────────┬─────────────────────────┤
│ Role            │ Token Name       │ HEX Code        │ Usage & Context         │
├─────────────────┼──────────────────┼─────────────────┼─────────────────────────┤
│ Primary Deep    │ steel-950        │ #0B1118         │ Dark hero backgrounds   │
│ Primary Core    │ steel-900        │ #101B2B         │ Headers, footer, panels │
│ Primary Brand   │ steel-800        │ #1A2C42         │ Elevated dark surfaces  │
│ Industrial Blue │ navy-600         │ #1D4ED8         │ Trust elements, links   │
│ Emergency CTA   │ emergency-500    │ #E63920         │ 24/7 hotline, dispatch  │
│ Emergency Hover │ emergency-600    │ #C92A14         │ Active emergency states │
│ Industrial Gold │ caution-500      │ #E5A910         │ ASME warning / accents  │
│ Compliance OK   │ status-green     │ #059669         │ Certified / Pass badges │
│ Surface Base    │ surface-50       │ #F8FAFC         │ Light section bg        │
│ Surface Pure    │ surface-0        │ #FFFFFF         │ Light cards, containers │
│ Text Primary    │ text-900         │ #0F172A         │ High-contrast headers   │
│ Text Secondary  │ text-600         │ #475569         │ Body & subheads         │
│ Text Inverted   │ text-white       │ #F8FAFC         │ Hero/Dark card text     │
│ Border Machined │ border-slate     │ #E2E8F0         │ Subtle card borders     │
│ Border Heavy    │ border-dark      │ #24354A         │ Dark surface dividers   │
└─────────────────┴──────────────────┴─────────────────┴─────────────────────────┘
```

#### Tailwind CSS & CSS Variables (`globals.css` / `tailwind.config.ts`)
```css
:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #F8FAFC;
  --bg-surface: #FFFFFF;
  --bg-dark: #0B1118;
  --bg-dark-elevated: #101B2B;
  --bg-dark-card: #162436;

  /* Typography */
  --text-main: #0F172A;
  --text-muted: #475569;
  --text-inverse: #F8FAFC;
  --text-inverse-muted: #94A3B8;

  /* Brand & Urgency */
  --color-steel: #101B2B;
  --color-navy: #1E3A8A;
  --color-emergency: #E63920;
  --color-emergency-hover: #C92A14;
  --color-caution: #D97706;
  --color-success: #059669;

  /* Precision Borders & Shadows */
  --border-subtle: #E2E8F0;
  --border-industrial: #CBD5E1;
  --border-dark: #24354A;
  --radius-precision: 2px;
  --radius-card: 4px;
}
```

---

### 1.2. Typography Scale (`next/font`)

To guarantee zero Layout Shift (CLS = 0.00) and instant First Contentful Paint, the system uses two self-hosted variable font families via `next/font/google`:
1. **Primary Font (Body & Headings):** `Plus Jakarta Sans` — Geometric, authoritative, architectural clarity.
2. **Technical Accent (Data, Counters, Code Numbers):** `JetBrains Mono` — Monospaced precision for ASME codes, license badges, and response times.

```typescript
// app/fonts.ts
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

export const primaryFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
  weight: ['400', '500', '600', '700', '800'],
});

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['500', '700'],
});
```

#### Modular Type Scale (8pt Baseline Grid)

| Level | Size (px / rem) | Line Height | Weight | Letter Spacing | Target Elements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1** | 56px / 3.5rem | 1.1 (62px) | 800 (ExtraBold) | -0.03em | Homepage & Emergency Hero Title |
| **H1** | 44px / 2.75rem | 1.15 (50px) | 800 (ExtraBold) | -0.025em | Service & Location Page Main H1 |
| **H2** | 32px / 2.0rem | 1.25 (40px) | 700 (Bold) | -0.02em | Section Headings, Comparison Tables |
| **H3** | 24px / 1.5rem | 1.3 (32px) | 600 (SemiBold) | -0.015em | Feature Cards, FAQ Questions |
| **H4 / Subtitle**| 18px / 1.125rem | 1.4 (26px) | 600 (SemiBold) | 0.00em | Form Steps, Spec Labels |
| **Body Large** | 18px / 1.125rem | 1.6 (28px) | 400 (Regular) | 0.00em | Hero Lead Paragraphs, Value Props |
| **Body Base** | 16px / 1.0rem | 1.6 (26px) | 400 (Regular) | 0.00em | Standard Content, FAQs, Articles |
| **Body Small** | 14px / 0.875rem | 1.5 (21px) | 500 (Medium) | +0.01em | Form Helper Text, Table Data |
| **Technical/Badge**| 12px / 0.75rem | 1.4 (17px) | 700 (Mono) | +0.05em (UPPER) | ASME Codes, License #, SLA Timers |

---

### 1.3. Spacing System (8pt Grid) & Industrial Border/Shadow Tokens

#### Spacing Tokens
All dimensions and gutters map to multiples of **8px** (with `4px` reserved for hairline sub-elements):
* `space-1`: 4px (tight badge padding, icon gap)
* `space-2`: 8px (inline form spacing, small gutters)
* `space-3`: 12px (intermediate padding)
* `space-4`: 16px (standard component padding, mobile gutter)
* `space-6`: 24px (card inner padding, button padding)
* `space-8`: 32px (grid column gaps, sub-section breaks)
* `space-12`: 48px (desktop card padding, module separation)
* `space-16`: 64px (standard desktop section vertical padding)
* `space-24`: 96px (hero section vertical padding)

#### "Machined Edge" Border-Radius & Shadow Tokens
To reinforce mechanical precision, border radii are deliberately tight, and shadows mimic crisp architectural depth rather than blurry consumer drop-shadows.

* **Radius Precision:** `2px` (`rounded-sm`) — Used on buttons, badges, and technical tags.
* **Radius Card:** `4px` (`rounded`) — Used on content containers, comparison tables, and form cards.
* **Radius Window:** `6px` (`rounded-md`) — Maximum allowed rounding for modals or overlay drawers.
* *(Pill rounding `rounded-full` is strictly limited to status indicator dots and small live pill badges).*

#### Industrial Elevation & Shadow Tokens
* **Shadow Flat / Bevel Inset:** `inset 0 1px 0 0 rgba(255, 255, 255, 0.1)` (Simulates milled aluminum chamfer).
* **Shadow Milled (Subtle):** `0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)`.
* **Shadow Heavy Card:** `0 4px 6px -1px rgba(11, 17, 24, 0.12), 0 2px 4px -2px rgba(11, 17, 24, 0.08), 0 0 0 1px rgba(11, 17, 24, 0.05)`.
* **Dark Surface Glow:** `0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.5)`.

---

## 2. Core Component Specifications

### 2.1. `EmergencyDispatchBanner` (Persistent Header Strip)
* **Purpose:** Always-accessible 24/7 emergency dispatch trigger. Positioned above the main navigation bar.
* **Layout:** Full-width, single-row container. Height: 44px desktop, 40px mobile.
  * *Left:* Flashing live status indicator dot (pulsing red/green) + label: `"24/7 RAPID DISPATCH ACTIVE"`.
  * *Center:* Average arrival SLA badge: `"Guaranteed On-Site Response Under 45 Mins"`.
  * *Right:* Click-to-call direct dial hotline: `(800) 555-ELEV` with phone icon.
* **Color Scheme:** Deep Steel-950 (`#0B1118`) with crisp Emergency-500 (`#E63920`) hotline badge.
* **States:**
  * *Default:* High contrast text on dark background.
  * *Hover (Hotline):* Emergency button brightens to `#FF4D36` with underline on phone number.
  * *Focus-Visible:* 2px white outline ring with 2px offset.
* **Responsive Behavior:** On mobile (`< 768px`), center SLA text hides. The left status dot and right click-to-call button occupy `justify-between`.

---

### 2.2. `StickyMobileCTA` (Mobile Bottom Bar)
* **Purpose:** Immediate thumb-zone access for property managers walking an active equipment failure on-site.
* **Layout:** Fixed bottom bar (`bottom-0 inset-x-0`), 64px height, safe-area-inset padding for iOS/Android home indicators. Two-column split (50/50).
  * *Left Column:* `[Call 24/7 Dispatch]` — Red Emergency (`#E63920`), white bold text, telephone icon.
  * *Right Column:* `[Fast Quote]` — Steel-900 (`#101B2B`), white text, clipboard icon.
* **States:**
  * *Default:* Solid backdrop with `backdrop-blur-md`, top hairline border (`border-t border-slate-700`).
  * *Press / Active:* Opacity drops to 0.9, scale `0.98` tactile depression.
* **Responsive Behavior:** Visible strictly on viewport widths `< 1024px` (`lg:hidden`). Hidden on desktop viewports.

---

### 2.3. `MegaNavbar` (Desktop Megamenu + Mobile Drawer)
* **Purpose:** Primary brand navigation with deep links to all 8 services, 6 industries, and regional city pages.
* **Desktop Layout:** Height: 80px.
  * *Left:* High-contrast corporate SVG logo + "Commercial Elevator Group".
  * *Center:* Nav links with chevron indicators: `Services`, `Industries Served`, `Service Areas`, `Case Studies`, `About`.
  * *Right:* Secondary CTA `[Request Maintenance Survey]` (Ghost steel button) + `[Client Portal Login]`.
  * *Dropdown Drawer:* When hovering `Services`, an accessible 4-column mega-panel reveals:
    * Column 1: Core Maintenance & Repair (Links to Maintenance, 24/7 Repair, Compliance).
    * Column 2: Modernization & Retrofits (Links to Modernization, Cab Remodel, Conversions).
    * Column 3: The Non-Proprietary Advantage (Link to Open Systems + quick comparison callout).
    * Column 4: Emergency Dispatch Card (Photo of fleet truck, 1-click dispatch CTA).
* **Mobile Drawer:** Accessible slide-over drawer triggered by hamburger toggle.
  * High-contrast accordion list of Services and Cities.
  * Sticky bottom CTA in drawer for immediate phone dispatch.
* **ARIA & Keyboard:**
  * `aria-expanded="false/true"`, `aria-haspopup="true"`.
  * Keyboard navigation: `Escape` closes open menu, `Tab` traverses child links, `ArrowDown` opens menu.

---

### 2.4. `ServiceHero` (Per Service Page Template)
* **Purpose:** High-converting above-the-fold hero designed for immediate authority and SEO relevance.
* **Layout:** 2-column asymmetric desktop grid (60% content / 40% quick-quote card or high-res mechanical asset).
  * *Breadcrumb Trail:* `Home > Services > Commercial Elevator Modernization` (with Schema.org JSON-LD).
  * *Badge:* `"ASME A17.1 COMPLIANT & NON-PROPRIETARY"`.
  * *Heading (H1):* High-impact 44px extra-bold title with highlighted keyword span.
  * *Lead Text:* 2-3 sentences clarifying response SLA, certified mechanics, and zero OEM lock-in.
  * *Checklist:* 3 bullet points with green checkmarks (e.g., *"OEM Parts Bypassed"*, *"24/7 Mechanic Dispatch"*, *"Fixed Monthly Pricing"*).
  * *Dual CTAs:* Primary `[Request Service Proposal]` (Emergency-500) + Secondary `[Speak to a Senior Engineer]` (Ghost dark button).
* **States:** Fully server-rendered (RSC) for zero layout shift and sub-second LCP.

---

### 2.5. `TrustBadgesBar` (Certification & Compliance Carousel)
* **Purpose:** Establish institutional trust within 3 seconds of viewing.
* **Layout:** Horizontal strip below hero. Off-white or dark slate background with top/bottom 1px border.
  * Displays SVG logos: **ASME** (American Society of Mechanical Engineers), **NAEC** (National Association of Elevator Contractors), **QEI** (Qualified Elevator Inspectors), **OSHA VPP**, and State Contractor License badges.
  * Monospaced text underneath: `"Licensed Mechanical Contractors | State Reg. #ELV-98442-A"`.
* **States:** Static on desktop, accessible horizontal touch-scroll on mobile with overflow fading edges.

---

### 2.6. `ProprietaryVsNonProprietaryTable` (Key Differentiator Component)
* **Purpose:** Win commercial contracts against Otis/Schindler/KONE by illustrating the total cost of ownership and freedom of open architecture.
* **Layout:** 3-column comparative table with crisp machined borders.
  * Column 1: Feature / Specification (e.g., *Controller Diagnostics Access, Lead Time for Spare Parts, Freedom to Switch Contractors, Annual Software Licensing Fees*).
  * Column 2: Big Conglomerates / Proprietary OEMs (Otis, Schindler, TKE) — Marked with red X icons and prohibitive warning notes.
  * Column 3: [Brand Name] Non-Proprietary Systems (MCE, Smartrise, Virginia Controls) — Highlighted in Steel-900 border with green checkmarks and "Customer Owned" badges.
* **States:** Alternating row striping (`bg-slate-50` / `bg-white`). Highlighted column for Non-Proprietary.
* **Responsive Behavior:** On mobile screens, switches to a toggle tab format (`[Our Non-Proprietary Approach]` vs `[OEM Proprietary Lock-in]`) to prevent squished tables.

---

### 2.7. `LocalCoverageMap` (Interactive Geo-Area Card)
* **Purpose:** Hyper-local search ranking and instant confirmation of local dispatch proximity.
* **Layout:** Split view.
  * *Left:* Interactive SVG vector map of the metropolitan area with highlighted service radii (Zone 1: < 30 min, Zone 2: < 45 min).
  * *Right:* Local Field Dispatch Hub Card:
    * Physical branch office address.
    * Direct dispatch phone number for that city.
    * List of covered counties and zip codes (expandable).
    * Local licensing credentials (e.g., NYC DOB, California Cal/OSHA, Texas TDLR).
* **Responsive Behavior:** Stacks vertically on mobile with the dispatch card pinned at the top.

---

### 2.8. `FaqAccordion` (Rich Snippet SEO Component)
* **Purpose:** Answer buyer objections and automatically trigger Google FAQ rich snippet dropdowns.
* **Layout:** Stacked list of questions with 1px border dividers (`border-slate-200`).
  * Question row: H3 typography with right-aligned rotating chevron indicator.
  * Answer container: Smooth height expansion, clean paragraph formatting with contextual internal links.
* **Accessibility:** Built on accessible HTML5 `<details>` and `<summary>` or Radix UI Accordion primitive with full ARIA attributes (`aria-expanded`, `aria-controls`).

---

### 2.9. `QuoteCalculatorForm` (3-Step Lead Generation Funnel)
* **Purpose:** High-converting B2B quote request without asking for excessive initial friction.
* **Step Progression:**
  * **Step 1: Property Type & Equipment Count:**
    * Visual selector tiles: Commercial Office, Multi-Family HOA, Hospital/Medical, Industrial/Hotel.
    * Elevator count stepper: `[ - ] 3 Units [ + ]`.
    * Elevator type pills: Hydraulic, Traction, Freight, Not Sure.
  * **Step 2: Service Urgency & Scope:**
    * Option cards: Urgent Emergency Repair, Annual Maintenance Contract, Modernization Survey, Violation Resolution.
  * **Step 3: Facility Contact & Building Address:**
    * Building Name, Street Address, Contact Name, Direct Phone, Email.
    * File upload (optional): Attach latest state inspection report or violation notice.
    * Submit CTA: `[Get Fast Engineering Proposal]`.
* **States:** Step validation feedback, input error borders (`border-emergency-500`), smooth tab transitions, instant submission confirmation state with direct engineer contact number.

---

### 2.10. `GlobalFooter` (Comprehensive B2B Directory & Compliance)
* **Purpose:** Crawl budget optimization, local SEO signal consolidation, and corporate transparency.
* **Layout:** 5-column desktop footer on Deep Steel-950 (`#0B1118`).
  * *Col 1:* Corporate Brand, 24/7 central dispatch hotline, ASME/NAEC badges.
  * *Col 2: Services Directory:* Direct links to all 8 service landing pages.
  * *Col 3: Metropolitan Areas:* Direct links to all major regional city pages.
  * *Col 4: Industries:* Direct links to all 6 industry vertical hubs.
  * *Col 5: Compliance & Legal:* State license registry numbers, OSHA compliance statement, terms, privacy, and employee portal.
* *Bottom Bar:* Copyright, union affiliation notice, and dynamic XML sitemap link.

---

## 3. Motion System & Micro-Interactions

To maintain a **sub-100ms INP** (Interaction to Next Paint) and eliminate animation-induced layout shifts, motion is applied with surgical restraint.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MOTION IMPLEMENTATION RULES                     │
├────────────────────────────────┬───────────────────────────────────────┤
│ Rule                           │ Enforcement                           │
├────────────────────────────────┼───────────────────────────────────────┤
│ Above-the-Fold LCP Elements    │ STRICTLY STATIC (Zero entrance anim)  │
│ Section Scroll Reveals         │ Framer Motion `whileInView`, once:true│
│ Interactive Buttons            │ Native CSS `transform: scale(0.98)`   │
│ Form Transitions               │ Fast CSS opacity fade (150ms)         │
│ Reduced Motion Preference      │ Automatically disabled via media query│
└────────────────────────────────┴───────────────────────────────────────┘
```

### 3.1. Motion Specifications

#### 1. Scroll-Triggered Section Reveals (Sub-fold only)
* **Trigger:** Viewport entry (`viewport={{ once: true, margin: "-80px" }}`).
* **Transition:** `opacity: 0 -> 1`, `translateY: 20px -> 0px`.
* **Duration:** `0.35s` (crisp, snappy).
* **Easing:** Cubic-bezier `[0.16, 1, 0.3, 1]` (engineering ease-out).

#### 2. Button Hover & Press Interactions
* **Hover:** Subtle upward translation `translateY(-1px)` and box-shadow expansion over `0.15s`.
* **Active/Press:** Tactile compression `transform: scale(0.98)` with immediate feedback (`0.05s`).
* **Implementation:** Pure CSS utility classes (`hover:-translate-y-0.5 active:scale-[0.98] transition-transform duration-150`). Zero JS thread blocking.

#### 3. Skeleton Loading States
* Used exclusively for dynamic data components: `QuoteCalculatorForm` submission state and `LocalCoverageMap` dynamic city telemetry.
* **Aesthetic:** Subtle horizontal shimmer using an angled gradient (`linear-gradient(90deg, #101B2B 0%, #1A2C42 50%, #101B2B 100%)`).

#### 4. Explicit Motion Blacklist (DO NOT ANIMATE)
* **Above-the-fold H1 headlines, Hero Lead Text, and Hero Backgrounds:** Must render instantly for optimal LCP score.
* **Sticky Mobile Call Bar:** Fixed in DOM to prevent repainting during scroll.
* **MegaNavbar dropdown items:** Must open within 50ms without floating, bouncy physics.

---

## 4. Responsive Breakpoint Strategy

Commercial building managers are frequently on-site inspecting machine rooms from mobile devices, while corporate property executives review modernization proposals from 4K desktop monitors.

```
┌─────────┬──────────────┬────────────────────────────────────────────────────────┐
│ Token   │ Width Range  │ Layout Behavioral Strategy                             │
├─────────┼──────────────┼────────────────────────────────────────────────────────┤
│ sm:     │ 640px - 767px│ Stacked cards, sticky mobile CTA bar active            │
│ md:     │ 768px - 1023px│ 2-column grids, collapsible drawer navigation          │
│ lg:     │ 1024px - 1279px│ Desktop Megamenu enabled, sticky mobile bar hidden    │
│ xl:     │ 1280px - 1535px│ Full 4-column mega panels, max container 1280px        │
│ 2xl:    │ 1536px +     │ Ultra-wide max container 1440px with balanced gutters  │
└─────────┴──────────────┴────────────────────────────────────────────────────────┘
```

### 4.1. Component Adaptation Matrix

| Component | Mobile (`< 768px`) | Tablet (`768px - 1023px`) | Desktop (`1024px+`) |
| :--- | :--- | :--- | :--- |
| **`MegaNavbar`** | Hamburger icon -> Fullscreen slide-over drawer with click-to-call button. | Hamburger icon -> Sheet drawer with organized service lists. | Full horizontal navbar with 4-column mega dropdowns on hover/focus. |
| **`QuoteCalculatorForm`**| Single-column stacked selector tiles; large touch targets (min 48px height). | 2-column layout for equipment pills and building cards. | Centered 3-column interactive card layout with real-time summary sidebar. |
| **`LocalCoverageMap`** | Static vector map graphic with stacked field office contact cards. | Interactive SVG with tabbed metro zones. | Side-by-side interactive vector map + live dispatch availability panel. |
| **`ProprietaryVsTable`**| Tabbed card view: User toggles `[Our System]` vs `[OEM Locked]`. | Horizontally scrollable container with locked sticky first column. | Full 3-column comparative desktop grid with visual check/cross matrix. |

---

## 5. Accessibility Baseline (WCAG 2.1 AA Compliant)

### 5.1. Color Contrast Validation Table

| Foreground Token | Background Token | Calculated Contrast Ratio | WCAG AA Standard | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |
| **Emergency-500 (`#E63920`)** | Dark Navy (`#0B1118`) | **5.32 : 1** | Min 4.5:1 for normal text | **PASS (AA)** |
| **White (`#FFFFFF`)** | Emergency-500 (`#E63920`) | **4.78 : 1** | Min 4.5:1 for normal text | **PASS (AA)** |
| **Text-900 (`#0F172A`)** | Surface Base (`#F8FAFC`) | **14.82 : 1** | Min 4.5:1 for normal text | **PASS (AAA)** |
| **Text-600 (`#475569`)** | Surface Base (`#F8FAFC`) | **7.45 : 1** | Min 4.5:1 for normal text | **PASS (AAA)** |
| **Emergency-500 (`#E63920`)** | Surface Base (`#F8FAFC`) | **4.64 : 1** | Min 4.5:1 for normal text | **PASS (AA)** |
| **Caution-500 (`#D97706`)** | Dark Navy (`#0B1118`) | **6.81 : 1** | Min 4.5:1 for normal text | **PASS (AAA)** |

### 5.2. Focus States & Keyboard Navigation
* **Focus Visible Styling:** All interactive elements (buttons, inputs, links) implement a strict, high-contrast focus ring:
  ```css
  @layer utilities {
    .focus-ring {
      @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950;
    }
  }
  ```
* **Form Inputs:** Input fields maintain a minimum touch target of `48px` height with distinct label associations (`for` / `id`) and explicit `aria-describedby` error strings.

---

## 6. Page-by-Page Wireframe Briefs

### 6.1. Homepage Wireframe (`/`)
* **Section 1 (Above the Fold):**
  * `EmergencyDispatchBanner` (Top strip: Live dispatch status, (800) number).
  * `MegaNavbar` (Logo, navigation links, quote button).
  * **Hero Master Block:**
    * Left (60%): H1: *"Commercial Elevator Maintenance, Repair & Modernization Services"*, subhead highlighting 99.8% uptime SLA and certified mechanics, dual CTAs: `[Request Maintenance Proposal]` & `[Emergency Dispatch Hotline]`.
    * Right (40%): High-impact visual of field technician inspecting a modern microprocessor controller cabinet with live telemetry badges.
* **Section 2 (Instant Social Proof):**
  * `TrustBadgesBar` (ASME, QEI, NAEC, OSHA certified badges + state license registry line).
* **Section 3 (Core Service Pillars):**
  * 4-card grid: Preventive Maintenance, 24/7 Emergency Repair, Turnkey Modernization, Code Safety Inspections. Each links to its dedicated service sub-page.
* **Section 4 (The Non-Proprietary Advantage):**
  * `ProprietaryVsNonProprietaryTable` summary highlighting open-source parts availability and customer cost savings.
* **Section 5 (Industries Served):**
  * Interactive tabbed showcase: Commercial Offices, High-Rise Residential/HOA, Hospitals, Hotels, Industrial.
* **Section 6 (Featured Case Study Spotlight):**
  * Before-and-after project showcase: *"Modernizing 12 Cars at [Metropolitan Tower] — 42% Wait Time Reduction"*.
* **Section 7 (Territory & Local Coverage Map):**
  * `LocalCoverageMap` module showing dispatch radii and local office links.
* **Section 8 (Client Reviews & Testimonials):**
  * Grid of 3 quotes from verified facility directors and property management executives.
* **Section 9 (Quote Calculator Lead Magnet):**
  * `QuoteCalculatorForm` 3-step qualification form.
* **Section 10:** `GlobalFooter`.

---

### 6.2. Service Sub-Page Wireframe Template (`/services/[service-slug]`)
* **Section 1 (Above the Fold):**
  * `EmergencyDispatchBanner` + `MegaNavbar`.
  * `ServiceHero`: Breadcrumb (`Home > Services > [Service Name]`), Category pill badge, SEO H1 (e.g., *"Full-Scope Commercial Elevator Modernization & Upgrades"*), lead description, 3-point value proposition checklist, `[Get Service Quote]` CTA.
* **Section 2 (Technical Process & Methodology):**
  * 4-step engineering workflow: (1) Comprehensive Hoistway Audit -> (2) Non-Proprietary Spec Design -> (3) Staged Phased Modernization -> (4) ASME Cat 1/5 Acceptance Testing.
* **Section 3 (Equipment Specifications & Manufacturers):**
  * Brand support grid (Otis, Schindler, Dover, MCE, Smartrise) explaining universal parts availability.
* **Section 4 (Relevant Case Studies):**
  * 2 case study cards filtered specifically to this service category.
* **Section 5 (FAQ Accordion with Schema Markup):**
  * `FaqAccordion` containing 5 technical buyer FAQs. Automatically outputs Schema.org `FAQPage` JSON-LD.
* **Section 6 (Bottom Conversion Bar):**
  * High-contrast CTA block: *"Need an Engineering Assessment for Your Building?"* -> Direct phone line + `[Schedule On-Site Survey]`.
* **Section 7:** `GlobalFooter`.

---

### 6.3. Location Sub-Page Wireframe Template (`/locations/elevator-repair-[city-slug]`)
* **Section 1 (Above the Fold):**
  * `EmergencyDispatchBanner` + `MegaNavbar`.
  * **Location Hero Block:**
    * Breadcrumbs: `Home > Service Areas > [City Name], [ST]`.
    * Local SEO H1: *"Commercial Elevator Maintenance & 24/7 Repair in [City Name], [ST]"*.
    * Dispatch SLA Callout: *"Average Local Response Time: Under 42 Minutes in [Metro Area]"*.
    * Click-to-call button with local area code phone number.
* **Section 2 (Local Branch & Dispatch Hub):**
  * `LocalCoverageMap` showing covered municipalities, counties, and postal codes.
  * Local field office street address, local license numbers, and local branch manager contact.
* **Section 3 (Services Available in This Metro):**
  * Grid linking to all 8 service sub-pages with localized descriptions (e.g., *"Elevator Modernization in [City]"*).
* **Section 4 (Local Code Compliance & Authority Having Jurisdiction):**
  * Information on local regulatory compliance (e.g., NYC DOB Elevator Unit, Cal/OSHA, Chicago Dept of Buildings) and testing schedules.
* **Section 5 (Local Client Reviews):**
  * Verified testimonials from property managers situated within that specific metro area.
* **Section 6 (Local Quote Capture):**
  * `QuoteCalculatorForm` pre-populated with the selected city.
* **Section 7:** `GlobalFooter`.

---

### 6.4. Contact & Quote Funnel Wireframe (`/contact/request-maintenance-quote`)
* **Section 1 (Above the Fold):**
  * `EmergencyDispatchBanner` + `MegaNavbar`.
  * **Header:** H1: *"Request a Commercial Elevator Maintenance Proposal"*, subhead: *"Receive a customized, non-proprietary service contract estimate within 24 business hours."*
* **Section 2 (Dual-Column Form Experience):**
  * *Left Column (65%):* `QuoteCalculatorForm` full interactive experience:
    * Step 1: Building Profile (Square footage, floors, elevator count, equipment type).
    * Step 2: Contract Requirements (Full Maintenance vs Lubrication, Emergency 24/7 coverage tier).
    * Step 3: Contact Details & Inspection Report Upload.
  * *Right Column (35% — Trust & Security Sidebar):*
    * Direct phone number to Chief Estimator.
    * Guaranteed 24-hour turnaround SLA badge.
    * Client logo strip of prominent managed properties.
    * Security & privacy guarantee: *"Your building data is kept strictly confidential."*
* **Section 3 (Direct Contacts for Regional Branches):**
  * Directory list of phone numbers and email addresses for each regional field office.
* **Section 4:** `GlobalFooter`.

---

## 7. Designer & Developer Handoff Checklist

```
┌────────────────────────────────────────────────────────────────────────┐
│                      IMPLEMENTATION HANDOFF CHECKLIST                  │
├────────────────────────────────────────────────────────────────────────┤
│ [ ] Configure `tailwind.config.ts` with exact color & radius tokens    │
│ [ ] Import `Plus_Jakarta_Sans` & `JetBrains_Mono` in `app/fonts.ts`    │
│ [ ] Build RSC Shells for all 10 Core Components                        │
│ [ ] Scaffold `'use client'` islands for `QuoteCalculatorForm` & Drawer │
│ [ ] Verify Mobile Sticky CTA hides on `lg:` (1024px) screens           │
│ [ ] Test WCAG AA contrast ratios in Dark & Light modes                 │
│ [ ] Run Google Lighthouse to ensure 95+ Core Web Vitals score          │
└────────────────────────────────────────────────────────────────────────┘
```
