import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/features/menu/components/ProductCard";
import { getPopularProducts } from "@/features/menu/data/mockMenu";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

export function PopularSection({ locale }: { locale: Locale }) {
  const t = copy[locale].popular;
  const products = getPopularProducts(6);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <SectionHeading eyebrow="Silver Leaf" title={t.title} subtitle={t.subtitle} />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} addToCartLabel={t.addToCart} />
        ))}
      </div>
    </section>
  );
}
