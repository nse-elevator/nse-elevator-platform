import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  eventType: string;
  pageUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  fbclid?: string;
  anonymousId?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  contactMethod?: 'phone' | 'whatsapp';
  stepNumber?: number;
  timeSpentMs?: number;
  scrollDepth?: number;
  leadId?: mongoose.Types.ObjectId;
  approxLocation?: {
    city?: string;
    region?: string;
    country?: string;
    lat?: number;
    lng?: number;
    source: 'ip';
  };
  preciseLocation?: {
    lat: number;
    lng: number;
    source: 'gps';
    consentedAt: Date;
  };
  metadata?: Record<string, any>;
  ipHash?: string;
  userAgent?: string;
  timestamp: Date;
  createdAt: Date;
}

const AnalyticsEventSchema: Schema = new Schema(
  {
    eventType: {
      type: String,
      required: true,
      index: true,
    },
    pageUrl: {
      type: String,
      required: true,
      index: true,
    },
    utmSource: {
      type: String,
      default: 'direct',
      index: true,
    },
    utmMedium: {
      type: String,
      default: 'none',
    },
    utmCampaign: {
      type: String,
      default: 'none',
    },
    gclid: {
      type: String,
      required: false,
      index: true,
    },
    fbclid: {
      type: String,
      required: false,
      index: true,
    },
    anonymousId: {
      type: String,
      required: false,
      index: true,
    },
    deviceType: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet'],
      default: 'desktop',
    },
    contactMethod: {
      type: String,
      enum: ['phone', 'whatsapp'],
      required: false,
      index: true,
    },
    stepNumber: {
      type: Number,
      required: false,
    },
    timeSpentMs: {
      type: Number,
      required: false,
    },
    scrollDepth: {
      type: Number,
      required: false,
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
      required: false,
    },
    approxLocation: {
      city: { type: String, trim: true, index: true },
      region: { type: String, trim: true },
      country: { type: String, trim: true },
      lat: { type: Number },
      lng: { type: Number },
      source: { type: String, default: 'ip' },
    },
    preciseLocation: {
      lat: { type: Number },
      lng: { type: Number },
      source: { type: String, default: 'gps' },
      consentedAt: { type: Date, default: Date.now },
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipHash: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound index for querying events by type and timestamp
AnalyticsEventSchema.index({ eventType: 1, timestamp: -1 });
AnalyticsEventSchema.index({ anonymousId: 1, timestamp: -1 });

export const AnalyticsEvent =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
