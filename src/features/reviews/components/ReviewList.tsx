import { useState } from "react";
import type { Review } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { ReviewCard } from "./ReviewCard";

export function ReviewList({ reviews, locale }: { reviews: Review[]; locale: Locale }) {
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const filtered = starFilter ? reviews.filter((r) => Math.round(r.rating) === starFilter) : reviews;

  if (reviews.length === 0) {
    return (
      <p className="py-6 text-sm text-ink-600 dark:text-moss-300">
        {locale === "ar" ? "لا توجد تقييمات بعد." : "No reviews yet."}
      </p>
    );
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            onClick={() => setStarFilter(starFilter === star ? null : star)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              starFilter === star
                ? "border-gold-500 bg-gold-500/15 text-gold-500"
                : "border-forest-900/15 text-forest-900 dark:border-parchment-100/15 dark:text-parchment-100"
            }`}
          >
            {star} ★
          </button>
        ))}
      </div>
      {filtered.map((review) => (
        <ReviewCard key={review.id} review={review} locale={locale} />
      ))}
    </div>
  );
}
