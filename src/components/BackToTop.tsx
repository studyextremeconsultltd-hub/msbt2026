import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex h-10 w-10 items-center justify-center bg-sky text-white transition hover:bg-sky/90"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}
