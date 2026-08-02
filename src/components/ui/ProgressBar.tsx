interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="w-10 shrink-0 font-mono text-xs text-ink-600 dark:text-moss-300">{label}</span>}
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-forest-900/10 dark:bg-parchment-100/10"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-gold-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
