import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function SelectField({ options, className = "", ...props }: SelectFieldProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        {...props}
        className={`appearance-none rounded-full border border-forest-900/15 dark:border-parchment-100/15 bg-parchment-100 dark:bg-forest-900 py-2.5 ps-4 pe-9 text-sm font-medium text-forest-900 dark:text-parchment-100 focus:outline-none ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 h-4 w-4 text-ink-600 dark:text-moss-300" />
    </div>
  );
}
