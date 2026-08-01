import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "gold" | "ember" | "moss";
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  gold: "bg-gold-500/15 text-gold-500 border-gold-500/30",
  ember: "bg-ember-500/15 text-ember-500 border-ember-500/30",
  moss: "bg-moss-500/15 text-moss-500 border-moss-500/30",
};

export function Badge({ children, tone = "gold" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium font-mono ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
