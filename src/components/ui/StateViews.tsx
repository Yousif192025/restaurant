import type { ReactNode } from "react";
import { SearchX, TriangleAlert } from "lucide-react";
import { Button } from "./Button";

interface StateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: StateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 rounded-leaf border border-dashed border-forest-900/15 dark:border-parchment-100/15 px-6 py-16 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-900/5 text-forest-900 dark:bg-parchment-100/5 dark:text-parchment-100">
        <SearchX className="h-6 w-6" />
      </span>
      <h3 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
        {title}
      </h3>
      {description && <p className="max-w-sm text-sm text-ink-600 dark:text-moss-300">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ title, description, onRetry, retryLabel }: StateProps & { onRetry?: () => void; retryLabel?: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-leaf border border-ember-500/30 bg-ember-500/5 px-6 py-16 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ember-500/15 text-ember-500">
        <TriangleAlert className="h-6 w-6" />
      </span>
      <h3 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
        {title}
      </h3>
      {description && <p className="max-w-sm text-sm text-ink-600 dark:text-moss-300">{description}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          {retryLabel ?? "Try again"}
        </Button>
      )}
    </div>
  );
}
