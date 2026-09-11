async function runE2EAdminTest() {
  console.log('Testing Admin E2E Login & Analytics Proxy...');
  const nextBase = 'http://localhost:3000';

  // 1. Post to Next.js /api/auth/login Route Handler
  const loginRes = await fetch(`${nextBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@placeholder-client.com',
      password: process.env.ADMIN_SEED_PASSWORD || 'ApexElevators@2026!',
    }),
  });

  const loginData = await loginRes.json();
  console.log('Login Response:', loginData);
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('Set-Cookie Received:', !!setCookie);

  if (!loginRes.ok || !loginData.success || !setCookie) {
    console.error('Login failed');
    process.exit(1);
  }

  // 2. Fetch /api/admin/analytics/summary with the cookie through Next.js proxy
  const cookieVal = setCookie.split(';')[0];
  const analyticsRes = await fetch(`${nextBase}/api/admin/analytics/summary`, {
    headers: {
      Cookie: cookieVal,
    },
  });

  const analyticsData = await analyticsRes.json();
  console.log('Analytics Proxy Status:', analyticsRes.status);
  console.log('Summary Result KPIs:', analyticsData.data?.summary);

  if (!analyticsRes.ok || !analyticsData.success) {
    console.error('Analytics proxy failed');
    process.exit(1);
  }

  console.log('✅ Next.js Admin Proxy & Dashboard Telemetry Verified Successfully!');
}

runE2EAdminTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
