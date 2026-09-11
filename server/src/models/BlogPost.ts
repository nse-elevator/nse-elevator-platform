import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  lead?: string;
  author: string;
  authorTitle: string;
  readingTime: string;
  category: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
  status: 'draft' | 'published' | 'archived';
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
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
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    content: { type: String, required: true },
    lead: { type: String },
    author: { type: String, required: true },
    authorTitle: { type: String, required: true },
    readingTime: { type: String, required: true },
    category: { type: String, required: true },
    sections: [
      {
        heading: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
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
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const BlogPost = (mongoose.models.BlogPost as mongoose.Model<IBlogPost>) || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
