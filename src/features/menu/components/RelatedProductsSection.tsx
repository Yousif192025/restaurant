import type { Product } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";
import { ProductCard } from "./ProductCard";

interface RelatedProductsSectionProps {
  products: Product[];
  locale: Locale;
  title: string;
}

export function RelatedProductsSection({ products, locale, title }: RelatedProductsSectionProps) {
  if (products.length === 0) return null;
  const t = copy[locale].popular;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold text-forest-900 dark:text-parchment-100">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            addToCartLabel={t.addToCart}
            viewDetailsLabel={t.viewDetails}
          />
        ))}
      </div>
    </section>
  );
}
