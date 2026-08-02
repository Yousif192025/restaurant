import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUiStore } from "@/store/uiStore";
import { copy } from "@/constants/copy";
import { useCartStore } from "@/features/cart/cartStore";
import { CartLineItem } from "@/features/cart/components/CartLineItem";
import { OrderSummary } from "@/features/cart/components/OrderSummary";
import { computeCartTotals } from "@/features/cart/utils/cartTotals";
import { EmptyState } from "@/components/ui/StateViews";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CartPage() {
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].cart;
  const lines = useCartStore((s) => s.lines);
  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const totals = useMemo(() => computeCartTotals(lines, appliedCoupon), [lines, appliedCoupon]);

  useEffect(() => {
    if (lines.length === 0 && appliedCoupon) removeCoupon();
  }, [lines.length, appliedCoupon, removeCoupon]);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24">
        <EmptyState
          title={t.emptyTitle}
          description={t.emptyDescription}
          action={
            <Link to="/menu">
              <Button variant="primary">{t.browseMenu}</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading
        eyebrow="مطعمي"
        title={t.title}
        subtitle={`${lines.reduce((sum, l) => sum + l.quantity, 0)} ${t.itemsCount}`}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-leaf border border-forest-900/10 bg-parchment-100 px-5 dark:border-parchment-100/10 dark:bg-forest-900">
          {lines.map((line) => (
            <CartLineItem key={line.lineId} line={line} locale={locale} />
          ))}
        </div>

        <OrderSummary totals={totals} locale={locale} />
      </div>
    </div>
  );
}
