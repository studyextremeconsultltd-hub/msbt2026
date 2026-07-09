"use client";

export default function AnimatedSchoolTitle({ text }: { text: string }) {
  return (
    <h1 className="text-center font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
      {text}
    </h1>
  );
}
