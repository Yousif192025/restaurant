import { ThumbsUp } from "lucide-react";
import type { Review } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { RatingStars } from "@/components/ui/RatingStars";

export function ReviewCard({ review, locale }: { review: Review; locale: Locale }) {
  const date = new Date(review.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="flex flex-col gap-2 border-b border-forest-900/10 py-4 last:border-0 dark:border-parchment-100/10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-900/10 text-xs font-semibold text-forest-900 dark:bg-parchment-100/10 dark:text-parchment-100">
            {review.author.charAt(0)}
          </span>
          <span className="text-sm font-semibold text-forest-900 dark:text-parchment-100">{review.author}</span>
        </div>
        <span className="text-xs text-ink-600/70 dark:text-moss-300/70">{date}</span>
      </div>
      <RatingStars rating={review.rating} showValue={false} size={13} />
      <p className="text-sm text-ink-600 dark:text-moss-300">{review.comment[locale]}</p>
      <button className="flex w-fit items-center gap-1.5 text-xs text-ink-600/70 hover:text-forest-900 dark:text-moss-300/70 dark:hover:text-parchment-100">
        <ThumbsUp className="h-3.5 w-3.5" />
        {review.helpfulCount}
      </button>
    </article>
  );
}
