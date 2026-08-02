import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "lg";
}

export function QuantitySelector({ quantity, onChange, min = 1, max = 20, size = "sm" }: QuantitySelectorProps) {
  const [draft, setDraft] = useState(String(quantity));

  useEffect(() => setDraft(String(quantity)), [quantity]);

  function commit(next: number) {
    const clamped = Math.min(max, Math.max(min, next));
    onChange(clamped);
    setDraft(String(clamped));
  }

  const buttonSize = size === "lg" ? "h-11 w-11" : "h-8 w-8";
  const textSize = size === "lg" ? "text-lg" : "text-sm";

  return (
    <div
      className="inline-flex items-center rounded-full border border-forest-900/15 dark:border-parchment-100/15"
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={() => commit(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`flex ${buttonSize} items-center justify-center rounded-full text-forest-900 dark:text-parchment-100 transition-colors hover:bg-forest-900/5 dark:hover:bg-parchment-100/10 disabled:opacity-30`}
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={draft}
        onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
        onBlur={() => commit(Number(draft) || min)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit(Number(draft) || min);
        }}
        aria-label="Quantity"
        className={`w-10 border-0 bg-transparent text-center font-mono ${textSize} text-forest-900 dark:text-parchment-100 focus:outline-none`}
      />

      <button
        type="button"
        onClick={() => commit(quantity + 1)}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`flex ${buttonSize} items-center justify-center rounded-full text-forest-900 dark:text-parchment-100 transition-colors hover:bg-forest-900/5 dark:hover:bg-parchment-100/10 disabled:opacity-30`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
