export function PageLoadingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
    </div>
  );
}
