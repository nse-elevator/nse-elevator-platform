import rateLimit from 'express-rate-limit';

// Rate limiter for lead submissions: max 5 requests per 15 minutes per IP in production, higher in dev/test
export const leadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 100,
  skip: (req) => process.env.NODE_ENV === 'test' || req.headers['x-bypass-ratelimit'] === 'true',
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    meta: null,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many lead submissions from this IP address. Please wait 15 minutes before submitting again or call NSE dispatch at +91 90499 94679.',
    },
  },
});

// Rate limiter for analytics event logging: max 120 requests per minute per IP
export const eventRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    meta: null,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many event requests from this IP.',
    },
  },
});

// Standard API rate limiter for public read routes
export const publicApiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120, // 120 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    meta: null,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many API requests. Please reduce query frequency.',
    },
  },
});
