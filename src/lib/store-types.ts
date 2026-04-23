import type { ProductCategorySlug } from '@/lib/categories';

export type { ProductCategorySlug };

export type StoreProduct = {
  sku: string;
  name: string;
  regularPrice: number;
  salePrice: number;
  image: string;
  description: string;
  categoryPath: string[];
  brand: string;
  inStock: boolean;
  stock: number;
  reviewScore?: number;
  reviewCount: number;
  raw: Record<string, unknown>;
};

export type Paged<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};
