interface VineRuleProps {
  className?: string;
  widthClass?: string;
}

/**
 * The page's signature mark: a single hand-drawn vine with three leaf buds.
 * Used under section titles in place of a plain rule or numbered markers —
 * there is no sequence to encode here, just a recurring motif tied to the
 * "Silver Leaf" name itself.
 */
export function VineRule({ className = "", widthClass = "w-24" }: VineRuleProps) {
  return (
    <svg
      viewBox="0 0 160 20"
      className={`${widthClass} h-5 text-gold-500 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 12c20-10 40-10 60 0s40 10 60 0 30-8 36-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M28 8c2-4 6-5 9-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M78 14c2 4 6 5 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M124 8c2-4 6-5 9-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
