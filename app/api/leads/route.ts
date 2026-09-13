import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '../../../lib/db';
import { Lead, LeadScoreBucket } from '../../../server/src/models/Lead';
import { AnalyticsEvent } from '../../../server/src/models/AnalyticsEvent';
import { sendLeadNotificationEmail } from '../../../server/src/services/emailService';

// Lead creation validation schema matching production requirements
const createLeadSchema = z.object({
  name: z.string().min(2, 'Contact name is required').trim(),
  email: z.string().email('Valid email address is required').trim().toLowerCase(),
  phone: z.string().min(8, 'Valid phone number is required').trim(),
  buildingName: z.string().trim().optional().default(''),
  address: z.string().trim().optional().default(''),
  propertyType: z.string().trim().optional().default('Co-operative Housing Society (CHS)'),
  elevatorCount: z.coerce.number().int().min(1).default(1),
  serviceUrgency: z.string().trim().optional().default('maintenance'),
  message: z.string().trim().optional().default(''),
  source: z.string().trim().optional().default('/contact/request-maintenance-quote'),
  utmParams: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  anonymousId: z.string().optional(),
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
      consentedAt: z.coerce.date(),
    })
    .optional(),
});

function calculateLeadScore(
  propertyType?: string,
  elevatorCount: number = 1,
  serviceUrgency?: string
): { score: number; bucket: LeadScoreBucket } {
  let score = 30; // baseline

  const pType = (propertyType || '').toLowerCase();
  if (pType.includes('commercial') || pType.includes('office') || pType.includes('hospital')) {
    score += 25;
  } else if (pType.includes('chs') || pType.includes('housing') || pType.includes('residential')) {
    score += 15;
  }

  if (elevatorCount >= 6) {
    score += 25;
  } else if (elevatorCount >= 3) {
    score += 15;
  } else if (elevatorCount > 1) {
    score += 5;
  }

  const urgency = (serviceUrgency || '').toLowerCase();
  if (urgency.includes('emergency') || urgency.includes('repair') || urgency.includes('stoppage')) {
    score += 20;
  } else if (urgency.includes('modernization') || urgency.includes('maintenance')) {
    score += 15;
  }

  score = Math.min(100, Math.max(10, score));
  let bucket: LeadScoreBucket = 'Low';
  if (score >= 75) bucket = 'High';
  else if (score >= 45) bucket = 'Medium';

  return { score, bucket };
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json().catch(() => ({}));
    const parseResult = createLeadSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please check the submitted form fields',
            details: parseResult.error.flatten().fieldErrors,
          },
        },
        { status: 422 }
      );
    }

    const data = parseResult.data;
    const { score: leadScore, bucket: leadScoreBucket } = calculateLeadScore(
      data.propertyType,
      data.elevatorCount,
      data.serviceUrgency
    );

    let returningVisitor = false;
    let visitCount = 1;

    if (data.anonymousId) {
      try {
        const priorEvents = await AnalyticsEvent.countDocuments({ anonymousId: data.anonymousId });
        if (priorEvents > 0) {
          returningVisitor = true;
          visitCount = priorEvents + 1;
        }
      } catch {}
    }

    const newLead = await Lead.create({
      ...data,
      leadScore,
      leadScoreBucket,
      returningVisitor,
      visitCount,
      status: 'New',
    });

    // Send asynchronous email notification (won't block HTTP response)
    try {
      sendLeadNotificationEmail(newLead).catch((err) => {
        console.warn('[Lead Notification] Email dispatch notice:', err.message);
      });
    } catch {}

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newLead._id,
          name: newLead.name,
          buildingName: newLead.buildingName,
          leadScore: newLead.leadScore,
          leadScoreBucket: newLead.leadScoreBucket,
          status: newLead.status,
          createdAt: newLead.createdAt,
          message: 'Your service request has been received by New Sahyadri Elevator Dispatch. An engineer will follow up shortly.',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Leads API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An internal error occurred while processing your enquiry. Please try again or call our hotline.',
        },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'NSE Lead Ingestion Endpoint Active',
  });
}
