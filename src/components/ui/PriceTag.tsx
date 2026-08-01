interface PriceTagProps {
  price: number;
  discountPrice?: number;
  currency?: string;
  size?: "sm" | "lg";
}

export function PriceTag({ price, discountPrice, currency = "SAR", size = "sm" }: PriceTagProps) {
  const hasDiscount = typeof discountPrice === "number" && discountPrice < price;
  const textSize = size === "lg" ? "text-2xl" : "text-base";

  return (
    <span className="inline-flex items-baseline gap-2 font-mono">
      <span className={`${textSize} font-semibold text-forest-900 dark:text-gold-400`}>
        {(hasDiscount ? discountPrice : price)?.toFixed(2)} {currency}
      </span>
      {hasDiscount && (
        <span className="text-xs text-ink-600/60 dark:text-parchment-100/40 line-through">
          {price.toFixed(2)}
        </span>
      )}
    </span>
  );
}
