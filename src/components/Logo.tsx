interface LogoProps {
  className?: string;
}

/** The مطعمي mark: a single leaf vein rendered as a continuous stroke. */
export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 4C13 10 7 19 7 27c0 9 7.5 15 17 15s17-6 17-15c0-8-6-17-17-23Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 10v30M24 18c-4 1-8 4-9.5 8M24 24c4 .5 7.5 2.5 9.5 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
