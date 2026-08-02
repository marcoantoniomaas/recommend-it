import { api } from "@/services/api";
import type { Category, Page, Recommendation, RecommendationPayload, Tag } from "@/types";

export interface RecommendationQuery {
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

function toQueryString(query: RecommendationQuery) {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  params.set("page", String(query.page ?? 1));
  params.set("page_size", String(query.pageSize ?? 24));
  return params.toString();
}

export const recommendationsService = {
  list: (query: RecommendationQuery = {}) =>
    api.get<Page<Recommendation>>(`/recommendations?${toQueryString(query)}`),
  get: (id: number) => api.get<Recommendation>(`/recommendations/${id}`),
  create: (payload: RecommendationPayload) =>
    api.post<Recommendation>("/recommendations", payload),
  update: (id: number, payload: Partial<RecommendationPayload>) =>
    api.put<Recommendation>(`/recommendations/${id}`, payload),
  remove: (id: number) => api.delete<void>(`/recommendations/${id}`),
  uploadCover: (file: File) => api.upload<{ url: string }>("/uploads/cover", file),
};

export const categoriesService = {
  list: () => api.get<Category[]>("/categories"),
};

export const tagsService = {
  list: () => api.get<Tag[]>("/tags"),
};
