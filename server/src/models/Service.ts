import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IService extends Document {
  slug: string;
  title: string;
  keywordHighlight?: string;
  categoryBadge?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  leadText: string;
  checklist: string[];
  workflowSteps: IWorkflowStep[];
  equipmentBrands: string[];
  faqs: IFaq[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    keywordHighlight: { type: String, trim: true },
    categoryBadge: { type: String, trim: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    h1: { type: String, required: true },
    leadText: { type: String, required: true },
    checklist: [{ type: String }],
    workflowSteps: [
      {
        step: { type: String, required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    equipmentBrands: [{ type: String }],
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

export const Service = (mongoose.models.Service as mongoose.Model<IService>) || mongoose.model<IService>('Service', ServiceSchema);
