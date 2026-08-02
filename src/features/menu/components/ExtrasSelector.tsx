import type { ExtraOption } from "@/types/menu";
import type { Locale } from "@/constants/copy";

interface ExtrasSelectorProps {
  extras: ExtraOption[];
  selectedIds: string[];
  onToggle: (extra: ExtraOption) => void;
  locale: Locale;
  label: string;
}

export function ExtrasSelector({ extras, selectedIds, onToggle, locale, label }: ExtrasSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-forest-900 dark:text-parchment-100">{label}</legend>
      <div className="flex flex-col gap-1">
        {extras.map((extra) => {
          const isSelected = selectedIds.includes(extra.id);
          return (
            <label
              key={extra.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-forest-900/5 dark:hover:bg-parchment-100/5"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(extra)}
                  className="h-5 w-5 rounded border-forest-900/30 text-gold-500 focus:ring-gold-500 dark:border-parchment-100/30"
                />
                <span className="text-sm text-forest-900 dark:text-parchment-100">{extra.label[locale]}</span>
              </span>
              <span className="font-mono text-xs text-ink-600 dark:text-moss-300">+{extra.price} SAR</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
