import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, Clock3 } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useRecentSearchStore } from "@/features/search/recentSearchStore";
import { menuService } from "@/features/menu/services/menuService";
import type { Product } from "@/types/menu";
import type { Locale } from "@/constants/copy";
import { copy } from "@/constants/copy";

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-gold-400/40 text-inherit rounded-sm">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

interface SearchBarProps {
  locale: Locale;
  onSelectProduct?: () => void;
}

export function SearchBar({ locale, onSelectProduct }: SearchBarProps) {
  const t = copy[locale].menu;
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);
  const { terms: recentTerms, addTerm, clear: clearRecent } = useRecentSearchStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setIsSearching(true);
    menuService.searchProducts(debouncedQuery).then((items) => {
      if (!cancelled) {
        setResults(items);
        setIsSearching(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function commitSearch(term: string) {
    if (term.trim()) addTerm(term);
    setIsFocused(false);
  }

  const showPanel = isFocused;
  const showRecent = showPanel && !query.trim() && recentTerms.length > 0;
  const showResults = showPanel && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-full border border-forest-900/15 dark:border-parchment-100/15 bg-parchment-100 dark:bg-forest-900 px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-ink-600 dark:text-moss-300" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => e.key === "Enter" && commitSearch(query)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
          className="w-full bg-transparent text-sm text-forest-900 dark:text-parchment-100 placeholder:text-ink-600/50 dark:placeholder:text-moss-300/50 focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search" className="shrink-0">
            <X className="h-4 w-4 text-ink-600 dark:text-moss-300" />
          </button>
        )}
      </div>

      {showPanel && (showRecent || showResults) && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-forest-900/10 dark:border-parchment-100/10 bg-parchment-100 dark:bg-forest-900 shadow-xl">
          {showRecent && (
            <div className="p-3">
              <div className="flex items-center justify-between px-2 pb-1">
                <span className="font-mono text-xs uppercase tracking-wide text-ink-600/70 dark:text-moss-300/70">
                  {t.searchRecent}
                </span>
                <button onClick={clearRecent} className="text-xs text-ember-500 hover:underline">
                  {locale === "ar" ? "مسح" : "Clear"}
                </button>
              </div>
              {recentTerms.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    commitSearch(term);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-start text-sm text-forest-900 dark:text-parchment-100 hover:bg-forest-900/5 dark:hover:bg-parchment-100/10"
                >
                  <Clock3 className="h-3.5 w-3.5 text-ink-600/60 dark:text-moss-300/60" />
                  {term}
                </button>
              ))}
            </div>
          )}

          {showResults && (
            <div className="max-h-80 overflow-y-auto p-2">
              {isSearching ? (
                <p className="px-3 py-4 text-sm text-ink-600 dark:text-moss-300">
                  {locale === "ar" ? "جارٍ البحث..." : "Searching..."}
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-4 text-sm text-ink-600 dark:text-moss-300">{t.searchNoResults}</p>
              ) : (
                <>
                  <span className="block px-2 pb-1 font-mono text-xs uppercase tracking-wide text-ink-600/70 dark:text-moss-300/70">
                    {t.searchSuggestions}
                  </span>
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => {
                        commitSearch(query);
                        onSelectProduct?.();
                      }}
                      className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-forest-900/5 dark:hover:bg-parchment-100/10"
                    >
                      <img src={product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <span className="text-sm text-forest-900 dark:text-parchment-100">
                        {highlightMatch(product.name[locale], query)}
                      </span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
