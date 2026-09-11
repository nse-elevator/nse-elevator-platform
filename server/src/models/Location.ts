import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  slug: string;
  cityName: string;
  state: string;
  metaTitle: string;
  metaDescription: string;
  slaMinutes: number;
  branchAddress: string;
  branchPhone: string;
  coveredZips: string[];
  countiesServed: string[];
  licenseNumbers?: string[];
  regulatoryAuthority?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  localFaqs: Array<{ question: string; answer: string }>;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    cityName: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    slaMinutes: { type: Number, default: 45 },
    branchAddress: { type: String, required: true },
    branchPhone: { type: String, required: true },
    coveredZips: [{ type: String }],
    countiesServed: [{ type: String }],
    licenseNumbers: [{ type: String }],
    regulatoryAuthority: { type: String, required: false },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    localFaqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Location = (mongoose.models.Location as mongoose.Model<ILocation>) || mongoose.model<ILocation>('Location', LocationSchema);
