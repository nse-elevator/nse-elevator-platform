# Post-Launch Analytics & Search Console Integration Guide

This guide details the post-deployment manual integration steps required to connect **Google Search Console (GSC)** to **Google Analytics 4 (GA4)** and activate **Microsoft Clarity** heatmaps and session recordings for **NSE – New Sahyadri Elevator** (`nsei.in`).

---

## 1. Google Search Console (GSC) Domain Setup

1. **Access Google Search Console**:
   - Go to [search.google.com/search-console](https://search.google.com/search-console).
   - Sign in using the official administrative Google account (`office.pune@nsei.in` or designated marketing account).

2. **Add Property**:
   - Select **Domain** property type (recommended over URL-prefix to automatically cover `http`, `https`, `www`, and non-www).
   - Enter: `nsei.in`
   - Click **Continue**.

3. **Verify Ownership via DNS**:
   - Copy the `google-site-verification=...` TXT record provided by Google.
   - In your DNS provider dashboard (e.g. GoDaddy, Namecheap, Cloudflare), add a new **TXT record**:
     - **Host / Name**: `@` (or leave blank depending on registrar)
     - **Value**: `google-site-verification=...`
     - **TTL**: Auto or 300 seconds
   - Return to GSC and click **Verify**.

4. **Submit XML Sitemap**:
   - In the left sidebar under **Indexing**, select **Sitemaps**.
   - Under **Add a new sitemap**, enter: `sitemap.xml` (Full URL: `https://nsei.in/sitemap.xml`).
   - Click **Submit**. Confirm that status indicates **Success** and all 43 public routes are discovered.

---

## 2. Linking Google Search Console to Google Analytics 4 (GA4)

Linking GSC to GA4 populates the *Organic Search Queries* and *Google Organic Search Traffic* reports directly inside your GA4 workspace.

1. **Open GA4 Admin**:
   - Navigate to [analytics.google.com](https://analytics.google.com).
   - In the bottom-left corner, click **Admin** (gear icon).

2. **Navigate to Product Links**:
   - Under the **Property** column, scroll down to the **Product Links** section.
   - Click **Search Console Links**.

3. **Create New Link**:
   - Click the blue **Link** button in the top-right corner.
   - Click **Choose accounts** and select the verified `nsei.in` GSC property.
   - Click **Confirm**.

4. **Select Web Stream**:
   - Click **Next**.
   - Click **Select** and choose your active GA4 Web Data Stream for `nsei.in`.
   - Click **Next**, review the configuration, and click **Submit**.

5. **Publish Search Console Reports in GA4 Navigation**:
   - In the left sidebar of GA4, click **Reports**.
   - At the bottom of the navigation menu, click **Library**.
   - Under **Collections**, locate the **Search Console** card.
   - Click the three dots (`⋮`) on the card and select **Publish**.
   - The *Search Console* section with *Queries* and *Organic Search Traffic* will now appear in your permanent GA4 sidebar.

---

## 3. Microsoft Clarity Heatmaps & Session Recording Setup

1. **Create Free Project**:
   - Go to [clarity.microsoft.com](https://clarity.microsoft.com) and sign in.
   - Click **+ New Project**.
   - **Name**: `NSE – New Sahyadri Elevator`
   - **Website URL**: `https://nsei.in`
   - **Category**: `Business & Industrial`

2. **Retrieve Project ID**:
   - Navigate to **Settings** → **Overview**.
   - Copy your unique **Project ID** (alphanumeric string, e.g., `o7x8...`).

3. **Deploy Project ID**:
   - Add the project ID to your production environment variables (e.g. Vercel, VPS, or `.env.local`):
     ```bash
     NEXT_PUBLIC_CLARITY_ID=your_actual_clarity_project_id
     ```
   - The Next.js layout (`app/layout.tsx`) is already pre-configured to asynchronously mount the official tracking script whenever `NEXT_PUBLIC_CLARITY_ID` is present.

4. **Connect Clarity with GA4 (Dual-Way Integration)**:
   - In the Clarity dashboard, navigate to **Settings** → **Setup**.
   - Under **Google Analytics integration**, click **Connect with Google Analytics**.
   - Authenticate with your Google account and select the GA4 property for `nsei.in`.
   - Clarity will now automatically pass session recording URLs into GA4 custom user properties, allowing you to click directly from a drop-off report into the exact visitor session recording.

---

## 4. Verifying Real-Time Funnel Events

Once deployed, you can verify that the custom telemetry pipeline is actively recording:

| Event Name | Trigger Condition | Key Metadata Recorded |
| :--- | :--- | :--- |
| `quote_step_viewed` | User enters step 1, 2, or 3 in the quote calculator | `step_number`, `time_spent_ms` |
| `quote_step_abandoned` | User closes tab or navigates away before submitting | `step_number`, `time_spent_ms` |
| `quote_form_submit` | User submits commercial quote assessment | `quote_type`, `elevator_count`, `property_type`, `lead_id` |
| `phone_click` | Direct dial or WhatsApp CTA engagement | `contact_method` ('phone' vs 'whatsapp'), `button_location` |
| `scroll_depth` | Vertical scroll progression milestones | `scroll_depth` (25%, 50%, 75%, 100%), `target_page` |
| `time_on_page` | Dwell time on `/contact`, quote, or emergency pages | `page_url`, `time_on_page_seconds` |
| `lead_source_capture`| First-touch marketing attribution | `utm_source`, `utm_medium`, `gclid`, `fbclid`, `anonymous_id` |

All events simultaneously stream to Google Tag Manager (`window.dataLayer`) and your self-owned MongoDB telemetry collection at `http://localhost:5000/api/events`.
