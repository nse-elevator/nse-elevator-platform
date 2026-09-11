import { z } from 'zod';

export const serviceSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  title: z.string().min(2, 'Title must be at least 2 characters').trim(),
  keywordHighlight: z.string().trim().optional(),
  categoryBadge: z.string().trim().optional(),
  metaTitle: z.string().min(2, 'Meta title is required').trim(),
  metaDescription: z.string().min(10, 'Meta description must be at least 10 characters').trim(),
  h1: z.string().min(2, 'H1 heading is required').trim(),
  leadText: z.string().min(10, 'Lead text must be at least 10 characters').trim(),
  checklist: z.array(z.string()).default([]),
  workflowSteps: z
    .array(
      z.object({
        step: z.string(),
        title: z.string(),
        desc: z.string(),
      })
    )
    .default([]),
  equipmentBrands: z.array(z.string()).default([]),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const locationSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  cityName: z.string().min(2, 'City name is required').trim(),
  state: z.string().min(2, 'State code/name is required').trim(),
  metaTitle: z.string().min(2, 'Meta title is required').trim(),
  metaDescription: z.string().min(10, 'Meta description must be at least 10 characters').trim(),
  slaMinutes: z.number().int().positive().default(45),
  branchAddress: z.string().min(2, 'Branch address is required').trim(),
  branchPhone: z.string().min(5, 'Branch phone is required').trim(),
  coveredZips: z.array(z.string()).default([]),
  countiesServed: z.array(z.string()).default([]),
  licenseNumbers: z.array(z.string()).default([]),
  regulatoryAuthority: z.string().trim().optional(),
  coordinates: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),
  localFaqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const industrySchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  name: z.string().min(2, 'Industry name is required').trim(),
  metaTitle: z.string().min(2, 'Meta title is required').trim(),
  metaDescription: z.string().min(10, 'Meta description must be at least 10 characters').trim(),
  description: z.string().min(10, 'Description must be at least 10 characters').trim(),
  relatedServices: z.array(z.string()).default([]),
  criticalChallenges: z.array(z.string()).default([]),
  vanguardSolutions: z.array(z.string()).default([]),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const caseStudySchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  buildingName: z.string().min(2, 'Building name is required').trim(),
  city: z.string().min(2, 'City is required').trim(),
  metaTitle: z.string().min(2, 'Meta title is required').trim(),
  metaDescription: z.string().min(10, 'Meta description must be at least 10 characters').trim(),
  scope: z.string().min(2, 'Scope is required').trim(),
  units: z.string().min(1, 'Units is required').trim(),
  problem: z.string().min(10, 'Problem description must be at least 10 characters').trim(),
  solution: z.string().min(10, 'Solution description must be at least 10 characters').trim(),
  resultsSummary: z.string().min(10, 'Results summary is required').trim(),
  results: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  servicesPerformed: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  isPlaceholder: z.boolean().optional().default(false),
  angleTag: z.string().trim().optional(),
  pullQuote: z
    .object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
    })
    .optional(),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const blogPostSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  title: z.string().min(2, 'Post title is required').trim(),
  metaTitle: z.string().min(2, 'Meta title is required').trim(),
  metaDescription: z.string().min(10, 'Meta description must be at least 10 characters').trim(),
  content: z.string().min(10, 'Post content is required').trim(),
  lead: z.string().trim().optional(),
  author: z.string().min(2, 'Author name is required').trim(),
  authorTitle: z.string().min(2, 'Author title is required').trim(),
  readingTime: z.string().default('5 min read'),
  category: z.string().min(2, 'Category is required').trim(),
  sections: z
    .array(
      z.object({
        heading: z.string(),
        content: z.string(),
      })
    )
    .default([]),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  publishedAt: z.coerce.date().default(() => new Date()),
});

export const jobPostingSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  title: z.string().min(2, 'Job title is required').trim(),
  description: z.string().min(10, 'Job description must be at least 10 characters').trim(),
  salaryRange: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    display: z.string().min(1, 'Display salary string is required'),
  }),
  location: z.string().min(2, 'Location is required').trim(),
  city: z.string().min(2, 'City is required').trim(),
  state: z.string().min(2, 'State is required').trim(),
  responsibilities: z.array(z.string()).default([]),
  qualifications: z.array(z.string()).default([]),
  employmentType: z.string().default('FULL_TIME'),
  status: z.enum(['draft', 'published', 'closed', 'archived']).default('published'),
  validThrough: z.coerce.date().optional(),
  datePosted: z.coerce.date().default(() => new Date()),
});

export const testimonialSchema = z.object({
  authorName: z.string().min(2, 'Author name is required').trim(),
  jobTitle: z.string().min(2, 'Job title is required').trim(),
  company: z.string().min(2, 'Company name is required').trim(),
  quote: z.string().min(10, 'Quote must be at least 10 characters').trim(),
  rating: z.number().min(1).max(5).default(5),
  buildingPortfolioSize: z.string().min(1, 'Building portfolio size is required').trim(),
  location: z.string().trim().optional(),
  isPlaceholder: z.boolean().optional().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const leadStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Quoted', 'Converted', 'Lost']),
});
