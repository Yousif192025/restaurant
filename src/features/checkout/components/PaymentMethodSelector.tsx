import { Banknote, CreditCard, Smartphone, Landmark } from "lucide-react";
import type { PaymentMethod } from "@/types/order";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  locale: Locale;
}

export function PaymentMethodSelector({ value, onChange, locale }: PaymentMethodSelectorProps) {
  const t = copy[locale].checkout;

  const options: { id: PaymentMethod; label: string; icon: typeof Banknote }[] = [
    { id: "cash", label: t.paymentCash, icon: Banknote },
    { id: "mada", label: t.paymentMada, icon: CreditCard },
    { id: "visa", label: t.paymentVisa, icon: CreditCard },
    { id: "mastercard", label: t.paymentMastercard, icon: CreditCard },
    { id: "apple_pay", label: t.paymentApplePay, icon: Smartphone },
    { id: "stc_pay", label: t.paymentStcPay, icon: Smartphone },
    { id: "bank_transfer", label: t.paymentBankTransfer, icon: Landmark },
  ];

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-forest-900 dark:text-parchment-100">
        {t.paymentMethod}
      </legend>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3" role="radiogroup" aria-label={t.paymentMethod}>
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
              className={`flex items-center gap-2 rounded-xl border p-3 text-start transition-colors ${
                isSelected
                  ? "border-gold-500 bg-gold-500/10"
                  : "border-forest-900/15 dark:border-parchment-100/15 hover:border-forest-900/30"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-gold-500" : "text-forest-900 dark:text-parchment-100"}`} />
              <span className="text-xs font-medium text-forest-900 dark:text-parchment-100">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
