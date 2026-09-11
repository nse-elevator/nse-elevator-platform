import mongoose, { Schema, Document } from 'mongoose';

export interface IIndustry extends Document {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  relatedServices: string[];
  criticalChallenges: string[];
  vanguardSolutions: string[];
  faqs: Array<{ question: string; answer: string }>;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    description: { type: String, required: true },
    relatedServices: [{ type: String }],
    criticalChallenges: [{ type: String }],
    vanguardSolutions: [{ type: String }],
    faqs: [
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

export const Industry = (mongoose.models.Industry as mongoose.Model<IIndustry>) || mongoose.model<IIndustry>('Industry', IndustrySchema);
