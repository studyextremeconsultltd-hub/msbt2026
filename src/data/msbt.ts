export type CoursePricing = {
  regular: number;
  discounted: number;
  deposit: number;
  instalments: number;
  instalmentAmount: number;
  fastTrackMonths?: number;
  standardMonths?: number;
};

export type Course = {
  slug: string;
  title: string;
  category: "business" | "health" | "psychology";
  level: string;
  tags: string[];
  duration: string;
  overview: string;
  image: string;
  pricing: CoursePricing;
  units?: string[];
  entryRequirements?: string;
  progression?: string;
};

export const site = {
  name: "Manchester School of Business and Technology",
  shortName: "MSBT",
  tagline:
    "Your career, your pace, your future. Study business, health & social care and psychology online, on your schedule.",
  email: "naveed.rehman@msbt.co.uk",
  phone: "+447466065438",
  whatsapp: "+447466065438",
  address: "Manchester, United Kingdom",
};

export const heroTabs = ["Admissions", "Research", "Faculty", "Courses"] as const;

export const stats = [
  { value: "10K+", label: "Active learners", tone: "orange" as const },
  { value: "Global", label: "International community", tone: "navy" as const },
  { value: "48K+", label: "Study hours delivered", tone: "sky" as const },
  { value: "Explore MSBT", label: "View programmes", tone: "teal" as const, cta: true },
];

/** Bump when replacing images in /public so browsers and Next.js serve fresh files. */
export const IMAGE_CACHE_VERSION = "v2";

export function assetUrl(path: string): string {
  return `${path}?${IMAGE_CACHE_VERSION}`;
}

export const categories = [
  {
    id: "business",
    title: "Business & Strategic Management",
    description:
      "Ofqual-regulated diplomas from Level 3 to Level 7 in management and leadership.",
    image: assetUrl("/categories/category-business.png"),
    from: 795,
  },
  {
    id: "health",
    title: "Health & Social Care Management",
    description:
      "Assignment-based pathways with no exams — ideal for care sector professionals.",
    image: assetUrl("/categories/category-health.png"),
    from: 595,
  },
  {
    id: "psychology",
    title: "Psychology",
    description:
      "Level 4 and 5 psychology qualifications for counselling, HR and social work careers.",
    image: assetUrl("/categories/category-psychology.png"),
    from: 895,
  },
];

const baseDelivery = `Learners access course materials online, receive expert tutor support, use the MSBT Online Learning Portal 24/7, and get dedicated customer support Monday to Friday.`;

function mk(
  slug: string,
  title: string,
  category: Course["category"],
  level: string,
  tags: string[],
  duration: string,
  overview: string,
  pricing: CoursePricing,
  units?: string[]
): Course {
  return {
    slug,
    title,
    category,
    level,
    tags,
    duration,
    overview,
    image: assetUrl(`/courses/${slug}.png`),
    pricing,
    units,
  };
}

