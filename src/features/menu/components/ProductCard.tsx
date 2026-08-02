import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Plus } from "lucide-react";
import type { Product } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { RatingStars } from "@/components/ui/RatingStars";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { useCartStore } from "@/features/cart/cartStore";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  addToCartLabel: string;
  viewDetailsLabel: string;
}

export function ProductCard({ product, locale, addToCartLabel, viewDetailsLabel }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const hasDiscount = typeof product.discountPrice === "number" && product.discountPrice < product.price;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-leaf border border-forest-900/10 dark:border-parchment-100/10 bg-parchment-100 dark:bg-forest-900 transition-shadow duration-200 hover:shadow-xl hover:shadow-forest-900/10"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-[5/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name[locale]}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            !product.isAvailable ? "grayscale opacity-70" : ""
          }`}
        />

        <div className="absolute top-3 start-3 flex flex-col items-start gap-1.5">
          {product.tag && <Badge tone={product.isSpicy ? "ember" : "gold"}>{product.tag[locale]}</Badge>}
          {hasDiscount && (
            <Badge tone="ember">
              -{Math.round(100 - ((product.discountPrice ?? 0) / product.price) * 100)}%
            </Badge>
          )}
        </div>

        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-950/40">
            <span className="rounded-full bg-forest-950/80 px-4 py-1.5 text-xs font-semibold text-parchment-100">
              {locale === "ar" ? "غير متوفر حاليًا" : "Currently unavailable"}
            </span>
          </div>
        )}

        <div className="absolute top-3 end-3">
          <FavoriteButton productId={product.id} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100 hover:underline">
              {product.name[locale]}
            </h3>
          </Link>
          <RatingStars rating={product.rating} />
        </div>

        <p className="text-sm text-ink-600 dark:text-moss-300 line-clamp-2">{product.description[locale]}</p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex flex-col gap-1">
            <PriceTag price={product.price} discountPrice={product.discountPrice} />
            <span className="flex items-center gap-1 text-xs text-ink-600/70 dark:text-moss-300/70">
              <Clock className="h-3 w-3" />
              {product.prepTimeMinutes} {locale === "ar" ? "دقيقة" : "min"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product.id}`}
              className="hidden sm:inline-flex rounded-full border border-forest-900/15 dark:border-parchment-100/15 px-3 py-2.5 text-xs font-semibold text-forest-900 dark:text-parchment-100 hover:border-gold-500 transition-colors"
            >
              {viewDetailsLabel}
            </Link>
            <button
              onClick={() => addItem({ product })}
              disabled={!product.isAvailable}
              aria-label={addToCartLabel}
              className="flex items-center gap-1.5 rounded-full bg-forest-900 dark:bg-gold-500 px-4 py-2.5 text-xs font-semibold text-parchment-100 dark:text-forest-950 transition-transform active:scale-95 hover:bg-forest-800 dark:hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5" />
              {addToCartLabel}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
