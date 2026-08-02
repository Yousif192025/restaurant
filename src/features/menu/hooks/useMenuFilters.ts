import { useState } from "react";
import type { MenuFilters, SortOption } from "@/types/menu";
import { defaultMenuFilters } from "@/types/menu";

export function useMenuFilters() {
  const [filters, setFilters] = useState<MenuFilters>(defaultMenuFilters);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [query, setQuery] = useState("");

  function updateFilter<K extends keyof MenuFilters>(key: K, value: MenuFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setFilters(defaultMenuFilters);
  }

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "categoryId") return false; // category has its own sticky nav, not counted as a "filter"
    return value !== null && value !== false;
  }).length;

  return { filters, setFilters, updateFilter, reset, sort, setSort, query, setQuery, activeFilterCount };
}
