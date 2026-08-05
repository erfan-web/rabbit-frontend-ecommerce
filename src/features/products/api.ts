import { api } from "@/shared/lib/api/axiosInstance";
import type { Product } from "@/shared/types";

export type ProductFilters = {
  collection?: string;
  size?: string;
  color?: string;
  gender?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  search?: string;
  category?: string;
  material?: string;
  brand?: string;
  limit?: string | number;
};

export const productsApi = {
  getByFilters: (filters: ProductFilters) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.append(key, String(value));
      }
    });
    return api.get<Product[]>(`/products?${query.toString()}`).then((r) => r.data);
  },

  getBySearch: (key: string) =>
    api.get<Product[]>(`/products?search=${key}`).then((r) => r.data),

  getAll: () => api.get<Product[]>("/products").then((r) => r.data),

  getHomeProducts: () =>
    api
      .get<Product[]>("/products?gender=Women&category=Bottom Wear&limit=8")
      .then((r) => r.data),

  getDetail: (id: string) =>
    api.get<Product>(`/products/single/${id}`).then((r) => r.data),

  getSimilar: (id: string) =>
    api.get<Product[]>(`/products/similar/${id}`).then((r) => r.data),

  getNewArrivals: () =>
    api.get<Product[]>("/products/new-arrivals").then((r) => r.data),

  getBestSellers: () =>
    api
      .get<Product[]>("/products?sortBy=popularity&limit=8")
      .then((r) => r.data),

  update: (id: string | undefined, productData: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, productData).then((r) => r.data),

  remove: (id: string) =>
    api.delete<{ message: string }>(`/products/${id}`).then((r) => r.data),
};