import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, MapPin, Clock } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { copy } from "@/constants/copy";
import { orderService } from "@/features/orders/services/orderService";
import { buildWhatsAppLink } from "@/features/orders/utils/whatsapp";
import type { Order } from "@/types/order";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/StateViews";
import { VineRule } from "@/components/ui/VineRule";

export function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].orderConfirmation;
  const cartT = copy[locale].cart;

  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    orderService.getOrderById(id).then((result) => {
      if (!cancelled) setOrder(result ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24">
        <Skeleton className="h-64 w-full rounded-leaf" />
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24">
        <ErrorState title={t.notFoundTitle} description={t.notFoundDescription} />
        <div className="mt-6 flex justify-center">
          <Link to="/" className="text-sm font-semibold text-gold-500 hover:underline">
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-moss-500/15 text-moss-500">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="font-display text-3xl font-semibold text-forest-900 dark:text-parchment-100">
          {t.success}
        </h1>
        <VineRule />
      </motion.div>

      <div className="mt-8 flex flex-col gap-4 rounded-leaf border border-forest-900/10 bg-parchment-100 p-6 dark:border-parchment-100/10 dark:bg-forest-900">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-600 dark:text-moss-300">{t.orderNumber}</span>
          <span className="font-mono text-lg font-semibold text-forest-900 dark:text-gold-400">{order.id}</span>
        </div>
        <div className="flex items-center justify-between border-t border-forest-900/10 pt-4 dark:border-parchment-100/10">
          <span className="flex items-center gap-1.5 text-sm text-ink-600 dark:text-moss-300">
            <Clock className="h-4 w-4" />
            {t.estimatedTime}
          </span>
          <span className="font-mono text-sm font-semibold text-forest-900 dark:text-parchment-100">
            {order.estimatedReadyMinutes} {t.minutes}
          </span>
        </div>
        {order.deliveryMethod === "delivery" && (
          <div className="flex items-start justify-between gap-2 border-t border-forest-900/10 pt-4 dark:border-parchment-100/10">
            <span className="flex items-center gap-1.5 text-sm text-ink-600 dark:text-moss-300">
              <MapPin className="h-4 w-4 shrink-0" />
            </span>
            <span className="text-end text-sm text-forest-900 dark:text-parchment-100">
              {order.customer.city} — {order.customer.district} — {order.customer.address}
            </span>
          </div>
        )}

        <div className="border-t border-forest-900/10 pt-4 dark:border-parchment-100/10">
          <h2 className="mb-3 text-sm font-semibold text-forest-900 dark:text-parchment-100">{t.orderSummary}</h2>
          <div className="flex flex-col gap-1.5">
            {order.lines.map((line) => (
              <div key={line.lineId} className="flex items-center justify-between text-sm">
                <span className="text-ink-600 dark:text-moss-300">
                  {line.quantity}× {line.product.name[locale]}
                </span>
                <span className="font-mono text-forest-900 dark:text-parchment-100">
                  {(line.unitPrice * line.quantity).toFixed(2)} SAR
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-forest-900/10 pt-3 text-sm font-semibold dark:border-parchment-100/10">
            <span className="text-forest-900 dark:text-parchment-100">{cartT.grandTotal}</span>
            <span className="font-mono text-forest-900 dark:text-gold-400">
              {order.totals.grandTotal.toFixed(2)} SAR
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={buildWhatsAppLink(order, locale)} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="secondary" className="w-full" icon={<MessageCircle className="h-4 w-4" />}>
            {t.sendWhatsApp}
          </Button>
        </a>
        <Link to={`/orders/${order.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            {t.trackOrder}
          </Button>
        </Link>
      </div>

      <Link to="/" className="mt-4 block">
        <Button variant="primary" className="w-full">
          {t.backHome}
        </Button>
      </Link>
    </div>
  );
}
