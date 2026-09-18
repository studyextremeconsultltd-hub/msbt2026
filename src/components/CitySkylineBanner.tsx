import ImageBannerSlider, { campusSlides } from "@/components/ImageBannerSlider";

export default function CitySkylineBanner() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-center text-sm font-bold uppercase tracking-[0.25em] text-muted sm:text-base">
          Manchester · United Kingdom
        </p>
        <ImageBannerSlider slides={campusSlides} variant="showcase" />
        <p className="mt-5 text-center text-base font-bold text-navy sm:text-lg">
          Where ambition meets opportunity
        </p>
      </div>
    </section>
  );
}
