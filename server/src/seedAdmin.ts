import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from './config/db';
import { config } from './config/env';
import { User } from './models/User';

async function seedAdmin() {
  console.log('====================================================');
  console.log('🛡️  NSE – New Sahyadri Elevator Platform - Admin Seeder');
  console.log('====================================================');

  const email = (process.env.ADMIN_SEED_EMAIL || config.ADMIN_SEED_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD || config.ADMIN_SEED_PASSWORD || '';
  const name = process.env.ADMIN_SEED_NAME || config.ADMIN_SEED_NAME || 'System Administrator';

  if (!email || !password) {
    console.error('❌ [Seed Admin Error]: Missing required environment variables.');
    console.error('   Please set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in your environment or .env.local file.');
    console.error('   Example:');
    console.error('     ADMIN_SEED_EMAIL=admin@placeholder-client.com');
    console.error('     ADMIN_SEED_PASSWORD=YourSecurePassword123!');
    process.exit(1);
  }

  console.log(`[Seed Admin] Connecting to database...`);
  await connectDB();

  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({ email });
    const passwordHash = await bcrypt.hash(password, 10);

    if (existingUser) {
      console.log(`[Seed Admin] Admin user found with email: ${email}. Updating credentials...`);
      existingUser.passwordHash = passwordHash;
      existingUser.role = 'admin';
      existingUser.name = name;
      await existingUser.save();

      console.log('✅ [Seed Admin] Existing admin user credentials updated successfully.');
      console.log(`   User ID: ${existingUser._id}`);
      console.log(`   Email:   ${existingUser.email}`);
      console.log(`   Role:    ${existingUser.role}`);
    } else {
      console.log(`[Seed Admin] Creating new admin account for ${email}...`);
      const newUser = await User.create({
        name,
        email,
        passwordHash,
        role: 'admin',
      });

      console.log('✅ [Seed Admin] Initial admin user created successfully.');
      console.log(`   User ID: ${newUser._id}`);
      console.log(`   Email:   ${newUser.email}`);
      console.log(`   Role:    ${newUser.role}`);
    }
  } catch (error) {
    console.error('❌ [Seed Admin Error]:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
    console.log('====================================================');
    process.exit(0);
  }
}

seedAdmin().catch((err) => {
  console.error('❌ [Fatal Seed Admin Error]:', err);
  process.exit(1);
});
