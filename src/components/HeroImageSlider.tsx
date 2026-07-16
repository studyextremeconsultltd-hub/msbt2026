import ImageBannerSlider, { manchesterSlides } from "@/components/ImageBannerSlider";

export default function HeroImageSlider() {
  return (
    <div className="relative bg-[#1a2838] px-4 pb-3 pt-14 sm:px-6 lg:px-8 lg:pt-16">
      <ImageBannerSlider slides={manchesterSlides} variant="hero" />
    </div>
  );
}
