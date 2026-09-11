import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  authorName: string;
  jobTitle: string;
  company: string;
  quote: string;
  rating: number;
  buildingPortfolioSize: string;
  location?: string;
  isPlaceholder?: boolean;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    authorName: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    buildingPortfolioSize: { type: String, required: true },
    location: { type: String },
    isPlaceholder: { type: Boolean, default: false, index: true },
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

export const Testimonial = (mongoose.models.Testimonial as mongoose.Model<ITestimonial>) || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
