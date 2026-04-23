import {
  getCategoryBySlug,
  isProductCategorySlug,
  allowedDummyjsonCategorySet,
} from '@/lib/categories';
import { getUnitPrice } from '@/lib/pricing';
import type { Paged, StoreProduct } from '@/lib/store-types';

const BASE = 'https://dummyjson.com';

type DProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
};

function mapDummy(p: DProduct): StoreProduct {
  const unit = getUnitPrice({
    price: p.price,
    discountPercentage: p.discountPercentage,
  });
  return {
    sku: String(p.id),
    name: p.title,
    regularPrice: p.price,
    salePrice: unit,
    image: p.thumbnail || p.images?.[0] || '',
    description: p.description ?? '',
    categoryPath: [p.brand, p.category].filter(Boolean),
    brand: p.brand ?? '',
    inStock: (p.stock ?? 0) > 0,
    stock: p.stock ?? 0,
    reviewScore: p.rating,
    reviewCount: 0,
    raw: p as unknown as Record<string, unknown>,
  };
}

async function getJson<T>(
  url: string,
  next?: { revalidate?: number },
): Promise<T> {
  const r = await fetch(url, next ? { next } : undefined);
  if (!r.ok) throw new Error(`DummyJSON request failed: ${r.status}`);
  return r.json() as Promise<T>;
}

export async function fetchSingleProduct(
  sku: string,
): Promise<StoreProduct | null> {
  const id = Number(sku);
  if (Number.isNaN(id)) return null;
  try {
    const p = (await getJson(
      `${BASE}/products/${id}`,
    )) as DProduct;
    if (!p?.id) return null;
    return mapDummy(p);
  } catch {
    return null;
  }
}

type SearchResult = { products: DProduct[]; total: number; skip: number; limit: number };
type CategoryResult = { products: DProduct[]; total: number; skip: number; limit: number };

export async function fetchDummyJsonProducts(options: {
  page: number;
  pageSize: number;
  q?: string;
  category?: string;
}): Promise<Paged<StoreProduct>> {
  const { page, pageSize } = options;
  const pageSizeSafe = Math.min(100, Math.max(1, pageSize));
  const pageIndex = Math.max(1, page);
  const skip = (pageIndex - 1) * pageSizeSafe;

  const allow = allowedDummyjsonCategorySet();

  if (options.q && options.q.trim()) {
    const q = encodeURIComponent(options.q.trim());
    const data = await getJson<SearchResult>(
      `${BASE}/products/search?q=${q}&limit=${pageSizeSafe}&skip=${skip}`,
    );
    const items = (data.products || [])
      .filter((p) => allow.has(p.category))
      .map(mapDummy);
    const total = data.total;
    return paginateInfo(items, pageIndex, pageSizeSafe, total);
  }

  if (options.category && isProductCategorySlug(options.category)) {
    const cat = getCategoryBySlug(options.category);
    if (!cat) {
      return emptyPage(pageIndex, pageSizeSafe);
    }
    const data = await getJson<CategoryResult>(
      `${BASE}/products/category/${encodeURIComponent(
        cat.dummyjsonCategorySlug,
      )}?limit=${pageSizeSafe}&skip=${skip}`,
    );
    const items = (data.products || []).map(mapDummy);
    const total = data.total;
    return paginateInfo(items, pageIndex, pageSizeSafe, total);
  }

  const dummies = [...allow];
  const all: DProduct[] = [];
  for (const cat of dummies) {
    try {
      const part = await getJson<CategoryResult>(
        `${BASE}/products/category/${encodeURIComponent(cat)}?limit=100&skip=0`,
      );
      for (const p of part.products || []) {
        if (allow.has(p.category)) all.push(p);
      }
    } catch {
      // Skip a category that failed to load
    }
  }
  const seen = new Set<number>();
  const unique: DProduct[] = [];
  for (const p of all) {
    if (!seen.has(p.id)) {
      seen.add(p.id);
      unique.push(p);
    }
  }
  unique.sort((a, b) => a.id - b.id);
  const total = unique.length;
  const slice = unique.slice(skip, skip + pageSizeSafe);
  const items = slice.map(mapDummy);
  return paginateInfo(items, pageIndex, pageSizeSafe, total);
}

function emptyPage(page: number, pageSize: number): Paged<StoreProduct> {
  return {
    items: [],
    page,
    pageSize,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: page > 1,
  };
}

function paginateInfo(
  items: StoreProduct[],
  page: number,
  pageSize: number,
  total: number,
): Paged<StoreProduct> {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    items,
    page,
    pageSize,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export async function fetchTopFromCategory(
  dummyjsonCategory: string,
  take: number,
  options?: { revalidate?: number },
): Promise<StoreProduct[]> {
  const data = await getJson<CategoryResult>(
    `${BASE}/products/category/${encodeURIComponent(dummyjsonCategory)}?limit=${take}&skip=0`,
    options?.revalidate != null ? { revalidate: options.revalidate } : undefined,
  );
  return (data.products || []).map(mapDummy);
}
