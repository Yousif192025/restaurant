import type { ReactNode } from "react";

interface CheckboxRowProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
}

export function CheckboxRow({ checked, onChange, label }: CheckboxRowProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-forest-900/5 dark:hover:bg-parchment-100/5">
      <span className="text-sm text-forest-900 dark:text-parchment-100">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-forest-900/30 text-gold-500 focus:ring-gold-500 dark:border-parchment-100/30"
      />
    </label>
  );
}
