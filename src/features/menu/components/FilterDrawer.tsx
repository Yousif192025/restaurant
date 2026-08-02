import { Drawer } from "@/components/ui/Drawer";
import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { Button } from "@/components/ui/Button";
import type { MenuFilters } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MenuFilters;
  onUpdate: <K extends keyof MenuFilters>(key: K, value: MenuFilters[K]) => void;
  onReset: () => void;
  locale: Locale;
}

const PRICE_STEPS = [20, 35, 50, 70, 100];
const RATING_STEPS = [3, 3.5, 4, 4.5];

export function FilterDrawer({ isOpen, onClose, filters, onUpdate, onReset, locale }: FilterDrawerProps) {
  const t = copy[locale].menu;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={t.filters}>
      <div className="flex flex-col gap-6">
        <section>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-600/70 dark:text-moss-300/70">
            {t.filterPrice}
          </h3>
          <div className="flex flex-wrap gap-2">
            {PRICE_STEPS.map((price) => (
              <button
                key={price}
                onClick={() => onUpdate("priceMax", filters.priceMax === price ? null : price)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  filters.priceMax === price
                    ? "border-gold-500 bg-gold-500/15 text-gold-500"
                    : "border-forest-900/15 text-forest-900 dark:border-parchment-100/15 dark:text-parchment-100"
                }`}
              >
                ≤ {price} SAR
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-600/70 dark:text-moss-300/70">
            {t.filterRating}
          </h3>
          <div className="flex flex-wrap gap-2">
            {RATING_STEPS.map((rating) => (
              <button
                key={rating}
                onClick={() => onUpdate("minRating", filters.minRating === rating ? null : rating)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  filters.minRating === rating
                    ? "border-gold-500 bg-gold-500/15 text-gold-500"
                    : "border-forest-900/15 text-forest-900 dark:border-parchment-100/15 dark:text-parchment-100"
                }`}
              >
                {rating}+
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col">
          <CheckboxRow
            checked={filters.onlyPopular}
            onChange={(v) => onUpdate("onlyPopular", v)}
            label={t.filterPopular}
          />
          <CheckboxRow
            checked={filters.onlyOffers}
            onChange={(v) => onUpdate("onlyOffers", v)}
            label={t.filterOffers}
          />
          <CheckboxRow
            checked={filters.onlyVegetarian}
            onChange={(v) => onUpdate("onlyVegetarian", v)}
            label={t.filterVegetarian}
          />
          <CheckboxRow
            checked={filters.onlySpicy}
            onChange={(v) => onUpdate("onlySpicy", v)}
            label={t.filterSpicy}
          />
          <CheckboxRow
            checked={filters.onlyAvailable}
            onChange={(v) => onUpdate("onlyAvailable", v)}
            label={t.filterAvailable}
          />
        </section>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onReset} className="flex-1">
            {t.filtersReset}
          </Button>
          <Button variant="primary" onClick={onClose} className="flex-1">
            {t.filtersApply}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
