import { config } from './config/env';

async function testAdminUiFlows() {
  console.log('====================================================');
  console.log('🧪 Testing Next.js Admin UI Auth, Cookie & Proxy Routes');
  console.log('====================================================');

  const nextUrl = 'http://localhost:3000';
  const testEmail = config.ADMIN_SEED_EMAIL;
  const testPassword = config.ADMIN_SEED_PASSWORD;

  let sessionCookie = '';

  try {
    // ----------------------------------------------------
    // TEST 1: Unauthenticated request to /admin/dashboard redirects to /admin/login
    // ----------------------------------------------------
    console.log('\n--- TEST 1: Middleware Guarding /admin/dashboard ---');
    const unauthRes = await fetch(`${nextUrl}/admin/dashboard`, {
      redirect: 'manual',
    });

    console.log(`HTTP Status: ${unauthRes.status}`);
    const location = unauthRes.headers.get('location');
    console.log(`Redirect Location: ${location}`);

    if (unauthRes.status !== 307 && unauthRes.status !== 308) {
      throw new Error(`Expected redirect (307/308), got status ${unauthRes.status}`);
    }
    if (!location?.includes('/admin/login')) {
      throw new Error(`Expected redirect to /admin/login, got: ${location}`);
    }
    console.log('✅ TEST 1 PASSED: Unauthenticated user successfully redirected to /admin/login.');

    // ----------------------------------------------------
    // TEST 2: Login via Next.js Route Handler /api/auth/login setting httpOnly Cookie
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Login via /api/auth/login & Cookie Inspection ---');
    const loginRes = await fetch(`${nextUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    const loginData = await loginRes.json();
    console.log(`Login HTTP Status: ${loginRes.status}`);

    if (loginRes.status !== 200 || !loginData.success) {
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }

    const setCookieHeader = loginRes.headers.get('set-cookie') || '';
    console.log(`Set-Cookie Header: ${setCookieHeader.substring(0, 45)}...`);

    if (!setCookieHeader.includes('admin_token') || !setCookieHeader.toLowerCase().includes('httponly')) {
      throw new Error(`Expected httpOnly admin_token cookie in Set-Cookie header!`);
    }

    // Extract cookie value for subsequent requests
    const match = setCookieHeader.match(/admin_token=([^;]+)/);
    if (!match) throw new Error('Could not parse admin_token cookie');
    sessionCookie = `admin_token=${match[1]}`;
    console.log('✅ TEST 2 PASSED: httpOnly cookie successfully issued upon login.');

    // ----------------------------------------------------
    // TEST 3: Authenticated Request to Next.js Admin Proxy /api/admin/services
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Next.js Admin Proxy /api/admin/services ---');
    const proxyRes = await fetch(`${nextUrl}/api/admin/services`, {
      headers: {
        Cookie: sessionCookie,
      },
    });

    const proxyData = await proxyRes.json();
    console.log(`Proxy HTTP Status: ${proxyRes.status}`);

    if (proxyRes.status !== 200 || !proxyData.success || !Array.isArray(proxyData.data)) {
      throw new Error(`Proxy failed: ${JSON.stringify(proxyData)}`);
    }
    console.log(`✅ TEST 3 PASSED: Admin proxy successfully injected cookie token to Express backend.`);
    console.log(`   Services Retrieved: ${proxyData.data.length}`);

    // ----------------------------------------------------
    // TEST 4: Secure CSV Export via Next.js Proxy (No Token in URL)
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Secure CSV Export via Proxy ---');
    const exportRes = await fetch(`${nextUrl}/api/admin/leads/export`, {
      headers: {
        Cookie: sessionCookie,
      },
    });

    const exportContentType = exportRes.headers.get('content-type') || '';
    const exportContentDisp = exportRes.headers.get('content-disposition') || '';
    const csvContent = await exportRes.text();

    if (exportRes.status !== 200 || !exportContentType.includes('text/csv')) {
      throw new Error(`CSV export failed: status=${exportRes.status}, type=${exportContentType}`);
    }
    console.log('✅ TEST 4 PASSED: CSV export downloaded securely without exposing JWT in URL.');
    console.log(`   Disposition: ${exportContentDisp}`);
    console.log(`   Sample Line: ${csvContent.split('\n')[0]}`);

    // ----------------------------------------------------
    // TEST 5: Site Settings Read & Update
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Admin Settings Singleton Read & Update ---');
    const getSettingsRes = await fetch(`${nextUrl}/api/admin/settings`, {
      headers: { Cookie: sessionCookie },
    });
    const settingsData = await getSettingsRes.json();
    if (getSettingsRes.status !== 200 || !settingsData.success) {
      throw new Error(`Failed to read settings: ${JSON.stringify(settingsData)}`);
    }
    console.log(`Current Toll-Free Hotline: ${settingsData.data.tollFreeHotline}`);

    const putSettingsRes = await fetch(`${nextUrl}/api/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookie,
      },
      body: JSON.stringify({
        emergencyBannerText: 'Apex 24/7 Breakdown Dispatch • Guaranteed Average On-Site Arrival < 30 Minutes',
      }),
    });
    const putSettingsData = await putSettingsRes.json();
    if (putSettingsRes.status !== 200 || !putSettingsData.success) {
      throw new Error(`Failed to update settings: ${JSON.stringify(putSettingsData)}`);
    }
    console.log('✅ TEST 5 PASSED: Site settings updated successfully.');

    // ----------------------------------------------------
    // TEST 6: Logout Clears Cookie and Re-triggers Redirect
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Logout & Session Revocation ---');
    const logoutRes = await fetch(`${nextUrl}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
    });

    const logoutData = await logoutRes.json();
    const logoutSetCookie = logoutRes.headers.get('set-cookie') || '';

    if (logoutRes.status !== 200 || !logoutData.success || !logoutSetCookie.includes('Max-Age=0')) {
      throw new Error(`Logout failed: ${logoutSetCookie}`);
    }
    console.log('✅ TEST 6 PASSED: Logout successfully cleared httpOnly cookie.');

    console.log('\n====================================================');
    console.log('🎉 ALL NEXT.JS ADMIN UI & AUTH FLOW TESTS PASSED!');
    console.log('====================================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testAdminUiFlows();
