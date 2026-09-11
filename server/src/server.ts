import { createApp } from './app';
import { config } from './config/env';
import { connectDB } from './config/db';

async function bootstrap() {
  try {
    // 1. Connect to MongoDB database
    await connectDB();

    // 2. Initialize Express application
    const app = createApp();

    // 3. Start listening on configured port
    const server = app.listen(config.PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 NSE – New Sahyadri Elevator API Server Running`);
      console.log(`📡 URL: http://localhost:${config.PORT}/api`);
      console.log(`🌐 Allowed Origin: ${config.ALLOWED_ORIGIN}`);
      console.log(`🗄️ Database: ${config.MONGODB_URI}`);
      console.log(`⚡ Mode: ${config.NODE_ENV}`);
      console.log(`====================================================`);
    });

    // Graceful shutdown handling
    const shutdown = async () => {
      console.log('\n[Server] Shutting down gracefully...');
      server.close(() => {
        console.log('[Server] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('[Server Bootstrap Failed]:', error);
    process.exit(1);
  }
}

bootstrap();
