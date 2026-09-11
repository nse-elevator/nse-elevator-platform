export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'stringArray';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  defaultValue?: any;
  helpText?: string;
}

export interface AdminContentConfig {
  key: string;
  singularTitle: string;
  pluralTitle: string;
  icon: string;
  displayColumns: Array<{ key: string; label: string; isTitle?: boolean; format?: (val: any) => string }>;
  fields: FieldConfig[];
}

export const adminContentConfigs: Record<string, AdminContentConfig> = {
  services: {
    key: 'services',
    singularTitle: 'Service Offering',
    pluralTitle: 'Elevator Services',
    icon: '⚙️',
    displayColumns: [
      { key: 'title', label: 'Service Title', isTitle: true },
      { key: 'slug', label: 'URL Slug' },
      { key: 'categoryBadge', label: 'Badge' },
      { key: 'status', label: 'Status' },
      { key: 'updatedAt', label: 'Last Updated' },
    ],
    fields: [
      { name: 'title', label: 'Service Title', type: 'text', required: true, placeholder: 'e.g. Preventive Maintenance' },
      { name: 'slug', label: 'URL Slug (auto-generated if blank)', type: 'text', placeholder: 'e.g. elevator-maintenance' },
      { name: 'categoryBadge', label: 'Category Badge', type: 'text', placeholder: 'e.g. CORE CAPABILITY' },
      { name: 'keywordHighlight', label: 'Keyword Highlight Subtitle', type: 'text' },
      { name: 'h1', label: 'Page H1 Heading', type: 'text', required: true, placeholder: 'e.g. Commercial Elevator Preventive Maintenance Agreements' },
      { name: 'leadText', label: 'Lead Paragraph Text', type: 'textarea', required: true },
      { name: 'metaTitle', label: 'SEO Meta Title', type: 'text', required: true },
      { name: 'metaDescription', label: 'SEO Meta Description', type: 'textarea', required: true },
      { name: 'checklist', label: 'Checklist Items (one per line or comma-separated)', type: 'stringArray' },
      { name: 'equipmentBrands', label: 'OEM Brands Serviced (comma-separated)', type: 'stringArray', placeholder: 'Schindler, KONE, OTIS, Johnson, thyssenkrupp' },
      {
        name: 'status',
        label: 'Publication Status',
        type: 'select',
        options: [
          { label: 'Published (Live)', value: 'published' },
          { label: 'Draft (Hidden)', value: 'draft' },
          { label: 'Archived (Soft Deleted)', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
  locations: {
    key: 'locations',
    singularTitle: 'Service Location',
    pluralTitle: 'Geographic Corridors & Branches',
    icon: '📍',
    displayColumns: [
      { key: 'cityName', label: 'City Hub', isTitle: true },
      { key: 'state', label: 'State' },
      { key: 'slaMinutes', label: 'Avg Arrival SLA' },
      { key: 'branchPhone', label: 'Dispatch Phone' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'cityName', label: 'City Name', type: 'text', required: true, placeholder: 'e.g. Navi Mumbai or Pune' },
      { name: 'state', label: 'State / Region Code', type: 'text', required: true, placeholder: 'e.g. Maharashtra' },
      { name: 'slug', label: 'URL Slug (auto-generated if blank)', type: 'text', placeholder: 'e.g. elevator-repair-navi-mumbai' },
      { name: 'slaMinutes', label: 'Guaranteed / Avg SLA (Minutes)', type: 'number', defaultValue: 30 },
      { name: 'branchAddress', label: 'Local Office / Branch Address', type: 'text', required: true },
      { name: 'branchPhone', label: 'Direct Dispatch Phone Number', type: 'text', required: true, defaultValue: '+91 90110 96990' },
      { name: 'regulatoryAuthority', label: 'Field Operations Notes', type: 'text', required: false },
      { name: 'coveredZips', label: 'Covered Postal ZIP Codes (comma-separated)', type: 'stringArray' },
      { name: 'countiesServed', label: 'Covered Localities & Corridors (Tag Chips)', type: 'stringArray', placeholder: 'e.g. Baner, Wakad, Hinjewadi...' },
      { name: 'metaTitle', label: 'SEO Meta Title', type: 'text', required: true },
      { name: 'metaDescription', label: 'SEO Meta Description', type: 'textarea', required: true },
      {
        name: 'status',
        label: 'Publication Status',
        type: 'select',
        options: [
          { label: 'Published (Live)', value: 'published' },
          { label: 'Draft (Hidden)', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
  industries: {
    key: 'industries',
    singularTitle: 'Industry Sector',
    pluralTitle: 'Vertical Industry Sectors',
    icon: '🏢',
    displayColumns: [
      { key: 'name', label: 'Industry Name', isTitle: true },
      { key: 'slug', label: 'URL Slug' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'name', label: 'Industry Sector Name', type: 'text', required: true, placeholder: 'e.g. Commercial Office Towers' },
      { name: 'slug', label: 'URL Slug', type: 'text' },
      { name: 'description', label: 'Sector Overview Description', type: 'textarea', required: true },
      { name: 'metaTitle', label: 'SEO Meta Title', type: 'text', required: true },
      { name: 'metaDescription', label: 'SEO Meta Description', type: 'textarea', required: true },
      { name: 'criticalChallenges', label: 'Key Challenges (comma-separated)', type: 'stringArray' },
      { name: 'vanguardSolutions', label: 'Engineering Solutions (comma-separated)', type: 'stringArray' },
      {
        name: 'status',
        label: 'Publication Status',
        type: 'select',
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
  'case-studies': {
    key: 'case-studies',
    singularTitle: 'Case Study',
    pluralTitle: 'Case Studies & Modernization Projects',
    icon: '📑',
    displayColumns: [
      { key: 'buildingName', label: 'Building / Facility', isTitle: true },
      { key: 'city', label: 'City' },
      { key: 'scope', label: 'Project Scope' },
      { key: 'units', label: 'Units' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'buildingName', label: 'Building / Facility Name', type: 'text', required: true },
      { name: 'city', label: 'City / Location', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug', type: 'text' },
      { name: 'scope', label: 'Engineering Scope (e.g. Turnkey Modernization)', type: 'text', required: true },
      { name: 'units', label: 'Elevator Units Count', type: 'text', required: true },
      { name: 'problem', label: 'Initial Problem / Challenge', type: 'textarea', required: true },
      { name: 'solution', label: 'Engineered Solution', type: 'textarea', required: true },
      { name: 'resultsSummary', label: 'Summary Results / Uptime Achieved', type: 'textarea', required: true },
      { name: 'servicesPerformed', label: 'Services Performed (comma-separated)', type: 'stringArray' },
      { name: 'metaTitle', label: 'SEO Meta Title', type: 'text', required: true },
      { name: 'metaDescription', label: 'SEO Meta Description', type: 'textarea', required: true },
      {
        name: 'status',
        label: 'Publication Status',
        type: 'select',
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
  blog: {
    key: 'blog',
    singularTitle: 'Blog Post',
    pluralTitle: 'Knowledge Base & Technical Articles',
    icon: '📝',
    displayColumns: [
      { key: 'title', label: 'Article Title', isTitle: true },
      { key: 'author', label: 'Author' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Article Title', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug', type: 'text' },
      { name: 'author', label: 'Author Name', type: 'text', required: true, defaultValue: 'Apex Engineering Team' },
      { name: 'authorTitle', label: 'Author Title', type: 'text', required: true, defaultValue: 'Senior Elevator Specialist' },
      { name: 'category', label: 'Category', type: 'text', required: true, defaultValue: 'Safety & Compliance' },
      { name: 'readingTime', label: 'Reading Time', type: 'text', defaultValue: '5 min read' },
      { name: 'content', label: 'Full Article Markdown / HTML Content', type: 'textarea', required: true },
      { name: 'metaTitle', label: 'SEO Meta Title', type: 'text', required: true },
      { name: 'metaDescription', label: 'SEO Meta Description', type: 'textarea', required: true },
      {
        name: 'status',
        label: 'Publication Status',
        type: 'select',
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
  careers: {
    key: 'careers',
    singularTitle: 'Job Opening',
    pluralTitle: 'Career Postings & Apprenticeships',
    icon: '💼',
    displayColumns: [
      { key: 'title', label: 'Job Title', isTitle: true },
      { key: 'city', label: 'City' },
      { key: 'employmentType', label: 'Type' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug', type: 'text' },
      { name: 'city', label: 'City', type: 'text', required: true, defaultValue: 'Pune' },
      { name: 'state', label: 'State', type: 'text', required: true, defaultValue: 'Maharashtra' },
      { name: 'location', label: 'Branch / Location', type: 'text', required: true, defaultValue: 'Pune (Dattanagar & Katraj Corridors)' },
      { name: 'employmentType', label: 'Employment Type', type: 'text', defaultValue: 'FULL_TIME' },
      { name: 'description', label: 'Job Description', type: 'textarea', required: true },
      { name: 'responsibilities', label: 'Key Responsibilities (comma-separated)', type: 'stringArray' },
      { name: 'qualifications', label: 'Qualifications (comma-separated)', type: 'stringArray' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Closed', value: 'closed' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
  testimonials: {
    key: 'testimonials',
    singularTitle: 'Client Testimonial',
    pluralTitle: 'Client Testimonials & Reviews',
    icon: '💬',
    displayColumns: [
      { key: 'authorName', label: 'Client Name', isTitle: true },
      { key: 'company', label: 'Company / Society' },
      { key: 'rating', label: 'Rating' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'authorName', label: 'Client / Representative Name', type: 'text', required: true },
      { name: 'jobTitle', label: 'Designation / Role', type: 'text', required: true, defaultValue: 'Facility Manager' },
      { name: 'company', label: 'Property / Complex / Society', type: 'text', required: true },
      { name: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true },
      { name: 'rating', label: 'Star Rating (1-5)', type: 'number', defaultValue: 5 },
      { name: 'buildingPortfolioSize', label: 'Portfolio Size (e.g. 6 Elevators)', type: 'text', required: true },
      { name: 'location', label: 'City / Corridors', type: 'text', defaultValue: 'Navi Mumbai, MH' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'published',
      },
    ],
  },
};
