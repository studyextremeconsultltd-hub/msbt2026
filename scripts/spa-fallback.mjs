import { copyFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const dist = "dist";
const indexHtml = join(dist, "index.html");

if (!existsSync(indexHtml)) {
  console.error("dist/index.html missing — run vite build first");
  process.exit(1);
}

const staticRoutes = [
  "404.html",
  "about/index.html",
  "courses/index.html",
  "contact/index.html",
  "pay/index.html",
  "university-progressions/index.html",
];

/** Course slugs from public/courses image stems (fallback list kept in sync with msbt.ts). */
const courseSlugs = [
  "level-3-diploma-business-management",
  "level-4-diploma-business-management",
  "level-5-diploma-business-management",
  "level-5-extended-diploma-business-management",
  "level-6-diploma-business-management",
  "level-7-diploma-strategic-management-leadership",
  "level-7-certificate-research-methods",
  "level-3-foundation-health-social-care",
  "level-4-health-social-care-management",
  "level-5-extended-health-social-care-management",
  "level-7-health-social-care-management",
];

const coursesDir = join("public", "courses");
if (existsSync(coursesDir)) {
  for (const file of readdirSync(coursesDir)) {
    const m = file.match(/^(.+?)(?:-sm)?\.webp$/);
    if (m) courseSlugs.push(m[1]);
  }
}

const uniqueCourseRoutes = [...new Set(courseSlugs)].map(
  (slug) => `courses/${slug}/index.html`,
);

function writeRoute(relPath) {
  const target = join(dist, relPath);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(indexHtml, target);
}

for (const route of [...staticRoutes, ...uniqueCourseRoutes]) {
  writeRoute(route);
}

console.log(
  `SPA routes ready: ${staticRoutes.length + uniqueCourseRoutes.length} pages (+ 404.html)`,
);
