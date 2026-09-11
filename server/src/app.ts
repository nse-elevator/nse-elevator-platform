import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import apiRouter from './routes';
import { publicApiRateLimiter } from './middleware/rateLimiter';
import { errorHandler, sendError } from './middleware/errorHandler';

export function createApp(): express.Application {
  const app = express();

  // Security & Cross-Origin Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or SSR fetch)
        if (!origin) return callback(null, true);
        if (origin === config.ALLOWED_ORIGIN || origin === 'http://localhost:3000' || origin === 'http://127.0.0.1:3000') {
          return callback(null, true);
        }
        return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Request body parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // General rate limiting on all /api routes
  app.use('/api', publicApiRateLimiter);

  // Mount API endpoints
  app.use('/api', apiRouter);

  // 404 Handler for unmatched routes
  app.use((req, res) => {
    return sendError(res, 'ROUTE_NOT_FOUND', `Route ${req.method} ${req.originalUrl} does not exist`, 404);
  });

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
}

export default createApp;
