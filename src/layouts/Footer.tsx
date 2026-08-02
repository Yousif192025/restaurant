import { Logo } from "@/components/Logo";
import { useUiStore } from "@/store/uiStore";
import { copy } from "@/constants/copy";

export function Footer() {
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].footer;

  return (
    <footer className="border-t border-forest-900/10 dark:border-parchment-100/10 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-forest-900 dark:text-parchment-100">
          <Logo className="h-6 w-6" />
          <span className="font-display font-semibold">مطعمي</span>
        </div>
        <p className="text-sm text-ink-600 dark:text-moss-300 text-center">{t.tagline}</p>
        <p className="text-xs font-mono text-ink-600/70 dark:text-moss-300/70">
          © {new Date().getFullYear()} مطعمي — {t.rights}
        </p>
      </div>
    </footer>
  );
}
