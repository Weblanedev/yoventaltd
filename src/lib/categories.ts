export type ProductCategorySlug = 'laptops' | 'laptop-accessories';

export const PRODUCT_CATEGORIES = [
  {
    slug: 'laptops' as const,
    label: 'Laptops',
    description: 'Notebooks and laptops for work, study, and everyday use.',
    dummyjsonCategorySlug: 'laptops',
  },
  {
    slug: 'laptop-accessories' as const,
    label: 'Laptop accessories',
    description: 'Cases, chargers, hubs, and add-ons for your laptop.',
    dummyjsonCategorySlug: 'mobile-accessories',
  },
] as const;

const bySlug: Record<string, (typeof PRODUCT_CATEGORIES)[number]> = {};
for (const c of PRODUCT_CATEGORIES) {
  bySlug[c.slug] = c;
}

export function getCategoryBySlug(slug: string) {
  return bySlug[slug as ProductCategorySlug];
}

export function isProductCategorySlug(s: string): s is ProductCategorySlug {
  return s in bySlug;
}

export function allowedDummyjsonCategorySet(): Set<string> {
  return new Set(
    PRODUCT_CATEGORIES.map((c) => c.dummyjsonCategorySlug as string),
  );
}
