import { Bike, Store } from "lucide-react";
import type { DeliveryMethod } from "@/types/order";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

interface DeliveryMethodSelectorProps {
  value: DeliveryMethod;
  onChange: (value: DeliveryMethod) => void;
  locale: Locale;
}

export function DeliveryMethodSelector({ value, onChange, locale }: DeliveryMethodSelectorProps) {
  const t = copy[locale].checkout;

  const options: { id: DeliveryMethod; label: string; hint: string; icon: typeof Bike }[] = [
    { id: "delivery", label: t.delivery, hint: t.deliveryHint, icon: Bike },
    { id: "pickup", label: t.pickup, hint: t.pickupHint, icon: Store },
  ];

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-forest-900 dark:text-parchment-100">
        {t.deliveryMethod}
      </legend>
      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t.deliveryMethod}>
        {options.map((opt) => {
          const isSelected = value === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.id)}
              className={`flex flex-col items-start gap-2 rounded-leaf border p-4 text-start transition-colors ${
                isSelected
                  ? "border-gold-500 bg-gold-500/10"
                  : "border-forest-900/15 dark:border-parchment-100/15 hover:border-forest-900/30"
              }`}
            >
              <Icon className={`h-5 w-5 ${isSelected ? "text-gold-500" : "text-forest-900 dark:text-parchment-100"}`} />
              <span className="text-sm font-semibold text-forest-900 dark:text-parchment-100">{opt.label}</span>
              <span className="text-xs text-ink-600 dark:text-moss-300">{opt.hint}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
