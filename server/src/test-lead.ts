import { AddressInfo } from 'net';
import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { Lead } from './models/Lead';

async function testLeadCapture() {
  console.log('🧪 [Test] Connecting to DB...');
  await connectDB();

  const app = createApp();
  // Listen on port 0 to let the OS assign any available free port
  const server = app.listen(0);
  const port = (server.address() as AddressInfo).port;
  console.log(`🧪 [Test] Test server listening on ephemeral port: ${port}`);

  try {
    const testPayload = {
      name: 'Elena Rostova',
      email: 'erostova@chicagorealestate.com',
      phone: '(312) 555-0199',
      buildingName: 'Michigan Avenue Atrium',
      address: '600 N Michigan Ave, Chicago, IL',
      propertyType: 'Commercial Office Tower',
      elevatorCount: 6,
      serviceUrgency: 'Emergency Breakdown',
      message: 'Car #2 is stuck at floor 8 with door operator fault. Need immediate dispatch.',
      source: 'test-suite',
    };

    console.log('🧪 [Test] Sending POST /api/leads request...');
    const response = await fetch(`http://localhost:${port}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });

    const result = await response.json();
    console.log('🧪 [Test] HTTP Status:', response.status);
    console.log('🧪 [Test] Response Envelope:', JSON.stringify(result, null, 2));

    if (response.status === 201 && result.success) {
      console.log('✅ [Test] Lead API responded with 201 Created and success=true');

      // Verify in MongoDB
      const savedLead = await Lead.findById(result.data.id);
      if (savedLead && savedLead.name === testPayload.name) {
        console.log(`✅ [Test] Lead confirmed in MongoDB with ID: ${savedLead._id}, status: ${savedLead.status}`);
      } else {
        throw new Error('Lead not found in database!');
      }
    } else {
      throw new Error(`Lead creation failed with status ${response.status}`);
    }
  } finally {
    server.close();
    await disconnectDB();
    console.log('🧪 [Test] Server and DB closed cleanly.');
  }
}

testLeadCapture()
  .then(() => {
    console.log('🎉 [Test] All checks passed. Exiting process.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ [Test Failed]:', err);
    process.exit(1);
  });
