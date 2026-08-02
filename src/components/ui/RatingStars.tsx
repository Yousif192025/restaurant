import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function RatingStars({ rating, size = 14, showValue = true }: RatingStarsProps) {
  const rounded = Math.round(rating);

  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i < rounded ? "fill-gold-500 text-gold-500" : "fill-transparent text-forest-900/20 dark:text-parchment-100/20"}
          />
        ))}
      </span>
      {showValue && <span className="font-mono text-xs text-ink-600 dark:text-moss-300">{rating.toFixed(1)}</span>}
    </span>
  );
}
