import { apiClient } from "@/services/apiClient";
import type { Category, MenuFilters, Product, SortOption } from "@/types/menu";
import {
  categories as mockCategories,
  products as mockProducts,
  getProductById as mockGetProductById,
  getRecommendedProducts as mockGetRecommended,
  searchProducts as mockSearchProducts,
} from "../data/mockMenu";

/** Simulates realistic network latency so loading states are actually exercised. */
function withMockLatency<T>(value: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface PagedProducts {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  filters?: Partial<MenuFilters>;
  sort?: SortOption;
  query?: string;
}

function applyFilters(items: Product[], filters?: Partial<MenuFilters>): Product[] {
  if (!filters) return items;
  return items.filter((p) => {
    if (filters.categoryId && p.categoryId !== filters.categoryId) return false;
    if (filters.priceMax != null && (p.discountPrice ?? p.price) > filters.priceMax) return false;
    if (filters.minRating != null && p.rating < filters.minRating) return false;
    if (filters.onlyPopular && !p.isPopular) return false;
    if (filters.onlyOffers && !p.hasOffer) return false;
    if (filters.onlyVegetarian && !p.isVegetarian) return false;
    if (filters.onlySpicy && !p.isSpicy) return false;
    if (filters.onlyAvailable && !p.isAvailable) return false;
    return true;
  });
}

function applySort(items: Product[], sort?: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "priceAsc":
      return sorted.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    case "priceDesc":
      return sorted.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "prepTime":
      return sorted.sort((a, b) => a.prepTimeMinutes - b.prepTimeMinutes);
    default:
      return sorted.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
  }
}

export const menuService = {
  async getCategories(): Promise<Category[]> {
    try {
      return await apiClient.get<Category[]>("/categories");
    } catch {
      return withMockLatency(mockCategories, 300);
    }
  },

  /** GET /api/menu — paginated, filterable, sortable product listing. */
  async getProducts({ page = 1, pageSize = 9, filters, sort, query }: GetProductsParams = {}): Promise<PagedProducts> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        ...(sort ? { sort } : {}),
        ...(query ? { q: query } : {}),
      });
      return await apiClient.get<PagedProducts>(`/menu?${params.toString()}`);
    } catch {
      const base = query ? mockSearchProducts(query) : mockProducts;
      const filtered = applySort(applyFilters(base, filters), sort);
      const start = (page - 1) * pageSize;
      const items = filtered.slice(start, start + pageSize);
      return withMockLatency({
        items,
        page,
        pageSize,
        total: filtered.length,
        hasMore: start + items.length < filtered.length,
      });
    }
  },

  async getPopularProducts(limit = 6): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(`/products/popular?limit=${limit}`);
    } catch {
      return withMockLatency(mockProducts.filter((p) => p.isPopular).slice(0, limit), 300);
    }
  },

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      return await apiClient.get<Product>(`/products/${id}`);
    } catch {
      return withMockLatency(mockGetProductById(id), 350);
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
    } catch {
      return withMockLatency(mockSearchProducts(query), 200);
    }
  },

  async getRecommendedProducts(product: Product, limit = 4): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(`/products/recommended?productId=${product.id}&limit=${limit}`);
    } catch {
      return withMockLatency(mockGetRecommended(product, limit), 300);
    }
  },
};
