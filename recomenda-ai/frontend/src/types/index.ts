export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Link {
  id: number;
  label: string;
  url: string;
}

export interface Recommendation {
  id: number;
  title: string;
  description: string | null;
  recommended_by: string;
  cover_image_url: string | null;
  category_id: number;
  category: Category;
  tags: Tag[];
  links: Link[];
  created_at: string;
  updated_at: string;
}

export interface RecommendationPayload {
  title: string;
  description: string | null;
  recommended_by: string;
  cover_image_url: string | null;
  category_id: number;
  tags: string[];
  links: { label: string; url: string }[];
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}

/* Future modules (ratings, comments, favorites, feed) add their types here. */
