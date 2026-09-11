import mongoose, { Schema, Document } from 'mongoose';

export type LeadStatus = 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Lost';
export type LeadScoreBucket = 'Low' | 'Medium' | 'High';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  buildingName?: string;
  address?: string;
  propertyType?: string;
  elevatorCount: number;
  serviceUrgency?: string;
  message?: string;
  source: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  gclid?: string;
  fbclid?: string;
  anonymousId?: string;
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
  leadScore: number;
  leadScoreBucket: LeadScoreBucket;
  firstContactedAt?: Date | null;
  returningVisitor: boolean;
  visitCount: number;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    buildingName: { type: String, trim: true },
    address: { type: String, trim: true },
    propertyType: { type: String, trim: true },
    elevatorCount: { type: Number, default: 1 },
    serviceUrgency: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, default: 'website' },
    utmParams: {
      source: { type: String },
      medium: { type: String },
      campaign: { type: String },
      term: { type: String },
      content: { type: String },
    },
    gclid: { type: String, index: true },
    fbclid: { type: String, index: true },
    anonymousId: { type: String, index: true },
    approxLocation: {
      city: { type: String, trim: true },
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
      consentedAt: { type: Date },
    },
    leadScore: { type: Number, default: 50, index: true },
    leadScoreBucket: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
      index: true,
    },
    firstContactedAt: { type: Date, default: null },
    returningVisitor: { type: Boolean, default: false, index: true },
    visitCount: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quoted', 'Converted', 'Lost'],
      default: 'New',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indices
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ leadScore: -1, createdAt: -1 });

export const Lead = (mongoose.models.Lead as mongoose.Model<ILead>) || mongoose.model<ILead>('Lead', LeadSchema);
