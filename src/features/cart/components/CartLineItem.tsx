import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { CartLine } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCartStore } from "@/features/cart/cartStore";

interface CartLineItemProps {
  line: CartLine;
  locale: Locale;
}

export function CartLineItem({ line, locale }: CartLineItemProps) {
  const t = copy[locale].cart;
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const lineTotal = line.unitPrice * line.quantity;

  return (
    <article className="flex gap-4 border-b border-forest-900/10 py-5 dark:border-parchment-100/10 last:border-0">
      <Link to={`/product/${line.product.id}`} className="shrink-0">
        <img
          src={line.product.images[0]}
          alt={line.product.name[locale]}
          className="h-20 w-20 rounded-xl object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${line.product.id}`}
            className="font-display text-base font-semibold text-forest-900 hover:underline dark:text-parchment-100"
          >
            {line.product.name[locale]}
          </Link>
          <span className="font-mono text-sm font-semibold text-forest-900 dark:text-gold-400">
            {lineTotal.toFixed(2)} SAR
          </span>
        </div>

        <div className="flex flex-wrap gap-x-3 text-xs text-ink-600 dark:text-moss-300">
          {line.selectedSize && (
            <span>
              {t.size}: {line.selectedSize.label[locale]}
            </span>
          )}
          {line.selectedExtras.length > 0 && (
            <span>
              {t.extras}: {line.selectedExtras.map((e) => e.label[locale]).join("، ")}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            quantity={line.quantity}
            onChange={(qty) => updateQuantity(line.lineId, qty)}
            max={10}
          />
          <button
            onClick={() => removeItem(line.lineId)}
            aria-label={t.remove}
            className="flex items-center gap-1 text-xs text-ember-500 hover:underline"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t.remove}
          </button>
        </div>
      </div>
    </article>
  );
}
