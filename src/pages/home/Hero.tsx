import { ArrowRight, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VineRule } from "@/components/ui/VineRule";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale].hero;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:grid-cols-2 md:pt-20">
        <div className="flex flex-col items-start gap-6">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-ember-500 dark:text-ember-400">
            {t.eyebrow}
          </span>

          <h1 className="text-4xl font-semibold leading-[1.1] text-forest-900 dark:text-parchment-100 sm:text-5xl md:text-[3.2rem] text-balance">
            {t.title}
          </h1>

          <VineRule widthClass="w-32" />

          <p className="max-w-md text-base leading-relaxed text-ink-600 dark:text-moss-300 text-balance">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="primary" icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}>
              {t.ctaPrimary}
            </Button>
            <Button variant="secondary">{t.ctaSecondary}</Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex flex-col">
              <span className="flex items-center gap-1 font-display text-xl font-semibold text-forest-900 dark:text-parchment-100">
                <Star className="h-4 w-4 fill-gold-500 text-gold-500" /> 4.9
              </span>
              <span className="text-xs text-ink-600/70 dark:text-moss-300/70">{t.stat1Label}</span>
            </div>
            <div className="h-8 w-px bg-forest-900/10 dark:bg-parchment-100/10" />
            <div className="flex flex-col">
              <span className="flex items-center gap-1 font-display text-xl font-semibold text-forest-900 dark:text-parchment-100">
                <Timer className="h-4 w-4 text-ember-500" /> 24
                <span className="text-sm font-normal">{locale === "ar" ? "دقيقة" : "min"}</span>
              </span>
              <span className="text-xs text-ink-600/70 dark:text-moss-300/70">{t.stat2Label}</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            className="relative aspect-square w-full overflow-hidden shadow-2xl shadow-forest-900/20"
            style={{ borderRadius: "62% 38% 55% 45% / 55% 45% 60% 40%" }}
          >
            <img
              src="https://picsum.photos/seed/silverleaf-hero-dish/800/800"
              alt="Signature dish"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 start-2 flex items-center gap-3 rounded-2xl bg-parchment-100 dark:bg-forest-800 px-4 py-3 shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
              <Star className="h-5 w-5 fill-gold-500" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold text-forest-900 dark:text-parchment-100">
                {locale === "ar" ? "طبق اليوم" : "Chef's Pick"}
              </span>
              <span className="text-xs text-ink-600/70 dark:text-moss-300/70">
                {locale === "ar" ? "أسياخ الواغيو" : "Wagyu Skewers"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
