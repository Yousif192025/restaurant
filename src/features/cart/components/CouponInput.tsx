import { useState } from "react";
import { Check, Tag, X } from "lucide-react";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";
import { useCartStore } from "@/features/cart/cartStore";
import { couponService } from "@/features/cart/services/couponService";

interface CouponInputProps {
  locale: Locale;
  itemsSubtotal: number;
}

export function CouponInput({ locale, itemsSubtotal }: CouponInputProps) {
  const t = copy[locale].cart;
  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    if (!code.trim()) return;
    setIsValidating(true);
    setError(null);
    const result = await couponService.validate(code, itemsSubtotal);
    setIsValidating(false);

    if (result.valid && result.coupon) {
      applyCoupon(result.coupon);
      setCode("");
    } else if (result.reason === "min_subtotal" && result.coupon) {
      setError(`${t.couponMinSubtotal}: ${result.coupon.minSubtotal} SAR`);
    } else {
      setError(t.couponInvalid);
    }
  }

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-gold-500/40 bg-gold-500/10 px-3 py-2.5">
        <span className="flex items-center gap-2 text-sm font-semibold text-gold-500">
          <Tag className="h-4 w-4" />
          {appliedCoupon.code}
          <span className="font-normal text-forest-900 dark:text-parchment-100">
            — {appliedCoupon.description[locale]}
          </span>
        </span>
        <button
          onClick={removeCoupon}
          aria-label={t.couponRemove}
          className="rounded-full p-1 text-ink-600 hover:bg-forest-900/10 dark:text-moss-300 dark:hover:bg-parchment-100/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder={t.couponPlaceholder}
          aria-label={t.couponPlaceholder}
          className="flex-1 rounded-full border border-forest-900/15 bg-parchment-100 px-4 py-2.5 text-sm font-mono uppercase text-forest-900 placeholder:font-sans placeholder:normal-case placeholder:text-ink-600/50 focus:outline-none dark:border-parchment-100/15 dark:bg-forest-900 dark:text-parchment-100 dark:placeholder:text-moss-300/50"
        />
        <button
          onClick={handleApply}
          disabled={isValidating || !code.trim()}
          className="flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2.5 text-sm font-semibold text-parchment-100 transition-colors hover:bg-forest-800 disabled:opacity-40 dark:bg-gold-500 dark:text-forest-950 dark:hover:bg-gold-400"
        >
          {isValidating ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {t.couponApply}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-ember-500">{error}</p>}
    </div>
  );
}
