import { Star, Clock, Heart, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { useCartStore } from "@/features/cart/cartStore";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  addToCartLabel: string;
}

export function ProductCard({ product, locale, addToCartLabel }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="group flex flex-col overflow-hidden rounded-leaf border border-forest-900/10 dark:border-parchment-100/10 bg-parchment-100 dark:bg-forest-900 transition-shadow duration-200 hover:shadow-xl hover:shadow-forest-900/10">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name[locale]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          onClick={() => setIsFavorite((v) => !v)}
          aria-label="Toggle favorite"
          className="absolute top-3 end-3 flex h-9 w-9 items-center justify-center rounded-full bg-parchment-100/90 backdrop-blur transition-transform active:scale-90"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorite ? "fill-ember-500 text-ember-500" : "text-forest-900"}`}
          />
        </button>

        {product.tag && (
          <div className="absolute top-3 start-3">
            <Badge tone={product.isSpicy ? "ember" : "gold"}>{product.tag[locale]}</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
            {product.name[locale]}
          </h3>
          <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-gold-500">
            <Star className="h-3.5 w-3.5 fill-gold-500" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-sm text-ink-600 dark:text-moss-300 line-clamp-2">
          {product.description[locale]}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-col gap-1">
            <PriceTag price={product.price} discountPrice={product.discountPrice} />
            <span className="flex items-center gap-1 text-xs text-ink-600/70 dark:text-moss-300/70">
              <Clock className="h-3 w-3" />
              {product.prepTimeMinutes} {locale === "ar" ? "دقيقة" : "min"}
            </span>
          </div>

          <button
            onClick={() => addItem(product)}
            aria-label={addToCartLabel}
            className="flex items-center gap-1.5 rounded-full bg-forest-900 dark:bg-gold-500 px-4 py-2.5 text-xs font-semibold text-parchment-100 dark:text-forest-950 transition-transform active:scale-95 hover:bg-forest-800 dark:hover:bg-gold-400"
          >
            <Plus className="h-3.5 w-3.5" />
            {addToCartLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
