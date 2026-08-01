import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/features/menu/components/CategoryCard";
import { categories } from "@/features/menu/data/mockMenu";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

export function CategoriesSection({ locale }: { locale: Locale }) {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-5 pb-20">
      <SectionHeading title={copy[locale].categories.title} />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} locale={locale} />
        ))}
      </div>
    </section>
  );
}
