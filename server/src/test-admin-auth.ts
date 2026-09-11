import { AddressInfo } from 'net';
import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { config } from './config/env';

async function runAdminAuthValidation() {
  console.log('====================================================');
  console.log('🧪 Starting Admin Authentication & JWT Validation Tests');
  console.log('====================================================');

  const testEmail = (process.env.ADMIN_SEED_EMAIL || config.ADMIN_SEED_EMAIL || '').trim().toLowerCase();
  const testPassword = process.env.ADMIN_SEED_PASSWORD || config.ADMIN_SEED_PASSWORD || '';

  if (!testEmail || !testPassword) {
    console.error('❌ Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD environment variables.');
    process.exit(1);
  }

  // 1. Connect to Database
  await connectDB();

  // 2. Start Express app on ephemeral port
  const app = createApp();
  const server = app.listen(0);
  const port = (server.address() as AddressInfo).port;
  const baseUrl = `http://127.0.0.1:${port}/api`;
  console.log(`[Test Runner] Temporary test server listening on ephemeral port: ${port}`);

  let receivedToken = '';

  try {
    // ----------------------------------------------------
    // TEST 1: Valid Admin Login (Expected: 200 OK + JWT)
    // ----------------------------------------------------
    console.log('\n--- TEST 1: Valid Admin Login ---');
    console.log(`Attempting login for: ${testEmail}`);

    const validLoginRes = await fetch(`${baseUrl}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    const validLoginBody = await validLoginRes.json();
    console.log(`HTTP Status: ${validLoginRes.status}`);

    if (validLoginRes.status !== 200 || !validLoginBody.success || !validLoginBody.data?.token) {
      console.error('❌ TEST 1 FAILED: Expected 200 OK with JWT token, received:', validLoginBody);
      throw new Error('Valid login test failed');
    }

    receivedToken = validLoginBody.data.token;
    console.log('✅ TEST 1 PASSED: Valid admin login succeeded!');
    console.log(`   Token Type: ${validLoginBody.data.tokenType}`);
    console.log(`   Expires In: ${validLoginBody.data.expiresIn}`);
    console.log(`   User Email: ${validLoginBody.data.user.email}`);
    console.log(`   User Role:  ${validLoginBody.data.user.role}`);
    console.log(`   JWT Sample: ${receivedToken.substring(0, 30)}...`);

    // ----------------------------------------------------
    // TEST 2: Invalid Password (Expected: 401 Unauthorized)
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Invalid Password Attempt ---');
    const wrongPassRes = await fetch(`${baseUrl}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'WrongPassword999!' }),
    });

    const wrongPassBody = await wrongPassRes.json();
    console.log(`HTTP Status: ${wrongPassRes.status}`);

    if (wrongPassRes.status !== 401 || wrongPassBody.success !== false) {
      console.error('❌ TEST 2 FAILED: Expected 401 for wrong password, received:', wrongPassBody);
      throw new Error('Wrong password test failed');
    }

    console.log('✅ TEST 2 PASSED: 401 returned for incorrect password.');
    console.log(`   Error Code: ${wrongPassBody.error.code}`);
    console.log(`   Message:    ${wrongPassBody.error.message}`);

    // ----------------------------------------------------
    // TEST 3: Non-Existent Email (Expected: 401 Unauthorized)
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Non-Existent Email Attempt ---');
    const wrongEmailRes = await fetch(`${baseUrl}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nonexistent@placeholder-client.com', password: testPassword }),
    });

    const wrongEmailBody = await wrongEmailRes.json();
    console.log(`HTTP Status: ${wrongEmailRes.status}`);

    if (wrongEmailRes.status !== 401 || wrongEmailBody.success !== false) {
      console.error('❌ TEST 3 FAILED: Expected 401 for non-existent email, received:', wrongEmailBody);
      throw new Error('Non-existent email test failed');
    }

    console.log('✅ TEST 3 PASSED: 401 returned for non-existent email.');
    console.log(`   Error Code: ${wrongEmailBody.error.code}`);

    // ----------------------------------------------------
    // TEST 4: Middleware Verification — Missing Header (Expected: 401)
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Middleware Access Without Token ---');
    const noTokenRes = await fetch(`${baseUrl}/admin/auth/me`, {
      method: 'GET',
    });

    const noTokenBody = await noTokenRes.json();
    console.log(`HTTP Status: ${noTokenRes.status}`);

    if (noTokenRes.status !== 401 || noTokenBody.error?.code !== 'AUTH_HEADER_MISSING') {
      console.error('❌ TEST 4 FAILED: Expected 401 AUTH_HEADER_MISSING, received:', noTokenBody);
      throw new Error('Missing token test failed');
    }

    console.log('✅ TEST 4 PASSED: 401 returned when Authorization header is absent.');

    // ----------------------------------------------------
    // TEST 5: Middleware Verification — Tampered/Invalid JWT (Expected: 401)
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Middleware Access With Invalid Token ---');
    const badTokenRes = await fetch(`${baseUrl}/admin/auth/me`, {
      method: 'GET',
      headers: { Authorization: 'Bearer this.is.an.invalid.token' },
    });

    const badTokenBody = await badTokenRes.json();
    console.log(`HTTP Status: ${badTokenRes.status}`);

    if (badTokenRes.status !== 401 || badTokenBody.error?.code !== 'INVALID_TOKEN') {
      console.error('❌ TEST 5 FAILED: Expected 401 INVALID_TOKEN, received:', badTokenBody);
      throw new Error('Invalid token test failed');
    }

    console.log('✅ TEST 5 PASSED: 401 returned for tampered or invalid JWT.');

    // ----------------------------------------------------
    // TEST 6: Middleware Verification — Valid JWT (Expected: 200 OK)
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Middleware Access With Valid Token ---');
    const authedRes = await fetch(`${baseUrl}/admin/auth/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${receivedToken}` },
    });

    const authedBody = await authedRes.json();
    console.log(`HTTP Status: ${authedRes.status}`);

    if (authedRes.status !== 200 || !authedBody.success || authedBody.data?.user?.email !== testEmail) {
      console.error('❌ TEST 6 FAILED: Expected 200 with authenticated user, received:', authedBody);
      throw new Error('Authenticated endpoint test failed');
    }

    console.log('✅ TEST 6 PASSED: Protected route successfully verified with valid JWT!');
    console.log(`   Authenticated User: ${authedBody.data.user.name} (${authedBody.data.user.email})`);
    console.log(`   Role: ${authedBody.data.user.role}`);

    console.log('\n====================================================');
    console.log('🎉 ALL 6 ADMIN AUTHENTICATION TESTS PASSED SUCCESSFULLY!');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Test execution error:', error);
    process.exitCode = 1;
  } finally {
    server.close();
    await disconnectDB();
    process.exit(process.exitCode || 0);
  }
}

runAdminAuthValidation().catch((err) => {
  console.error('❌ Fatal error running tests:', err);
  process.exit(1);
});
