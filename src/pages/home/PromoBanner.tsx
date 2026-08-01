import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

interface Offer {
  code: string;
  title: { ar: string; en: string };
  detail: { ar: string; en: string };
}

const offers: Offer[] = [
  {
    code: "LEAF20",
    title: { ar: "خصم 20% على أول طلب", en: "20% off your first order" },
    detail: { ar: "على جميع أطباق البرجر والمشاوي", en: "On all burgers and grills" },
  },
  {
    code: "TRUFFLE10",
    title: { ar: "بيتزا الكمأة بخصم 10 ريال", en: "SAR 10 off Truffle Pizza" },
    detail: { ar: "لفترة محدودة هذا الأسبوع", en: "Limited time this week" },
  },
  {
    code: "FREEDESSERT",
    title: { ar: "حلوى مجانية مع كل طلب فوق 100 ريال", en: "Free dessert on orders over SAR 100" },
    detail: { ar: "لا حاجة لكوبون، يُطبّق تلقائيًا", en: "No coupon needed, applied automatically" },
  },
];

export function PromoBanner({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  const t = copy[locale].promo;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % offers.length), 5000);
    return () => clearInterval(id);
  }, []);

  const offer = offers[index];
  const goTo = (delta: number) => setIndex((i) => (i + delta + offers.length) % offers.length);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="relative overflow-hidden rounded-leaf bg-forest-900 dark:bg-forest-900 px-6 py-8 sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, var(--color-gold-500), transparent 45%), radial-gradient(circle at 85% 80%, var(--color-ember-500), transparent 45%)",
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
              <Ticket className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold-400">
                {t.title}
              </span>
              <h3 className="font-display text-xl font-semibold text-parchment-100 sm:text-2xl">
                {offer.title[locale]}
              </h3>
              <p className="text-sm text-moss-300">{offer.detail[locale]}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <span className="rounded-full border border-dashed border-gold-400/60 px-4 py-2 font-mono text-sm font-semibold text-gold-400">
              {offer.code}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goTo(-1)}
                aria-label="Previous offer"
                className="rounded-full p-2 text-parchment-100/70 hover:bg-parchment-100/10 hover:text-parchment-100 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </button>
              <button
                onClick={() => goTo(1)}
                aria-label="Next offer"
                className="rounded-full p-2 text-parchment-100/70 hover:bg-parchment-100/10 hover:text-parchment-100 transition-colors"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex gap-1.5">
          {offers.map((o, i) => (
            <button
              key={o.code}
              onClick={() => setIndex(i)}
              aria-label={`Go to offer ${i + 1}`}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i === index ? "bg-gold-500" : "bg-parchment-100/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
