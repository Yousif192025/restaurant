import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest-900 text-parchment-100 hover:bg-forest-800 dark:bg-gold-500 dark:text-forest-950 dark:hover:bg-gold-400",
  secondary:
    "bg-transparent border border-forest-900/30 text-forest-900 hover:border-forest-900 dark:border-parchment-100/30 dark:text-parchment-100 dark:hover:border-parchment-100",
  ghost:
    "bg-transparent text-forest-900 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10",
};

export function Button({ variant = "primary", icon, className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
