import { useCallback, useEffect, useState } from "react";
import { menuService } from "@/features/menu/services/menuService";
import type { MenuFilters, Product, SortOption } from "@/types/menu";

interface UseProductListingParams {
  filters: MenuFilters;
  sort: SortOption;
  query: string;
  pageSize?: number;
}

export function useProductListing({ filters, sort, query, pageSize = 9 }: UseProductListingParams) {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (targetPage: number, append: boolean) => {
      if (append) setIsLoadingMore(true);
      else setIsLoading(true);
      setError(null);
      try {
        const result = await menuService.getProducts({ page: targetPage, pageSize, filters, sort, query });
        setItems((prev) => (append ? [...prev, ...result.items] : result.items));
        setTotal(result.total);
        setHasMore(result.hasMore);
        setPage(targetPage);
      } catch {
        setError("failed");
      } finally {
        if (append) setIsLoadingMore(false);
        else setIsLoading(false);
      }
    },
    [filters, sort, query, pageSize]
  );

  // Reset to page 1 whenever filters/sort/query change
  useEffect(() => {
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), sort, query]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || isLoading || !hasMore) return;
    fetchPage(page + 1, true);
  }, [fetchPage, page, hasMore, isLoadingMore, isLoading]);

  const retry = useCallback(() => fetchPage(1, false), [fetchPage]);

  return { items, total, hasMore, isLoading, isLoadingMore, error, loadMore, retry };
}
