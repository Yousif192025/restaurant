import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";
import type { CartTotals } from "@/features/cart/utils/cartTotals";
import { Button } from "@/components/ui/Button";
import { CouponInput } from "./CouponInput";

interface OrderSummaryProps {
  totals: CartTotals;
  locale: Locale;
}

export function OrderSummary({ totals, locale }: OrderSummaryProps) {
  const t = copy[locale].cart;

  const rows: { label: string; value: string; emphasis?: boolean; tone?: "discount" }[] = [
    { label: t.itemsSubtotal, value: `${totals.itemsSubtotal.toFixed(2)} SAR` },
    ...(totals.discount > 0
      ? [{ label: t.discount, value: `-${totals.discount.toFixed(2)} SAR`, tone: "discount" as const }]
      : []),
    {
      label: t.deliveryFee,
      value: totals.isFreeDelivery ? t.freeDelivery : `${totals.deliveryFee.toFixed(2)} SAR`,
    },
    { label: t.vat, value: `${totals.vat.toFixed(2)} SAR` },
  ];

  return (
    <aside className="flex flex-col gap-5 rounded-leaf border border-forest-900/10 bg-parchment-100 p-5 dark:border-parchment-100/10 dark:bg-forest-900">
      <h2 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
        {t.title}
      </h2>

      <CouponInput locale={locale} itemsSubtotal={totals.itemsSubtotal} />

      <div className="flex flex-col gap-2 border-t border-forest-900/10 pt-4 dark:border-parchment-100/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-ink-600 dark:text-moss-300">{row.label}</span>
            <span
              className={`font-mono ${
                row.tone === "discount" ? "text-ember-500" : "text-forest-900 dark:text-parchment-100"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}

        <div className="mt-2 flex items-center justify-between border-t border-forest-900/10 pt-3 dark:border-parchment-100/10">
          <span className="font-semibold text-forest-900 dark:text-parchment-100">{t.grandTotal}</span>
          <span className="font-mono text-xl font-semibold text-forest-900 dark:text-gold-400">
            {totals.grandTotal.toFixed(2)} SAR
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-forest-900/5 px-3 py-2.5 text-sm text-ink-600 dark:bg-parchment-100/5 dark:text-moss-300">
        <Clock className="h-4 w-4 shrink-0" />
        <span>
          {t.estimatedDelivery}: <strong className="font-mono">{t.estimatedDeliveryValue}</strong>
        </span>
      </div>

      <Link to="/checkout">
        <Button variant="primary" className="w-full">
          {t.checkout}
        </Button>
      </Link>
    </aside>
  );
}
