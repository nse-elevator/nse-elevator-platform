import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
  slug: string;
  buildingName: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  scope: string;
  units: string;
  problem: string;
  solution: string;
  resultsSummary: string;
  results: Array<{ label: string; value: string }>;
  servicesPerformed: string[];
  images: string[];
  isPlaceholder?: boolean;
  angleTag?: string;
  pullQuote?: {
    quote: string;
    author: string;
    role: string;
  };
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    buildingName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    scope: { type: String, required: true },
    units: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    resultsSummary: { type: String, required: true },
    results: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    servicesPerformed: [{ type: String }],
    images: [{ type: String }],
    isPlaceholder: { type: Boolean, default: false, index: true },
    angleTag: { type: String, trim: true },
    pullQuote: {
      quote: { type: String },
      author: { type: String },
      role: { type: String },
    },
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

export const CaseStudy = (mongoose.models.CaseStudy as mongoose.Model<ICaseStudy>) || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
