import type { SizeOption } from "@/types/menu";
import type { Locale } from "@/constants/copy";

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedId: string;
  onSelect: (size: SizeOption) => void;
  locale: Locale;
  label: string;
}

export function SizeSelector({ sizes, selectedId, onSelect, locale, label }: SizeSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-forest-900 dark:text-parchment-100">{label}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {sizes.map((size) => {
          const isSelected = size.id === selectedId;
          return (
            <button
              key={size.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(size)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-gold-500 bg-gold-500/15 text-gold-500"
                  : "border-forest-900/15 text-forest-900 dark:border-parchment-100/15 dark:text-parchment-100 hover:border-forest-900/30"
              }`}
            >
              {size.label[locale]}
              {size.priceDelta !== 0 && (
                <span className="ms-1 font-mono text-xs opacity-70">
                  {size.priceDelta > 0 ? "+" : ""}
                  {size.priceDelta}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
