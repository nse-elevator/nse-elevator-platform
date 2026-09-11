import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Lead, LeadScoreBucket } from '../models/Lead';
import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { leadRateLimiter } from '../middleware/rateLimiter';
import { sendSuccess, sendError } from '../middleware/errorHandler';
import { sendLeadNotificationEmail } from '../services/emailService';

const router = Router();

// Zod schema for lead validation
const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(25),
  buildingName: z.string().max(150).optional(),
  address: z.string().max(250).optional(),
  propertyType: z.string().max(100).optional(),
  elevatorCount: z.coerce.number().int().min(1).max(200).default(1),
  serviceUrgency: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).default('website'),
  utmParams: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  gclid: z.string().max(250).optional(),
  fbclid: z.string().max(250).optional(),
  anonymousId: z.string().max(100).optional(),
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

/**
 * Computes a weighted lead quality score (0-100) based on commercial viability, volume, and urgency.
 */
function calculateLeadScore(
  propertyType?: string,
  elevatorCount: number = 1,
  serviceUrgency?: string
): { score: number; bucket: LeadScoreBucket } {
  let score = 0;

  // 1. Property Type Weighting (max 45)
  const prop = (propertyType || '').toLowerCase();
  if (prop.includes('hospital') || prop.includes('healthcare')) {
    score += 45;
  } else if (prop.includes('commercial') || prop.includes('office') || prop.includes('it park')) {
    score += 40;
  } else if (prop.includes('chs') || prop.includes('housing') || prop.includes('society') || prop.includes('residential') || prop.includes('condo') || prop.includes('hoa')) {
    score += 35;
  } else if (prop.includes('hotel') || prop.includes('industrial') || prop.includes('warehouse')) {
    score += 30;
  } else {
    score += 15;
  }

  // 2. Elevator Count Weighting (max 40)
  if (elevatorCount >= 10) {
    score += 40;
  } else if (elevatorCount >= 5) {
    score += 30;
  } else if (elevatorCount >= 2) {
    score += 20;
  } else {
    score += 10;
  }

  // 3. Service Urgency Weighting (max 30)
  const urgency = (serviceUrgency || '').toLowerCase();
  if (urgency.includes('emergency') || urgency.includes('repair') || urgency.includes('breakdown')) {
    score += 30;
  } else if (urgency.includes('modernization') || urgency.includes('survey')) {
    score += 25;
  } else if (urgency.includes('maintenance') || urgency.includes('inspection') || urgency.includes('audit')) {
    score += 20;
  } else {
    score += 10;
  }

  // Normalize to 0–100 scale
  const normalizedScore = Math.min(100, Math.max(10, score));

  let bucket: LeadScoreBucket = 'Medium';
  if (normalizedScore >= 80) {
    bucket = 'High';
  } else if (normalizedScore < 50) {
    bucket = 'Low';
  }

  return { score: normalizedScore, bucket };
}

// POST /api/leads - submit a lead (rate-limited, validated, scored, emailed)
router.post('/', leadRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = createLeadSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return sendError(
        res,
        'VALIDATION_ERROR',
        'Please check the submitted form fields',
        422,
        fieldErrors
      );
    }

    const validatedData = parseResult.data;

    // 1. Calculate weighted lead score
    const { score: leadScore, bucket: leadScoreBucket } = calculateLeadScore(
      validatedData.propertyType,
      validatedData.elevatorCount,
      validatedData.serviceUrgency
    );

    // 2. Identify returning visitors via matching anonymousId from prior telemetry events
    let returningVisitor = false;
    let visitCount = 1;

    if (validatedData.anonymousId) {
      const priorEventsCount = await AnalyticsEvent.countDocuments({
        anonymousId: validatedData.anonymousId,
      });
      if (priorEventsCount > 0) {
        returningVisitor = true;
        visitCount = priorEventsCount + 1;
      }
    }

    // 3. Create lead in MongoDB with calculated scoring and intelligence
    const lead = await Lead.create({
      ...validatedData,
      leadScore,
      leadScoreBucket,
      returningVisitor,
      visitCount,
      status: 'New',
    });

    // 4. Asynchronously dispatch email notification (non-blocking for fast response)
    sendLeadNotificationEmail(lead).catch((err) => {
      console.error('[LeadsRoute] Background email dispatch failed:', err);
    });

    return sendSuccess(
      res,
      {
        id: lead._id,
        name: lead.name,
        buildingName: lead.buildingName,
        leadScore: lead.leadScore,
        leadScoreBucket: lead.leadScoreBucket,
        returningVisitor: lead.returningVisitor,
        status: lead.status,
        createdAt: lead.createdAt,
        message: 'Your service request has been received by New Sahyadri Elevator Dispatch. An engineer will follow up shortly.',
      },
      undefined,
      201
    );
  } catch (error) {
    return next(error);
  }
});

export default router;
