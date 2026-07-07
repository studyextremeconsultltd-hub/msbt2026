"use client";

import { useState } from "react";
import { aboutTabs } from "@/data/content";

function renderParagraphs(text: string) {
  return text.split(/\n\n+/).map((block, i) => {
    const lines = block.split("\n").filter(Boolean);
    const isList =
      lines.length > 1 &&
      lines.every((l) => !l.endsWith(":") || l.length < 60) &&
      !lines[0].includes("Vision") &&
      !lines[0].includes("Mission") &&
      lines[0].length < 120;

    if (lines.length === 1 && lines[0].endsWith(":") && lines[0].length < 80) {
      return (
        <h3 key={i} className="mt-6 text-lg font-bold text-navy first:mt-0">
          {lines[0].replace(/:$/, "")}
        </h3>
      );
    }

    if (block.startsWith("Vision") || block.startsWith("Mission")) {
      const parts = block.split(/\n\n/);
      return (
        <div key={i} className="space-y-3">
          {parts.map((part) => {
            const [head, ...rest] = part.split("\n");
            return (
              <div key={head}>
                <h3 className="text-lg font-bold text-navy">{head}</h3>
                <p className="mt-2">{rest.join(" ")}</p>
              </div>
            );
          })}
        </div>
      );
    }

    if (
      lines.length > 2 &&
      lines.every((l) => l.length < 200 && !l.includes("responsibilities include"))
    ) {
      return (
        <ul key={i} className="mt-3 list-disc space-y-2 pl-5">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className={i > 0 ? "mt-4" : ""}>
        {block}
      </p>
    );
  });
}

export default function AboutTabs() {
  const [active, setActive] = useState(aboutTabs[0].id);
  const current = aboutTabs.find((t) => t.id === active) ?? aboutTabs[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {aboutTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`shrink-0 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-bold transition lg:text-base ${
              active === tab.id
                ? "border-gold bg-navy text-white shadow-md"
                : "border-line bg-white text-ink hover:border-gold/40 hover:bg-cream"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </nav>
      <div
        id={current.id}
        className="rounded-3xl border-2 border-gold/25 bg-white p-8 card-shadow lg:p-10"
      >
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
          {current.title}
        </h2>
        <div className="mt-6 space-y-2 text-base font-medium leading-relaxed text-muted md:text-lg">
          {renderParagraphs(current.content)}
        </div>
      </div>
    </div>
  );
}
