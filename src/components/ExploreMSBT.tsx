import { lazy, Suspense, useState } from "react";
import { MapPin, Search } from "lucide-react";

const GlobeExplorer = lazy(() => import("@/components/GlobeExplorer"));

export default function ExploreMSBT() {
  const [input, setInput] = useState("");
  const [searchLocation, setSearchLocation] = useState<string | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) setSearchLocation(input.trim());
  }

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 card-shadow sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-3">
            <MapPin className="shrink-0 text-teal" size={24} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter any address, city, or postcode..."
              className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted sm:text-lg"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-base font-bold text-white transition hover:bg-navy/90 sm:text-lg"
          >
            <Search size={20} />
            Fly to location
          </button>
        </form>

        <div className="overflow-hidden rounded-3xl border border-line card-shadow">
          <Suspense
            fallback={
              <div className="flex h-[420px] items-center justify-center bg-[#000814] text-sm text-white/70 md:h-[520px] lg:h-[600px]">
                Loading 3D globe…
              </div>
            }
          >
            <GlobeExplorer searchLocation={searchLocation} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
