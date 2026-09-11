import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { eventRateLimiter } from '../middleware/rateLimiter';
import { sendSuccess, sendError } from '../middleware/errorHandler';
import { lookupIpLocation } from '../services/geoService';

const router = Router();

const createEventSchema = z.object({
  eventType: z.string().min(1).max(100),
  pageUrl: z.string().min(1).max(500),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  gclid: z.string().max(250).optional(),
  fbclid: z.string().max(250).optional(),
  anonymousId: z.string().max(100).optional(),
  deviceType: z.enum(['desktop', 'mobile', 'tablet']).optional(),
  contactMethod: z.enum(['phone', 'whatsapp']).optional(),
  stepNumber: z.number().int().min(1).max(10).optional(),
  timeSpentMs: z.number().nonnegative().optional(),
  scrollDepth: z.number().min(0).max(100).optional(),
  leadId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Lead ID').optional(),
  metadata: z.record(z.any()).optional(),
  approxLocation: z
    .object({
      city: z.string().optional(),
      region: z.string().optional(),
      country: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      source: z.literal('ip').optional(),
    })
    .optional(),
  preciseLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
      source: z.literal('gps'),
      consentedAt: z.coerce.date().optional(),
    })
    .optional(),
});

// POST /api/events/location - Public silent IP-geolocation endpoint (rate-limited)
router.post('/location', eventRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { anonymousId, pageUrl } = req.body || {};
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    const ipHash = clientIp ? crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 16) : undefined;
    const userAgent = req.headers['user-agent'] || '';

    const approxLocation = await lookupIpLocation(clientIp);

    // Record session_location event tied to anonymousId
    const event = await AnalyticsEvent.create({
      eventType: 'session_location',
      pageUrl: pageUrl || '/',
      anonymousId,
      approxLocation,
      ipHash,
      userAgent: userAgent.substring(0, 250),
      timestamp: new Date(),
    });

    return sendSuccess(
      res,
      {
        id: event._id,
        approxLocation,
      },
      undefined,
      200
    );
  } catch (error) {
    return next(error);
  }
});

// POST /api/events - Public write-only telemetry collector (rate-limited)
router.post('/', eventRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = createEventSchema.safeParse(req.body);

    if (!parseResult.success) {
      return sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid analytics event payload',
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    const {
      eventType,
      pageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      gclid,
      fbclid,
      anonymousId,
      deviceType,
      contactMethod,
      stepNumber,
      timeSpentMs,
      scrollDepth,
      leadId,
      metadata,
      approxLocation,
      preciseLocation,
    } = parseResult.data;

    // Optional IP anonymization hash
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    const ipHash = clientIp ? crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 16) : undefined;
    const userAgent = req.headers['user-agent'] || '';

    // Auto-detect deviceType if not provided
    let detectedDevice: 'desktop' | 'mobile' | 'tablet' = deviceType || 'desktop';
    if (!deviceType && userAgent) {
      if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
        detectedDevice = 'tablet';
      } else if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(userAgent)) {
        detectedDevice = 'mobile';
      }
    }

    const event = await AnalyticsEvent.create({
      eventType,
      pageUrl,
      utmSource: utmSource || 'direct',
      utmMedium: utmMedium || 'none',
      utmCampaign: utmCampaign || 'none',
      gclid,
      fbclid,
      anonymousId,
      deviceType: detectedDevice,
      contactMethod,
      stepNumber,
      timeSpentMs,
      scrollDepth,
      leadId: leadId ? leadId : undefined,
      metadata: metadata || {},
      approxLocation,
      preciseLocation,
      ipHash,
      userAgent: userAgent.substring(0, 250),
      timestamp: new Date(),
    });

    return sendSuccess(
      res,
      {
        id: event._id,
        eventType: event.eventType,
        recorded: true,
      },
      undefined,
      201
    );
  } catch (error) {
    return next(error);
  }
});

export default router;
