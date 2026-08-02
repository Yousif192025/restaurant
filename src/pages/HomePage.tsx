import { useUiStore } from "@/store/uiStore";
import { Hero } from "./home/Hero";
import { PromoBanner } from "./home/PromoBanner";
import { CategoriesSection } from "./home/CategoriesSection";
import { PopularSection } from "./home/PopularSection";

export function HomePage() {
  const locale = useUiStore((s) => s.locale);

  return (
    <>
      <Hero locale={locale} />
      <PromoBanner locale={locale} />
      <CategoriesSection locale={locale} />
      <PopularSection locale={locale} />
    </>
  );
}
