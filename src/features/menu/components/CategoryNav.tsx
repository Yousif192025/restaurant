import { getCategoryIcon } from "@/constants/categoryIcons";
import type { Category } from "@/types/menu";
import type { Locale } from "@/constants/copy";

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
  locale: Locale;
  allLabel: string;
}

export function CategoryNav({ categories, activeCategoryId, onSelect, locale, allLabel }: CategoryNavProps) {
  return (
    <nav
      aria-label="Category navigation"
      className="sticky top-[73px] z-20 -mx-5 overflow-x-auto border-b border-forest-900/10 bg-parchment-200/95 px-5 py-3 backdrop-blur dark:border-parchment-100/10 dark:bg-forest-950/95 sm:mx-0 sm:rounded-full sm:border sm:px-3"
    >
      <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
        <button
          onClick={() => onSelect(null)}
          aria-current={activeCategoryId === null}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategoryId === null
              ? "bg-forest-900 text-parchment-100 dark:bg-gold-500 dark:text-forest-950"
              : "text-ink-600 hover:bg-forest-900/5 dark:text-moss-300 dark:hover:bg-parchment-100/10"
          }`}
        >
          {allLabel}
        </button>

        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              aria-current={isActive}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-forest-900 text-parchment-100 dark:bg-gold-500 dark:text-forest-950"
                  : "text-ink-600 hover:bg-forest-900/5 dark:text-moss-300 dark:hover:bg-parchment-100/10"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} />
              {category.name[locale]}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
