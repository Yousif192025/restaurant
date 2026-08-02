import type { Review } from "@/types/menu";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface RatingSummaryProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  basedOnLabel: string;
  ratingsWordLabel: string;
}

export function RatingSummary({ reviews, averageRating, reviewCount, basedOnLabel, ratingsWordLabel }: RatingSummaryProps) {
  const counts = [5, 4, 3, 2, 1].map((star) => reviews.filter((r) => Math.round(r.rating) === star).length);
  const maxCount = Math.max(1, ...counts);

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="flex shrink-0 flex-col items-center gap-1 sm:items-start">
        <span className="font-display text-4xl font-semibold text-forest-900 dark:text-parchment-100">
          {averageRating.toFixed(1)}
        </span>
        <RatingStars rating={averageRating} showValue={false} size={16} />
        <span className="text-xs text-ink-600 dark:text-moss-300">
          {basedOnLabel} {reviewCount} {ratingsWordLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {[5, 4, 3, 2, 1].map((star, i) => (
          <ProgressBar key={star} label={`${star} ★`} value={(counts[i] / maxCount) * 100} />
        ))}
      </div>
    </div>
  );
}
