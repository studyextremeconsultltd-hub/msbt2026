"use client";

import Link from "next/link";
import { useState } from "react";
import type { Course } from "@/data/msbt";
import { getCourseDetails } from "@/data/content";

const tabs = ["Course Details", "Module Structure", "Progression & Career"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line pb-6 last:border-0 last:pb-0">
      <h3 className="font-display text-xl font-bold text-navy md:text-2xl">{title}</h3>
      <div className="mt-3 space-y-3 text-base font-medium leading-relaxed text-muted md:text-lg">
        {children}
      </div>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </>
  );
}

function ProgressionText({ text }: { text: string }) {
  const parts = text.split("University Progressions page on this website");
  if (parts.length === 1) return <RichText text={text} />;
  return (
    <p>
      {parts[0]}
      <Link href="/university-progressions" className="font-bold text-orange hover:underline">
        University Progressions page
      </Link>
      {parts[1]}
    </p>
  );
}

export default function CourseDetailTabs({ course }: { course: Course }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Course Details");
  const details = getCourseDetails(course.slug);
  const overview = details?.overview ?? course.overview;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b-2 border-gold/20 pb-4">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition md:text-base ${
              active === t
                ? "bg-navy text-white shadow-md ring-2 ring-gold/30"
                : "bg-cream text-ink hover:bg-gold/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {active === "Course Details" && (
          <>
            <Section title="Overview">
              <RichText text={overview} />
            </Section>

            {details?.entryRequirements && (
              <Section title="Entry Requirements">
                <RichText text={details.entryRequirements} />
              </Section>
            )}

            {details?.equivalences && (
              <Section title="Equivalences">
                <RichText text={details.equivalences} />
              </Section>
            )}

            {details?.whoIsItFor && (
              <Section title="Who Is It Suitable For?">
                <RichText text={details.whoIsItFor} />
              </Section>
            )}

            {details?.durationModes && (
              <Section title="Duration & Delivery">
                <RichText text={details.durationModes} />
              </Section>
            )}

            {details?.deliveryMethods && details.deliveryMethods.length > 0 && (
              <Section title="What You Will Receive">
                <ul className="list-disc space-y-2 pl-5">
                  {details.deliveryMethods.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Section>
            )}

            {details?.accreditation && (
              <Section title="Accreditation">
                <RichText text={details.accreditation} />
              </Section>
            )}

            {details?.assessment && (
              <Section title="Assessment & Verification">
                <RichText text={details.assessment} />
              </Section>
            )}
          </>
        )}

        {active === "Module Structure" && (
          <Section title="Mandatory Units">
            {details?.units && details.units.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {details.units.map((u) => (
                  <li
                    key={u}
                    className="rounded-xl border border-gold/20 bg-cream px-4 py-3 text-sm font-bold text-navy md:text-base"
                  >
                    {u}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Full module structure available on request. Contact admissions for the
                detailed unit breakdown for {course.title}.
              </p>
            )}
          </Section>
        )}

        {active === "Progression & Career" && (
          <>
            {details?.progression && (
              <Section title="Progression">
                <ProgressionText text={details.progression} />
              </Section>
            )}

            {details?.qualityStandards && (
              <Section title="Quality, Standards & Recognitions">
                <RichText text={details.qualityStandards} />
              </Section>
            )}

            {details?.universityProgressions && (
              <Section title="University Progressions">
                <RichText text={details.universityProgressions} />
                <Link
                  href="/university-progressions"
                  className="mt-4 inline-flex font-bold text-orange hover:underline"
                >
                  View all university progression routes →
                </Link>
              </Section>
            )}

            {!details?.progression && (
              <Section title="Progression">
                <p>
                  Successful completion supports progression to the next level within MSBT
                  programmes and eligible university pathways.
                </p>
                <Link
                  href="/university-progressions"
                  className="mt-2 inline-flex font-bold text-orange hover:underline"
                >
                  University Progressions →
                </Link>
              </Section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
