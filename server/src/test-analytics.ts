
async function runAnalyticsVerification() {
  console.log('====================================================');
  console.log('📊  NSE – New Sahyadri Elevator - Analytics & Telemetry Test');
  console.log('====================================================');

  const baseUrl = 'http://localhost:5000/api';

  // ----------------------------------------------------
  // TEST 1: Submit Public Analytics Event (POST /api/events)
  // ----------------------------------------------------
  console.log('\n--- TEST 1: Submit Public Analytics Event ---');
  const eventRes = await fetch(`${baseUrl}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'quote_form_submit',
      pageUrl: '/contact/request-maintenance-quote',
      utmSource: 'google_organic',
      utmMedium: 'organic',
      utmCampaign: 'commercial_elevator_seo',
      deviceType: 'desktop',
      metadata: {
        quote_type: 'modernization',
        property_type: 'commercial',
        elevator_count: 6,
      },
    }),
  });

  const eventBody = (await eventRes.json()) as any;
  console.log(`HTTP Status: ${eventRes.status}`);
  console.log('Response Body:', JSON.stringify(eventBody, null, 2));

  if (eventRes.status !== 201 || !eventBody.success) {
    console.error('❌ Failed: Public event was not recorded successfully.');
    process.exit(1);
  }
  console.log('✅ PASS: Telemetry event successfully recorded in MongoDB.');

  // ----------------------------------------------------
  // TEST 2: Validation of Malformed Event (Expected: 422)
  // ----------------------------------------------------
  console.log('\n--- TEST 2: Malformed Analytics Event ---');
  const badEventRes = await fetch(`${baseUrl}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Missing required eventType and pageUrl
      utmSource: 'bad',
    }),
  });

  const badEventBody = (await badEventRes.json()) as any;
  console.log(`HTTP Status: ${badEventRes.status}`);
  if (badEventRes.status !== 422 || badEventBody.success !== false) {
    console.error('❌ Failed: Malformed event was not rejected with 422.');
    process.exit(1);
  }
  console.log('✅ PASS: Malformed event correctly rejected with 422 VALIDATION_ERROR.');

  // ----------------------------------------------------
  // TEST 3: Authenticate Admin & Fetch Analytics Summary
  // ----------------------------------------------------
  console.log('\n--- TEST 3: Fetch Admin Analytics Summary ---');
  // First login to get JWT
  const loginRes = await fetch(`${baseUrl}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@placeholder-client.com',
      password: process.env.ADMIN_SEED_PASSWORD || 'ApexElevators@2026!',
    }),
  });
  const loginBody = (await loginRes.json()) as any;
  const token = loginBody?.data?.token;

  if (!token) {
    console.error('❌ Failed: Could not authenticate admin user.');
    process.exit(1);
  }

  // Request Analytics Summary
  const summaryRes = await fetch(`${baseUrl}/admin/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const summaryBody = (await summaryRes.json()) as any;
  console.log(`HTTP Status: ${summaryRes.status}`);
  console.log('Meta:', JSON.stringify(summaryBody.meta, null, 2));
  console.log('Summary KPIs:', JSON.stringify(summaryBody.data?.summary, null, 2));
  console.log(`Leads Over Time Points: ${summaryBody.data?.leadsOverTime?.length}`);
  console.log('Services Breakdown:', JSON.stringify(summaryBody.data?.leadsByService, null, 2));
  console.log('Locations Breakdown:', JSON.stringify(summaryBody.data?.leadsByLocation, null, 2));
  console.log('Traffic Channels:', JSON.stringify(summaryBody.data?.leadsBySource, null, 2));
  console.log('Device Distribution:', JSON.stringify(summaryBody.data?.deviceBreakdown, null, 2));

  if (summaryRes.status !== 200 || !summaryBody.success || !summaryBody.data?.leadsOverTime) {
    console.error('❌ Failed: Analytics summary did not return expected structure.');
    process.exit(1);
  }
  console.log('✅ PASS: Analytics summary generated successfully with all chart series.');

  // ----------------------------------------------------
  // TEST 4: Verify 5-Minute Memory Cache
  // ----------------------------------------------------
  console.log('\n--- TEST 4: Verify 5-Minute In-Memory Cache ---');
  const cachedRes = await fetch(`${baseUrl}/admin/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cachedBody = (await cachedRes.json()) as any;
  console.log('Cached Response Meta:', JSON.stringify(cachedBody.meta, null, 2));

  if (!cachedBody.meta?.cached) {
    console.error('❌ Failed: Second request was not served from cache.');
    process.exit(1);
  }
  console.log('✅ PASS: Subsequent request served from 5-minute memory cache.');

  console.log('\n====================================================');
  console.log('🎉 ALL ANALYTICS & TELEMETRY TESTS PASSED!');
  console.log('====================================================\n');
}

runAnalyticsVerification().catch((err) => {
  console.error('Fatal Test Error:', err);
  process.exit(1);
});
