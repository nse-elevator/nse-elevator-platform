import mongoose, { Schema, Document } from 'mongoose';

export interface IJobPosting extends Document {
  slug: string;
  title: string;
  description: string;
  salaryRange: {
    min: number;
    max: number;
    display: string;
  };
  location: string;
  city: string;
  state: string;
  responsibilities: string[];
  qualifications: string[];
  employmentType: string;
  status: 'draft' | 'published' | 'closed' | 'archived';
  validThrough?: Date;
  datePosted: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobPostingSchema: Schema = new Schema(
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
    description: { type: String, required: true },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      display: { type: String, required: true },
    },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],
    employmentType: { type: String, default: 'FULL_TIME' },
    status: {
      type: String,
      enum: ['draft', 'published', 'closed', 'archived'],
      default: 'published',
      index: true,
    },
    validThrough: { type: Date },
    datePosted: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const JobPosting = (mongoose.models.JobPosting as mongoose.Model<IJobPosting>) || mongoose.model<IJobPosting>('JobPosting', JobPostingSchema);
