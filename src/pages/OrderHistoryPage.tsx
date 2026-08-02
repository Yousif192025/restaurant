import { Link } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { copy } from "@/constants/copy";
import { useOrdersStore } from "@/features/orders/ordersStore";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/StateViews";
import { Button } from "@/components/ui/Button";

export function OrderHistoryPage() {
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].orderHistory;
  const orders = useOrdersStore((s) => s.orders);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <SectionHeading eyebrow="مطعمي" title={t.title} />

      <div className="mt-8">
        {orders.length === 0 ? (
          <EmptyState
            title={t.empty}
            action={
              <Link to="/menu">
                <Button variant="primary">{copy[locale].cart.browseMenu}</Button>
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex items-center justify-between gap-3 rounded-leaf border border-forest-900/10 bg-parchment-100 p-4 transition-colors hover:border-gold-500/50 dark:border-parchment-100/10 dark:bg-forest-900"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm font-semibold text-forest-900 dark:text-gold-400">
                    {order.id}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-ink-600 dark:text-moss-300">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(order.createdAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-forest-900 dark:text-parchment-100">
                    {order.totals.grandTotal.toFixed(2)} SAR
                  </span>
                  <ChevronRight className="h-4 w-4 text-ink-600 rtl:rotate-180 dark:text-moss-300" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
