import { apiClient } from "@/services/apiClient";
import type { Category, Product } from "@/types/menu";
import { categories as mockCategories, products as mockProducts } from "../data/mockMenu";

export const menuService = {
  async getCategories(): Promise<Category[]> {
    try {
      return await apiClient.get<Category[]>("/categories");
    } catch {
      return mockCategories;
    }
  },

  async getPopularProducts(limit = 6): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(`/products/popular?limit=${limit}`);
    } catch {
      return [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, limit);
    }
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(`/categories/${categoryId}/products`);
    } catch {
      return mockProducts.filter((p) => p.categoryId === categoryId);
    }
  },
};
