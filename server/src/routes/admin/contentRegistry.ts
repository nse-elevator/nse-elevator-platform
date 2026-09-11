import mongoose from 'mongoose';
import { z } from 'zod';
import {
  Service,
  Location,
  Industry,
  CaseStudy,
  BlogPost,
  JobPosting,
  Testimonial,
} from '../../models';
import {
  serviceSchema,
  locationSchema,
  industrySchema,
  caseStudySchema,
  blogPostSchema,
  jobPostingSchema,
  testimonialSchema,
} from '../../validation/contentSchemas';

export interface ContentTypeDefinition<T = any> {
  key: string;
  aliases: string[];
  displayName: string;
  model: mongoose.Model<any>;
  createSchema: z.ZodSchema<any>;
  updateSchema: z.ZodSchema<any>;
  searchFields: string[];
  slugField?: string;
  slugSourceField?: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const contentDefinitions: ContentTypeDefinition[] = [
  {
    key: 'services',
    aliases: ['service', 'services'],
    displayName: 'Service',
    model: Service,
    createSchema: serviceSchema,
    updateSchema: serviceSchema.partial(),
    searchFields: ['title', 'slug', 'keywordHighlight', 'categoryBadge', 'h1'],
    slugField: 'slug',
    slugSourceField: 'title',
  },
  {
    key: 'locations',
    aliases: ['location', 'locations'],
    displayName: 'Location',
    model: Location,
    createSchema: locationSchema,
    updateSchema: locationSchema.partial(),
    searchFields: ['cityName', 'state', 'slug', 'branchAddress', 'regulatoryAuthority'],
    slugField: 'slug',
    slugSourceField: 'cityName',
  },
  {
    key: 'industries',
    aliases: ['industry', 'industries'],
    displayName: 'Industry',
    model: Industry,
    createSchema: industrySchema,
    updateSchema: industrySchema.partial(),
    searchFields: ['name', 'slug', 'description'],
    slugField: 'slug',
    slugSourceField: 'name',
  },
  {
    key: 'case-studies',
    aliases: ['case-study', 'case-studies', 'casestudy', 'casestudies'],
    displayName: 'Case Study',
    model: CaseStudy,
    createSchema: caseStudySchema,
    updateSchema: caseStudySchema.partial(),
    searchFields: ['buildingName', 'city', 'slug', 'scope'],
    slugField: 'slug',
    slugSourceField: 'buildingName',
  },
  {
    key: 'blog',
    aliases: ['blog', 'blogs', 'blog-post', 'blog-posts', 'blogpost', 'blogposts'],
    displayName: 'Blog Post',
    model: BlogPost,
    createSchema: blogPostSchema,
    updateSchema: blogPostSchema.partial(),
    searchFields: ['title', 'slug', 'author', 'category'],
    slugField: 'slug',
    slugSourceField: 'title',
  },
  {
    key: 'careers',
    aliases: ['career', 'careers', 'job-posting', 'job-postings', 'jobposting', 'jobpostings'],
    displayName: 'Job Posting',
    model: JobPosting,
    createSchema: jobPostingSchema,
    updateSchema: jobPostingSchema.partial(),
    searchFields: ['title', 'slug', 'city', 'state', 'location'],
    slugField: 'slug',
    slugSourceField: 'title',
  },
  {
    key: 'testimonials',
    aliases: ['testimonial', 'testimonials'],
    displayName: 'Testimonial',
    model: Testimonial,
    createSchema: testimonialSchema,
    updateSchema: testimonialSchema.partial(),
    searchFields: ['authorName', 'company', 'jobTitle', 'quote'],
  },
];

// Build fast lookup map by lowercase alias
export const contentRegistry = new Map<string, ContentTypeDefinition>();

for (const def of contentDefinitions) {
  contentRegistry.set(def.key.toLowerCase(), def);
  for (const alias of def.aliases) {
    contentRegistry.set(alias.toLowerCase(), def);
  }
}
