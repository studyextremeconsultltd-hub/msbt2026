import aboutData from "./extracted-about.json";
import courseDetailsData from "./course-details.json";

export type CourseDetails = {
  overview?: string;
  entryRequirements?: string;
  equivalences?: string;
  units?: string[];
  durationModes?: string;
  deliveryMethods?: string[];
  accreditation?: string;
  assessment?: string;
  progression?: string;
  whoIsItFor?: string;
  qualityStandards?: string;
  universityProgressions?: string;
};

export const aboutTabs = aboutData.tabs.map((tab) => ({
  id: tab.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  title: tab.title,
  content: tab.content,
}));

const courseDetails = courseDetailsData as Record<string, CourseDetails>;

export function getCourseDetails(slug: string): CourseDetails | undefined {
  return courseDetails[slug];
}

export const universityProgressionsContent = {
  title: "University Progressions",
  intro:
    "MSBT qualifications are designed with clear progression routes into further study. Successful graduates can progress to higher-level MSBT programmes, undergraduate degree pathways, and master’s top-up opportunities with partner universities.",
  sections: [
    {
      heading: "Undergraduate pathways",
      body: "Ofqual-regulated Level 4, 5 and Extended Diplomas can provide advanced standing into UK Bachelor’s degree programmes — including direct entry into Year 2 or Year 3 where eligibility criteria are met.",
    },
    {
      heading: "Postgraduate pathways",
      body: "Level 6 and Level 7 qualifications support progression to relevant Master’s programmes and MBA routes with advanced standing, subject to university admission requirements.",
    },
    {
      heading: "Employability",
      body: "The local and global recognition of our qualifications enables graduates to enhance their employability skills and pursue leadership roles across business, health and social care, and psychology-related professions.",
    },
  ],
  cta: "Speak with our admissions team to discuss the best progression route for your qualification and career goals.",
};
