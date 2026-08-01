import { Link } from "react-router-dom";
import { VineRule } from "@/components/ui/VineRule";
import { useUiStore } from "@/store/uiStore";

export function ComingSoonPage() {
  const locale = useUiStore((s) => s.locale);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-32 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ember-500">
        {locale === "ar" ? "قيد الإنشاء" : "Coming in the next milestone"}
      </span>
      <h1 className="font-display text-3xl font-semibold text-forest-900 dark:text-parchment-100">
        {locale === "ar" ? "هذه الصفحة قيد التطوير" : "This page is being built"}
      </h1>
      <VineRule />
      <p className="text-ink-600 dark:text-moss-300">
        {locale === "ar"
          ? "سيتم إضافتها في المرحلة التالية من إعادة البناء."
          : "It will be added in the next rebuild milestone."}
      </p>
      <Link
        to="/"
        className="mt-4 rounded-full bg-forest-900 px-6 py-3 text-sm font-semibold text-parchment-100 dark:bg-gold-500 dark:text-forest-950"
      >
        {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
      </Link>
    </div>
  );
}