export const courses: Course[] = [
  mk(
    "level-3-diploma-business-management",
    "Level 3 Diploma in Business Management",
    "business",
    "RQF Level 3",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "06–12 Months",
    "A foundation in business principles for learners beginning their management career journey.",
    { regular: 995, discounted: 795, deposit: 125, instalments: 8, instalmentAmount: 89 }
  ),
  mk(
    "level-4-diploma-business-management",
    "Level 4 Diploma in Business Management",
    "business",
    "RQF Level 4",
    ["Online", "Fast Track", "Ofqual Regulated", "NVQ/RQF"],
    "06–09 Months",
    "An excellent foundation for building a career in a range of organisations. Designed to ensure each learner is business ready: a confident, independent thinker with detailed knowledge of business and management.",
    { regular: 1050, discounted: 895, deposit: 150, instalments: 9, instalmentAmount: 89 },
    [
      "Academic Writing and Research Skills (20 credits)",
      "Business Operations (20 credits)",
      "Communication in Business (20 credits)",
      "Finance and Accounting (20 credits)",
      "Leading and Managing Teams (20 credits)",
      "Operating in a Global Context (20 credits)",
    ]
  ),
  mk(
    "level-5-diploma-business-management",
    "Level 5 Diploma in Business Management",
    "business",
    "RQF Level 5",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "06–09 Months",
    "Focused on human resource management, marketing, management accounting, business law, and business principles and strategy — ideal for those moving into private or public sector business.",
    { regular: 1200, discounted: 995, deposit: 150, instalments: 9, instalmentAmount: 99 }
  ),
  mk(
    "level-5-extended-diploma-business-management",
    "Level 5 Extended Diploma in Business Management",
    "business",
    "RQF Level 5 Extended",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "12–18 Months",
    "Extended business management qualification combining depth across strategy, operations and leadership for ambitious professionals.",
    { regular: 1950, discounted: 1595, deposit: 195, instalments: 16, instalmentAmount: 95 }
  ),
  mk(
    "level-6-diploma-business-management",
    "Level 6 Diploma in Business Management",
    "business",
    "RQF Level 6",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "09–12 Months",
    "Advanced business management for senior practitioners seeking strategic leadership capability.",
    { regular: 1350, discounted: 1095, deposit: 150, instalments: 11, instalmentAmount: 95 }
  ),
  mk(
    "level-7-diploma-strategic-management-leadership",
    "Level 7 Diploma in Strategic Management & Leadership",
    "business",
    "RQF Level 7",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "09–12 Months",
    "Executive-level strategic management and leadership for directors and senior managers.",
    { regular: 1550, discounted: 1295, deposit: 195, instalments: 11, instalmentAmount: 105 }
  ),
  mk(
    "level-7-certificate-research-methods",
    "Level 7 Certificate in Research Methods",
    "business",
    "RQF Level 7",
    ["Online", "Ofqual Regulated"],
    "03–06 Months",
    "Research methods qualification supporting dissertation and postgraduate study pathways.",
    { regular: 495, discounted: 395, deposit: 95, instalments: 4, instalmentAmount: 85 }
  ),
  mk(
    "level-3-foundation-health-social-care",
    "Level 3 Foundation Diploma in Health and Social Care",
    "health",
    "RQF Level 3",
    ["Online", "Fast Track", "No Exams", "Ofqual Regulated"],
    "06–12 Months",
    "Equip learners with underpinning knowledge for a career at support worker, senior support worker or care assistant level. 100% assignment-based with no examinations.",
    { regular: 750, discounted: 595, deposit: 100, instalments: 6, instalmentAmount: 89 },
    [
      "Responsibilities of a Health and Social Care worker (10 credits)",
      "Personal and Professional Development (10 credits)",
      "Effective Communication and Ethical Practice (10 credits)",
      "Health, Safety and Wellbeing in Settings (10 credits)",
      "Person-centred Approaches (10 credits)",
      "Effective Handling of Information (10 credits)",
    ]
  ),
  mk(
    "level-4-health-social-care-management",
    "Level 4 Diploma in Health and Social Care Management",
    "health",
    "RQF Level 4",
    ["Online", "Fast Track", "No Exams", "Ofqual Regulated"],
    "06–09 Months",
    "Equip learners for a managerial career in health and social care — equality, diversity, professional development, patient assessment, resource management and communication.",
    { regular: 1050, discounted: 895, deposit: 150, instalments: 9, instalmentAmount: 89 }
  ),
  mk(
    "level-5-extended-health-social-care-management",
    "Level 5 Extended Diploma in Health and Social Care Management",
    "health",
    "RQF Level 5 Extended",
    ["Online", "Fast Track", "No Exams", "Ofqual Regulated"],
    "12–18 Months",
    "Extended health and social care management for leaders in residential, community and NHS-linked settings.",
    { regular: 1950, discounted: 1595, deposit: 195, instalments: 16, instalmentAmount: 95 }
  ),
  mk(
    "level-7-health-social-care-management",
    "Level 7 Diploma in Health and Social Care Management",
    "health",
    "RQF Level 7",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "09–12 Months",
    "Senior management qualification for health and social care executives and service directors.",
    { regular: 1550, discounted: 1295, deposit: 195, instalments: 11, instalmentAmount: 105 }
  ),
  mk(
    "level-4-diploma-psychology",
    "Level 4 Diploma in Psychology",
    "psychology",
    "RQF Level 4",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "06–09 Months",
    "Fundamental principles and beginning knowledge in psychology — research methodologies and a survey of key subfields. Equivalent to Year 1 of a UK Bachelor's degree.",
    { regular: 1050, discounted: 895, deposit: 150, instalments: 9, instalmentAmount: 89 }
  ),
  mk(
    "level-5-diploma-psychology",
    "Level 5 Diploma in Psychology",
    "psychology",
    "RQF Level 5",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "06–09 Months",
    "Specialist progression in mental health, cognitive psychology, addiction, social psychology, criminology, intelligence and personality.",
    { regular: 1200, discounted: 995, deposit: 150, instalments: 9, instalmentAmount: 99 }
  ),
  mk(
    "level-5-extended-diploma-psychology",
    "Level 5 Extended Diploma in Psychology",
    "psychology",
    "RQF Level 5 Extended",
    ["Online", "Fast Track", "Ofqual Regulated"],
    "12–18 Months",
    "Solid understanding of ideas, theories and methods in psychology with skills in analysing and evaluating psychological concepts.",
    { regular: 1950, discounted: 1595, deposit: 195, instalments: 16, instalmentAmount: 95 }
  ),
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function courseListForEnquiry(): { slug: string; title: string }[] {
  return courses.map((c) => ({ slug: c.slug, title: c.title }));
}

export function formatGBP(n: number): string {
  return `£${n.toLocaleString("en-GB")}`;
}

export function saveAmount(pricing: CoursePricing): number {
  return pricing.regular - pricing.discounted;
}
