import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category } from "@/types/menu";
import type { Locale } from "@/constants/copy";

interface CategoryCardProps {
  category: Category;
  locale: Locale;
}

export function CategoryCard({ category, locale }: CategoryCardProps) {
  const Icon = (Icons[category.icon as keyof typeof Icons] ?? Icons.UtensilsCrossed) as LucideIcon;

  return (
    <button
      className="group flex flex-col items-center gap-3 rounded-leaf border border-forest-900/10 dark:border-parchment-100/10
        bg-parchment-100 dark:bg-forest-900 px-4 py-6 transition-all duration-200
        hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lg hover:shadow-forest-900/5"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-900/5 text-forest-900 group-hover:bg-gold-500/15 group-hover:text-gold-500 dark:bg-parchment-100/5 dark:text-parchment-100 transition-colors">
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <span className="text-sm font-semibold text-forest-900 dark:text-parchment-100">
        {category.name[locale]}
      </span>
      <span className="text-xs font-mono text-ink-600/70 dark:text-moss-300/70">
        {category.productCount} {locale === "ar" ? "أصناف" : "items"}
      </span>
    </button>
  );
}
