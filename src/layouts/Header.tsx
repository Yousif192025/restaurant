import { Moon, Sun, Languages, ShoppingBag, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useUiStore } from "@/store/uiStore";
import { useCartStore } from "@/features/cart/cartStore";
import { copy } from "@/constants/copy";

export function Header() {
  const { theme, locale, toggleTheme, toggleLocale } = useUiStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[locale].nav;

  const navItems = [
    { label: t.menu, href: "/menu" },
    { label: t.table, href: "/table" },
    { label: t.orders, href: "/orders" },
    { label: t.about, href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-forest-900/10 dark:border-parchment-100/10 bg-parchment-200/90 dark:bg-forest-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 text-forest-900 dark:text-parchment-100">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-semibold">مطعمي</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-ink-600 hover:text-forest-900 dark:text-moss-300 dark:hover:text-parchment-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleLocale}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-full p-2 text-ink-600 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10 transition-colors"
          >
            <Languages className="h-5 w-5" />
            <span className="font-mono text-xs uppercase">{locale === "ar" ? "EN" : "AR"}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 text-ink-600 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link
            to="/cart"
            aria-label="Open cart"
            className="relative rounded-full p-2 text-ink-600 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember-500 px-1 text-[10px] font-bold text-parchment-100">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden rounded-full p-2 text-ink-600 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10 transition-colors"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-5 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
