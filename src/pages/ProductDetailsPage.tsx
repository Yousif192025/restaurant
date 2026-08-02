import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, Clock, Flame } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { useCartStore } from "@/features/cart/cartStore";
import { menuService } from "@/features/menu/services/menuService";
import { computeLineBreakdown, computeUnitPrice } from "@/features/menu/utils/pricing";
import { ProductGallery } from "@/features/menu/components/ProductGallery";
import { SizeSelector } from "@/features/menu/components/SizeSelector";
import { ExtrasSelector } from "@/features/menu/components/ExtrasSelector";
import { RelatedProductsSection } from "@/features/menu/components/RelatedProductsSection";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { RatingStars } from "@/components/ui/RatingStars";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/StateViews";
import { RatingSummary } from "@/features/reviews/components/RatingSummary";
import { ReviewList } from "@/features/reviews/components/ReviewList";
import { copy } from "@/constants/copy";
import type { ExtraOption, Product, SizeOption } from "@/types/menu";

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].product;
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>();
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setProduct(undefined);
    setSelectedExtras([]);
    setQuantity(1);
    setJustAdded(false);

    menuService.getProductById(id).then((result) => {
      if (cancelled) return;
      setProduct(result ?? null);
      setSelectedSize(result?.sizes?.[1] ?? result?.sizes?.[0]);
      if (result) {
        menuService.getRecommendedProducts(result, 4).then((rec) => {
          if (!cancelled) setRelated(rec);
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const unitPrice = useMemo(
    () => (product ? computeUnitPrice(product, selectedSize, selectedExtras) : 0),
    [product, selectedSize, selectedExtras]
  );
  const breakdown = useMemo(() => computeLineBreakdown(unitPrice, quantity), [unitPrice, quantity]);

  function toggleExtra(extra: ExtraOption) {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id) ? prev.filter((e) => e.id !== extra.id) : [...prev, extra]
    );
  }

  function handleAddToCart() {
    if (!product) return;
    addItem({ product, quantity, selectedSize, selectedExtras });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  }

  if (product === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-leaf" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24">
        <ErrorState
          title={locale === "ar" ? "الطبق غير موجود" : "Dish not found"}
          description={locale === "ar" ? "قد يكون تمت إزالته من القائمة." : "It may have been removed from the menu."}
        />
        <div className="mt-6 flex justify-center">
          <Link to="/menu" className="text-sm font-semibold text-gold-500 hover:underline">
            {t.backToMenu}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link
        to="/menu"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-forest-900 dark:text-moss-300 dark:hover:text-parchment-100"
      >
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        {t.backToMenu}
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name[locale]} />

        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {product.tag && <Badge tone={product.isSpicy ? "ember" : "gold"}>{product.tag[locale]}</Badge>}
              {product.isVegetarian && <Badge tone="moss">{locale === "ar" ? "نباتي" : "Vegetarian"}</Badge>}
              {product.isSpicy && (
                <Badge tone="ember">
                  <Flame className="me-1 inline h-3 w-3" />
                  {locale === "ar" ? "حار" : "Spicy"}
                </Badge>
              )}
            </div>
            <FavoriteButton productId={product.id} size="lg" />
          </div>

          <h1 className="font-display text-3xl font-semibold text-forest-900 dark:text-parchment-100">
            {product.name[locale]}
          </h1>

          <div className="flex items-center gap-4">
            <RatingStars rating={product.rating} />
            <span className="flex items-center gap-1 text-sm text-ink-600 dark:text-moss-300">
              <Clock className="h-4 w-4" />
              {t.prepTime}: {product.prepTimeMinutes} {locale === "ar" ? "دقيقة" : "min"}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-ink-600 dark:text-moss-300">
            {product.longDescription?.[locale] ?? product.description[locale]}
          </p>

          {!product.isAvailable && (
            <span className="w-fit rounded-full bg-ember-500/15 px-3 py-1.5 text-sm font-semibold text-ember-500">
              {t.unavailable}
            </span>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <SizeSelector
              sizes={product.sizes}
              selectedId={selectedSize?.id ?? product.sizes[0].id}
              onSelect={setSelectedSize}
              locale={locale}
              label={t.chooseSize}
            />
          )}

          {product.extras && product.extras.length > 0 && (
            <ExtrasSelector
              extras={product.extras}
              selectedIds={selectedExtras.map((e) => e.id)}
              onToggle={toggleExtra}
              locale={locale}
              label={t.addExtras}
            />
          )}

          <div className="flex flex-col gap-3 rounded-leaf border border-forest-900/10 dark:border-parchment-100/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-forest-900 dark:text-parchment-100">{t.quantity}</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={10} size="lg" />
            </div>
            <div className="flex items-center justify-between border-t border-forest-900/10 pt-3 dark:border-parchment-100/10">
              <span className="text-sm font-semibold text-forest-900 dark:text-parchment-100">{t.total}</span>
              <span className="font-mono text-xl font-semibold text-forest-900 dark:text-gold-400">
                {breakdown.lineTotal.toFixed(2)} SAR
              </span>
            </div>

            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className="w-full"
              icon={justAdded ? <Check className="h-4 w-4" /> : undefined}
            >
              {justAdded ? t.addedToCart : t.addToCart}
            </Button>

            <AnimatePresence>
              {justAdded && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-xs text-moss-500 dark:text-moss-300"
                >
                  {product.name[locale]} · {quantity} × {breakdown.unitPrice.toFixed(2)} SAR
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="font-display text-xl font-semibold text-forest-900 dark:text-parchment-100">
            {t.ingredients}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.ingredients.map((ing) => (
              <li
                key={ing.en}
                className="rounded-full bg-forest-900/5 px-3 py-1.5 text-sm text-forest-900 dark:bg-parchment-100/5 dark:text-parchment-100"
              >
                {ing[locale]}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-forest-900 dark:text-parchment-100">
            {t.nutrition}
          </h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [t.calories, product.nutrition.calories],
              [t.protein, `${product.nutrition.proteinGrams}g`],
              [t.carbs, `${product.nutrition.carbsGrams}g`],
              [t.fat, `${product.nutrition.fatGrams}g`],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="flex flex-col items-center rounded-xl bg-forest-900/5 py-3 dark:bg-parchment-100/5"
              >
                <dt className="text-xs text-ink-600 dark:text-moss-300">{label}</dt>
                <dd className="font-mono text-lg font-semibold text-forest-900 dark:text-parchment-100">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-xl font-semibold text-forest-900 dark:text-parchment-100">{t.reviews}</h2>
        <div className="mt-4">
          <RatingSummary
            reviews={product.reviews}
            averageRating={product.rating}
            reviewCount={product.reviewCount}
            basedOnLabel={t.basedOn}
            ratingsWordLabel={t.ratingsWord}
          />
        </div>
        <div className="mt-6">
          <ReviewList reviews={product.reviews} locale={locale} />
        </div>
      </section>

      <RelatedProductsSection products={related} locale={locale} title={t.relatedProducts} />
    </div>
  );
}
