export type StudentAgent = {
  id: string;
  name: string;
  role: string;
  image: string;
  position: { top: string; left: string };
  float: { y: number[]; x: number[]; duration: number };
  messages: string[];
};

export const students: StudentAgent[] = [
  {
    id: "s1",
    name: "Amara",
    role: "Access to HE · Medical Sciences",
    image: "/students/student-1.png",
    position: { top: "18%", left: "8%" },
    float: { y: [0, -18, 0], x: [0, 8, 0], duration: 7 },
    messages: [
      "Just got tutor feedback on my physiology module!",
      "The portal makes assignment uploads so easy.",
      "Aiming for Distinction on this unit.",
    ],
  },
  {
    id: "s2",
    name: "James",
    role: "CMI Level 5 · Leadership",
    image: "/students/student-2.png",
    position: { top: "55%", left: "72%" },
    float: { y: [0, 14, 0], x: [0, -10, 0], duration: 8 },
    messages: [
      "Started Monday — already on module 2.",
      "Perfect while I'm working full-time.",
      "Our cohort group chat is really active.",
    ],
  },
  {
    id: "s3",
    name: "Priya",
    role: "Health & Social Care",
    image: "/students/student-3.png",
    position: { top: "62%", left: "14%" },
    float: { y: [0, -12, 0], x: [0, 12, 0], duration: 9 },
    messages: [
      "UCAS points sorted — university next!",
      "Tutor calls are super helpful.",
      "Love the flexible instalment plan.",
    ],
  },
  {
    id: "s4",
    name: "Daniel",
    role: "Project Management",
    image: "/students/student-4.png",
    position: { top: "22%", left: "78%" },
    float: { y: [0, 16, 0], x: [0, -6, 0], duration: 6.5 },
    messages: [
      "Completed my research project today.",
      "Anyone else doing the fast track?",
      "Accreditation gives me confidence with employers.",
    ],
  },
];

export const courses = [
  {
    title: "Access to HE · Medical Sciences",
    level: "Level 3 · QAA",
    from: 1100,
    tag: "Most popular",
  },
  {
    title: "CMI Management & Leadership",
    level: "Levels 3–8",
    from: 443,
    tag: "Professional",
  },
  {
    title: "Health & Social Care",
    level: "RQF regulated",
    from: 890,
    tag: "Care sector",
  },
  {
    title: "Project Management",
    level: "CMI accredited",
    from: 443,
    tag: "Career boost",
  },
  {
    title: "Coaching & Mentoring",
    level: "CMI pathway",
    from: 419,
    tag: "New cohort",
  },
  {
    title: "Business & Management",
    level: "OTHM diplomas",
    from: 1660,
    tag: "Degree route",
  },
];
