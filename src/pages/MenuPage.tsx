import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { copy } from "@/constants/copy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateViews";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/features/menu/components/ProductCard";
import { CategoryNav } from "@/features/menu/components/CategoryNav";
import { FilterDrawer } from "@/features/menu/components/FilterDrawer";
import { SearchBar } from "@/features/search/components/SearchBar";
import { categories } from "@/features/menu/data/mockMenu";
import { useMenuFilters } from "@/features/menu/hooks/useMenuFilters";
import { useProductListing } from "@/features/menu/hooks/useProductListing";
import { useInfiniteScrollSentinel } from "@/hooks/useInfiniteScrollSentinel";
import type { SortOption } from "@/types/menu";

export function MenuPage() {
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].menu;
  const popularT = copy[locale].popular;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { filters, updateFilter, reset, sort, setSort, activeFilterCount } = useMenuFilters();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) updateFilter("categoryId", categoryFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectCategory(id: string | null) {
    updateFilter("categoryId", id);
    setSearchParams(id ? { category: id } : {});
  }

  const { items, total, hasMore, isLoading, isLoadingMore, error, loadMore, retry } = useProductListing({
    filters,
    sort,
    query: "",
  });

  const sentinelRef = useInfiniteScrollSentinel(loadMore, hasMore && !isLoading);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "recommended", label: t.sortRecommended },
    { value: "priceAsc", label: t.sortPriceAsc },
    { value: "priceDesc", label: t.sortPriceDesc },
    { value: "rating", label: t.sortRating },
    { value: "prepTime", label: t.sortPrepTime },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow="مطعمي" title={t.title} subtitle={t.subtitle} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar locale={locale} />

        <div className="flex items-center gap-3">
          <SelectField
            aria-label={t.sortLabel}
            options={sortOptions}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          />
          <button
            onClick={() => setIsFilterOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-forest-900/15 dark:border-parchment-100/15 px-4 py-2.5 text-sm font-medium text-forest-900 dark:text-parchment-100 hover:border-gold-500 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t.filters}
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-forest-950">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <CategoryNav
          categories={categories}
          activeCategoryId={filters.categoryId}
          onSelect={selectCategory}
          locale={locale}
          allLabel={t.allCategories}
        />
      </div>

      {!isLoading && !error && (
        <p className="mt-6 font-mono text-xs text-ink-600/70 dark:text-moss-300/70">
          {total} {t.resultsCount}
        </p>
      )}

      <div className="mt-4">
        {error ? (
          <ErrorState title={t.errorTitle} description={t.errorDescription} onRetry={retry} retryLabel={t.retry} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title={t.emptyTitle}
            description={t.emptyDescription}
            action={
              <Button variant="secondary" onClick={reset}>
                {t.filtersReset}
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    addToCartLabel={popularT.addToCart}
                    viewDetailsLabel={popularT.viewDetails}
                  />
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div ref={sentinelRef} className="mt-8 flex justify-center">
                {isLoadingMore && (
                  <span className="font-mono text-xs text-ink-600 dark:text-moss-300">
                    {locale === "ar" ? "جارٍ التحميل..." : "Loading..."}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onUpdate={updateFilter}
        onReset={reset}
        locale={locale}
      />
    </div>
  );
}
