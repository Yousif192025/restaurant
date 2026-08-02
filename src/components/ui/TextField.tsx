import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({ label, error, id, className = "", ...props }: TextFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-forest-900 dark:text-parchment-100">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`rounded-xl border bg-parchment-100 px-4 py-2.5 text-sm text-forest-900 placeholder:text-ink-600/50 focus:outline-none dark:bg-forest-900 dark:text-parchment-100 dark:placeholder:text-moss-300/50 ${
          error ? "border-ember-500" : "border-forest-900/15 dark:border-parchment-100/15"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="text-xs text-ember-500">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextAreaField({ label, error, id, className = "", ...props }: TextAreaFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-forest-900 dark:text-parchment-100">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={3}
        aria-invalid={!!error}
        className={`resize-none rounded-xl border bg-parchment-100 px-4 py-2.5 text-sm text-forest-900 placeholder:text-ink-600/50 focus:outline-none dark:bg-forest-900 dark:text-parchment-100 dark:placeholder:text-moss-300/50 ${
          error ? "border-ember-500" : "border-forest-900/15 dark:border-parchment-100/15"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-ember-500">{error}</p>}
    </div>
  );
}
