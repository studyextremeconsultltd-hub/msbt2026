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
  category: "business" | "health";
  level: string;
  tags: string[];
  duration: string;
  overview: string;
  image: string;
  pricing: CoursePricing;
  units?: string[];
  entryRequirements?: string;
  progression?: string;
  /** Proposed OTHM programme — register interest only (not open for enrolment). */
  proposed?: boolean;
  credits?: number;
  studyMode?: string;
  awardingOrganisation?: string;
};

export const site = {
  name: "Manchester School of Business and Technology",
  shortName: "MSBT",
  slogan: "EDUCATE - EMPOWER - EXCEL",
  tagline:
    "Your career, your pace, your future. Study Business & Management and Health & Social Care online, on your schedule.",
  email: "naveed.rehman@msbt.co.uk",
  phone: "+441615640782",
  whatsapp: "+441615640782",
  address: "Office 2.13 Business Centre, Devonshire St N, Manchester M12 6JH",
  /** Google Maps place / directions target */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Office+2.13+Business+Centre+Devonshire+St+N+Manchester+M12+6JH",
};

export const heroTabs = ["Admissions", "Research", "Faculty", "Courses"] as const;

export const stats = [
  { value: "10K+", label: "Active learners", tone: "orange" as const },
  { value: "Global", label: "International community", tone: "navy" as const },
  { value: "48K+", label: "Study hours delivered", tone: "sky" as const },
  { value: "Explore MSBT", label: "View programmes", tone: "teal" as const, cta: true },
];

/** Bump when replacing images in /public so browsers serve fresh files. */
export const IMAGE_CACHE_VERSION = "v3";

export function assetUrl(path: string): string {
  return `${path}?${IMAGE_CACHE_VERSION}`;
}

export const categories = [
  {
    id: "business",
    title: "Business & Management",
    description:
      "Ofqual-regulated diplomas from Level 3 to Level 7 in business, management and leadership.",
    image: assetUrl("/categories/category-business.webp"),
    from: 795,
  },
  {
    id: "health",
    title: "Health & Social Care",
    description:
      "Assignment-based pathways with no exams — ideal for care sector professionals.",
    image: assetUrl("/categories/category-health.webp"),
    from: 595,
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
  units?: string[],
  extras?: Pick<
    Course,
    "proposed" | "credits" | "studyMode" | "awardingOrganisation"
  >,
): Course {
  return {
    slug,
    title,
    category,
    level,
    tags,
    duration,
    overview,
    image: assetUrl(`/courses/${slug}.webp`),
    pricing,
    units,
    ...extras,
  };
}

/** Notice shown on all proposed OTHM programme pages (pre-approval wording). */
export const proposedOthmNotice =
  "Important Notice: MSBT is currently applying for OTHM Centre Approval. This programme is displayed for information and expressions of interest only. No learner will be enrolled or registered onto this qualification until MSBT has received the relevant written approval from OTHM.";

export const proposedOthmIntro =
  "Manchester School of Business & Technology (MSBT) is currently undertaking the OTHM Centre Approval process and has applied for approval to deliver the qualifications listed below. These programmes are not currently open for formal enrolment or learner registration. Availability is subject to MSBT receiving the required OTHM centre and qualification approvals.";

export const courses: Course[] = [
  mk(
    "level-3-diploma-business-management",
    "OTHM Level 3 Diploma in Business Management",
    "business",
    "RQF Level 3",
    ["Proposed", "Register Interest", "Online"],
    "Approximately 1 academic year",
    "A foundation in business principles for learners beginning their management career journey. Displayed for information and expressions of interest only while MSBT completes OTHM centre approval.",
    { regular: 995, discounted: 795, deposit: 125, instalments: 8, instalmentAmount: 89 },
    undefined,
    {
      proposed: true,
      credits: 60,
      studyMode: "Proposed Online/Distance Learning",
      awardingOrganisation: "OTHM Qualifications",
    },
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
    "OTHM Level 7 Diploma in Strategic Management and Leadership",
    "business",
    "RQF Level 7",
    ["Proposed", "Register Interest", "120 Credits"],
    "Approximately 1 academic year",
    "Executive-level strategic management and leadership (120 credits / 1,200 TQT / 600 GLH). Displayed for information and expressions of interest only while MSBT completes OTHM centre approval.",
    { regular: 1550, discounted: 1295, deposit: 195, instalments: 11, instalmentAmount: 105 },
    undefined,
    {
      proposed: true,
      credits: 120,
      studyMode: "Proposed Online/Distance Learning",
      awardingOrganisation: "OTHM Qualifications",
    },
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
    "OTHM Level 3 Foundation Diploma in Health and Social Care",
    "health",
    "RQF Level 3",
    ["Proposed", "Register Interest", "Online"],
    "Approximately 1 academic year",
    "Equip learners with underpinning knowledge for a career at support worker, senior support worker or care assistant level. Displayed for information and expressions of interest only while MSBT completes OTHM centre approval.",
    { regular: 750, discounted: 595, deposit: 100, instalments: 6, instalmentAmount: 89 },
    [
      "Responsibilities of a Health and Social Care worker (10 credits)",
      "Personal and Professional Development (10 credits)",
      "Effective Communication and Ethical Practice (10 credits)",
      "Health, Safety and Wellbeing in Settings (10 credits)",
      "Person-centred Approaches (10 credits)",
      "Effective Handling of Information (10 credits)",
    ],
    {
      proposed: true,
      credits: 60,
      studyMode: "Proposed Online/Distance Learning",
      awardingOrganisation: "OTHM Qualifications",
    },
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
    "OTHM Level 7 Diploma in Health and Social Care Management",
    "health",
    "RQF Level 7",
    ["Proposed", "Register Interest", "Online"],
    "Approximately 1 academic year",
    "Senior management qualification for health and social care executives and service directors. Displayed for information and expressions of interest only while MSBT completes OTHM centre approval.",
    { regular: 1550, discounted: 1295, deposit: 195, instalments: 11, instalmentAmount: 105 },
    undefined,
    {
      proposed: true,
      credits: 120,
      studyMode: "Proposed Online/Distance Learning",
      awardingOrganisation: "OTHM Qualifications",
    },
  ),
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Courses open for fee payment (excludes proposed OTHM programmes). */
export function enrollableCourses(): Course[] {
  return courses.filter((c) => !c.proposed);
}

export function proposedOthmCourses(): Course[] {
  return courses.filter((c) => c.proposed);
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
