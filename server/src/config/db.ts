import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { config } from './env';

// Track in-memory or child process instance for teardown if applicable
let memoryServer: any = null;

export async function connectDB(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  try {
    // 1. Attempt standard connection to specified persistent MONGODB_URI
    await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] ✅ Connected to PERSISTENT database: ${config.MONGODB_URI}`);
    return mongoose;
  } catch (err) {
    console.warn(`[MongoDB] Could not connect directly to ${config.MONGODB_URI}: ${(err as Error).message}`);

    // 2. In development, fallback to local persistent disk storage or in-memory
    if (config.NODE_ENV !== 'production') {
      try {
        console.log('[MongoDB] Initializing local database runner with persistent storage...');
        const dataDir = path.resolve(process.cwd(), '.data/db');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }

        const { MongoMemoryServer } = await import('mongodb-memory-server');
        // Configure with local disk path to guarantee data persistence between server runs
        memoryServer = await MongoMemoryServer.create({
          instance: {
            dbPath: dataDir,
            port: 27017,
            dbName: 'vanguard_elevator',
          },
        });
        const uri = memoryServer.getUri('vanguard_elevator');
        await mongoose.connect(uri);
        console.log(`[MongoDB] ✅ Connected to persistent local instance at: ${uri}`);
        return mongoose;
      } catch (memErr) {
        console.warn('[MongoDB] Persistent local runner fallback error:', (memErr as Error).message);
        // Fallback to ephemeral in-memory if port 27017 or dbPath was locked
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create({
          instance: {
            dbName: 'vanguard_elevator',
          },
        });
        const uri = memoryServer.getUri('vanguard_elevator');
        await mongoose.connect(uri);
        console.log(`[MongoDB] ⚠️ Connected to ephemeral in-memory fallback: ${uri}`);
        return mongoose;
      }
    }
    throw err;
  }
}

export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}
