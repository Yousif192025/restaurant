import { VineRule } from "./VineRule";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "start" }: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-start";

  return (
    <div className={`flex flex-col gap-3 ${alignment} max-w-xl`}>
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.18em] uppercase text-ember-500 dark:text-ember-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold text-forest-900 dark:text-parchment-100 text-balance">
        {title}
      </h2>
      <VineRule />
      {subtitle && (
        <p className="text-ink-600 dark:text-moss-300 text-base leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
