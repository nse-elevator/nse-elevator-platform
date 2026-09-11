import { AddressInfo } from 'net';
import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { config } from './config/env';
import { Service } from './models/Service';
import { Lead } from './models/Lead';

async function runAdminCrudValidation() {
  console.log('====================================================');
  console.log('🧪 Starting Admin CRUD & Leads API Validation Tests');
  console.log('====================================================');

  const testEmail = (process.env.ADMIN_SEED_EMAIL || config.ADMIN_SEED_EMAIL || '').trim().toLowerCase();
  const testPassword = process.env.ADMIN_SEED_PASSWORD || config.ADMIN_SEED_PASSWORD || '';

  if (!testEmail || !testPassword) {
    console.error('❌ Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD.');
    process.exit(1);
  }

  // 1. Connect to Database
  await connectDB();

  // 2. Start Express app on ephemeral port
  const app = createApp();
  const server = app.listen(0);
  const port = (server.address() as AddressInfo).port;
  const baseUrl = `http://127.0.0.1:${port}/api`;
  console.log(`[Test Runner] Express app listening on: ${baseUrl}`);

  try {
    // ----------------------------------------------------
    // STEP 1: Authenticate Admin & Obtain JWT
    // ----------------------------------------------------
    console.log('\n--- STEP 1: Authenticate Admin User ---');
    const loginRes = await fetch(`${baseUrl}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    const loginData = await loginRes.json();
    if (loginRes.status !== 200 || !loginData.data?.token) {
      throw new Error(`Login failed with status ${loginRes.status}: ${JSON.stringify(loginData)}`);
    }

    const token = loginData.data.token;
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log('✅ Admin login succeeded. JWT token obtained.');

    // ----------------------------------------------------
    // STEP 2: Verify Unauthenticated Requests Return 401
    // ----------------------------------------------------
    console.log('\n--- STEP 2: Verify Unauthenticated Access Rejected (401) ---');
    const endpointsToTest = [
      { method: 'GET', url: `${baseUrl}/admin/services` },
      { method: 'POST', url: `${baseUrl}/admin/services` },
      { method: 'GET', url: `${baseUrl}/admin/leads` },
      { method: 'GET', url: `${baseUrl}/admin/leads/export` },
    ];

    for (const ep of endpointsToTest) {
      const res = await fetch(ep.url, { method: ep.method });
      if (res.status !== 401) {
        throw new Error(`Expected 401 Unauthorized for ${ep.method} ${ep.url}, got ${res.status}`);
      }
      console.log(`✅ Unauthenticated ${ep.method} ${ep.url.replace(baseUrl, '')} returned 401 as expected.`);
    }

    // ----------------------------------------------------
    // STEP 3: Create a Service via POST /api/admin/services
    // ----------------------------------------------------
    console.log('\n--- STEP 3: Create Service via POST /api/admin/services ---');
    const uniqueSlug = `test-smart-lift-iot-${Date.now()}`;
    const newServicePayload = {
      slug: uniqueSlug,
      title: 'IoT Predictive Lift Monitoring',
      keywordHighlight: 'Smart Telemetry',
      categoryBadge: 'PREDICTIVE DIAGNOSTICS',
      metaTitle: 'IoT Elevator Monitoring & Diagnostics | NSE',
      metaDescription: 'Real-time telemetry and predictive bearing vibration analysis for commercial passenger elevators.',
      h1: 'IoT Predictive Smart Lift Monitoring & Remote Diagnostics',
      leadText: 'Cloud-connected vibration sensors, door cycle counters, and remote motor temperature telemetry.',
      checklist: [
        '24/7 Remote IoT Telemetry with live cloud alerts',
        'Early bearing failure detection via vibration analysis',
      ],
      workflowSteps: [
        { step: '01', title: 'Sensor Deployment', desc: 'Non-invasive sensor attachment to car top and machine bed.' },
        { step: '02', title: 'Gateway Integration', desc: '4G LTE gateway linking hoistway to central dispatch desk.' },
      ],
      equipmentBrands: ['Schindler', 'KONE', 'OTIS', 'Johnson'],
      faqs: [
        { question: 'Does this interfere with existing controllers?', answer: 'No, sensors are completely non-invasive.' },
      ],
      status: 'published',
    };

    const createRes = await fetch(`${baseUrl}/admin/services`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(newServicePayload),
    });

    const createBody = await createRes.json();
    console.log(`Create Service HTTP Status: ${createRes.status}`);

    if (createRes.status !== 201 || !createBody.success || !createBody.data?._id) {
      throw new Error(`Failed to create service: ${JSON.stringify(createBody)}`);
    }

    const createdServiceId = createBody.data._id;
    console.log(`✅ Service created successfully! ID: ${createdServiceId}, Slug: ${createBody.data.slug}`);

    // ----------------------------------------------------
    // STEP 4: Fetch Single Service via GET /api/admin/services/:id
    // ----------------------------------------------------
    console.log('\n--- STEP 4: Fetch Single Service via Admin Route ---');
    const getRes = await fetch(`${baseUrl}/admin/services/${createdServiceId}`, {
      method: 'GET',
      headers: authHeaders,
    });

    const getBody = await getRes.json();
    if (getRes.status !== 200 || getBody.data?.slug !== uniqueSlug) {
      throw new Error(`Failed to retrieve created service: ${JSON.stringify(getBody)}`);
    }
    console.log(`✅ Single record fetched: '${getBody.data.title}' (Status: ${getBody.data.status})`);

    // ----------------------------------------------------
    // STEP 5: Update Service via PUT /api/admin/services/:id
    // ----------------------------------------------------
    console.log('\n--- STEP 5: Update Service via PUT /api/admin/services/:id ---');
    const updatePayload = {
      title: 'IoT Predictive Lift Monitoring (Enterprise Edition)',
      leadText: 'Updated lead text: Enterprise-grade remote diagnostics with guaranteed 99.8% uptime SLA.',
    };

    const updateRes = await fetch(`${baseUrl}/admin/services/${createdServiceId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(updatePayload),
    });

    const updateBody = await updateRes.json();
    if (updateRes.status !== 200 || updateBody.data?.title !== updatePayload.title) {
      throw new Error(`Failed to update service: ${JSON.stringify(updateBody)}`);
    }
    console.log(`✅ Service updated successfully! New Title: '${updateBody.data.title}'`);

    // ----------------------------------------------------
    // STEP 6: Confirm Service Appears in Public API Before Soft-Delete
    // ----------------------------------------------------
    console.log('\n--- STEP 6: Verify Service Visible in Public API ---');
    const publicBeforeRes = await fetch(`${baseUrl}/services`);
    const publicBeforeBody = await publicBeforeRes.json();
    const isPresentInPublicBefore = publicBeforeBody.data.some((s: any) => s.slug === uniqueSlug);

    if (!isPresentInPublicBefore) {
      throw new Error(`Service ${uniqueSlug} was expected in public /api/services before archiving, but was missing.`);
    }
    console.log(`✅ Verified: Published service '${uniqueSlug}' is active in public /api/services.`);

    // ----------------------------------------------------
    // STEP 7: Soft Delete via DELETE /api/admin/services/:id
    // ----------------------------------------------------
    console.log('\n--- STEP 7: Soft Delete (Archive) via Admin Route ---');
    const deleteRes = await fetch(`${baseUrl}/admin/services/${createdServiceId}`, {
      method: 'DELETE',
      headers: authHeaders,
    });

    const deleteBody = await deleteRes.json();
    if (deleteRes.status !== 200 || deleteBody.data?.status !== 'archived') {
      throw new Error(`Failed to soft-delete service: ${JSON.stringify(deleteBody)}`);
    }
    console.log(`✅ Soft-delete response: ${JSON.stringify(deleteBody.data)}`);

    // ----------------------------------------------------
    // STEP 8: Verify Soft-Deleted Record is Excluded from Public API but Persists in DB
    // ----------------------------------------------------
    console.log('\n--- STEP 8: Verify Soft-Delete Behavior ---');
    // A: Check public API
    const publicAfterRes = await fetch(`${baseUrl}/services`);
    const publicAfterBody = await publicAfterRes.json();
    const isPresentInPublicAfter = publicAfterBody.data.some((s: any) => s.slug === uniqueSlug);

    if (isPresentInPublicAfter) {
      throw new Error(`Archived service ${uniqueSlug} still appears in public /api/services! Soft-delete isolation failed.`);
    }
    console.log(`✅ CONFIRMED: Archived service '${uniqueSlug}' no longer appears in public /api/services.`);

    // B: Check Database directly
    const dbRecord = await Service.findById(createdServiceId);
    if (!dbRecord) {
      throw new Error(`Record was HARD DELETED! It should still exist with status 'archived'.`);
    }
    if (dbRecord.status !== 'archived') {
      throw new Error(`Record status is '${dbRecord.status}', expected 'archived'.`);
    }
    console.log(`✅ CONFIRMED: Record STILL EXISTS in database with status: '${dbRecord.status}'.`);

    // C: Check Admin single fetch can still access archived record
    const adminGetArchivedRes = await fetch(`${baseUrl}/admin/services/${createdServiceId}`, {
      headers: authHeaders,
    });
    const adminGetArchivedBody = await adminGetArchivedRes.json();
    if (adminGetArchivedRes.status !== 200 || adminGetArchivedBody.data?.status !== 'archived') {
      throw new Error(`Admin endpoint failed to retrieve archived record: ${JSON.stringify(adminGetArchivedBody)}`);
    }
    console.log(`✅ CONFIRMED: Admin API can still retrieve the archived record for management.`);

    // ----------------------------------------------------
    // STEP 9: Test Leads Admin Routes
    // ----------------------------------------------------
    console.log('\n--- STEP 9: Test Leads Admin Routes ---');
    // 9A: Paginated Leads
    const leadsRes = await fetch(`${baseUrl}/admin/leads?page=1&limit=5`, {
      headers: authHeaders,
    });
    const leadsBody = await leadsRes.json();
    if (leadsRes.status !== 200 || !Array.isArray(leadsBody.data)) {
      throw new Error(`Failed to fetch admin leads: ${JSON.stringify(leadsBody)}`);
    }
    console.log(`✅ GET /api/admin/leads returned ${leadsBody.data.length} leads (Total: ${leadsBody.meta.total})`);

    // 9B: Single Lead & Status Update
    if (leadsBody.data.length > 0) {
      const targetLead = leadsBody.data[0];
      const leadDetailRes = await fetch(`${baseUrl}/admin/leads/${targetLead._id}`, {
        headers: authHeaders,
      });
      const leadDetailBody = await leadDetailRes.json();
      if (leadDetailRes.status !== 200 || leadDetailBody.data?._id !== targetLead._id) {
        throw new Error(`Failed to fetch lead detail: ${JSON.stringify(leadDetailBody)}`);
      }
      console.log(`✅ GET /api/admin/leads/:id retrieved lead for '${leadDetailBody.data.name}'`);

      // Update status
      const nextStatus = targetLead.status === 'New' ? 'Contacted' : 'Quoted';
      const patchRes = await fetch(`${baseUrl}/admin/leads/${targetLead._id}/status`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status: nextStatus }),
      });
      const patchBody = await patchRes.json();
      if (patchRes.status !== 200 || patchBody.data?.status !== nextStatus) {
        throw new Error(`Failed to update lead status: ${JSON.stringify(patchBody)}`);
      }
      console.log(`✅ PATCH /api/admin/leads/:id/status updated status to '${nextStatus}'`);
    }

    // 9C: CSV Export
    console.log('\n--- STEP 10: Test Leads CSV Export ---');
    const exportRes = await fetch(`${baseUrl}/admin/leads/export`, {
      headers: authHeaders,
    });

    if (exportRes.status !== 200) {
      throw new Error(`CSV export failed with status ${exportRes.status}`);
    }

    const contentType = exportRes.headers.get('content-type') || '';
    const contentDisp = exportRes.headers.get('content-disposition') || '';
    const csvData = await exportRes.text();

    if (!contentType.includes('text/csv') || !contentDisp.includes('attachment')) {
      throw new Error(`Invalid CSV headers: Content-Type=${contentType}, Content-Disposition=${contentDisp}`);
    }

    const csvLines = csvData.trim().split('\n');
    console.log(`✅ GET /api/admin/leads/export returned CSV format (${csvLines.length} lines)`);
    console.log(`   Header: ${csvLines[0]}`);

    // Clean up created test service record
    await Service.findByIdAndDelete(createdServiceId);

    console.log('\n====================================================');
    console.log('🎉 ALL ADMIN CRUD & LEADS VALIDATION TESTS PASSED!');
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

runAdminCrudValidation().catch((err) => {
  console.error('❌ Fatal test error:', err);
  process.exit(1);
});
