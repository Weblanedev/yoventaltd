'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { PageHeader } from '@/components/PageHeader';
import { ProductGridSkeleton } from '@/components/ui/ProductGridSkeleton';
import { api } from '@/lib/api-client';
import { PRODUCT_CATEGORIES, type ProductCategorySlug } from '@/lib/categories';
import type { StoreProduct } from '@/lib/store-types';

type Paged = {
  items: StoreProduct[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export function ProductsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const page = Math.max(1, Number(sp.get('page') || 1) || 1);
  const q = sp.get('q') || '';
  const category = (sp.get('category') || '') as ProductCategorySlug | '';
  const [debounced, setDebounced] = useState(q);
  const [data, setData] = useState<Paged | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 350);
    return () => clearTimeout(t);
  }, [q]);

  const buildQuery = useCallback(
    (next: { page: number; q?: string; category?: string }) => {
      const p = new URLSearchParams();
      p.set('page', String(next.page));
      const qv = next.q !== undefined ? next.q : debounced;
      if (qv) p.set('q', qv);
      const cat = next.category !== undefined ? next.category : category;
      if (cat && PRODUCT_CATEGORIES.some((c) => c.slug === cat)) {
        p.set('category', cat);
      }
      return p.toString();
    },
    [debounced, category],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('pageSize', '12');
    if (debounced) params.set('q', debounced);
    if (category && PRODUCT_CATEGORIES.some((c) => c.slug === category)) {
      params.set('category', category);
    }
    try {
      const d = await api<Paged>('/api/bestbuy/products?' + params.toString());
      setData(d);
    } catch (e) {
      setData(null);
      setErr(e instanceof Error ? e.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [page, debounced, category]);

  useEffect(() => {
    void load();
  }, [load]);

  const pushQuery = (next: { page: number; q?: string; category?: string }) => {
    const qs = buildQuery(next);
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Shop"
        description="Computers, laptops, and accessories. Search and filter below. Prices show in US dollars."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Products' },
        ]}
      />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block max-w-md flex-1 text-sm text-slate-600">
          Search
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm"
            value={q}
            onChange={(e) => {
              pushQuery({ page: 1, q: e.target.value, category });
            }}
            placeholder="Search laptops and accessories"
          />
        </label>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => pushQuery({ page: 1, category: '' })}
          className={[
            'rounded-full border px-3 py-1 text-sm',
            !category
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : 'border-slate-300 text-slate-600 hover:border-slate-400',
          ].join(' ')}
        >
          All (listed categories)
        </button>
        {PRODUCT_CATEGORIES.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => pushQuery({ page: 1, category: c.slug })}
            className={[
              'rounded-full border px-3 py-1 text-sm',
              category === c.slug
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-slate-300 text-slate-600 hover:border-slate-400',
            ].join(' ')}
          >
            {c.label}
          </button>
        ))}
      </div>

      {err && <p className="text-amber-800">{err}</p>}
      {loading && <ProductGridSkeleton count={12} />}

      {data && !loading && (
        <>
          <p className="mb-3 text-sm text-slate-500">
            Showing page {data.page} of {data.totalPages} · {data.total} items
            total
          </p>
          {data.items.length === 0 ? (
            <p className="text-slate-500">No products match. Try a different search.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p) => (
                <ProductCard key={p.sku} p={p} />
              ))}
            </div>
          )}
          <div className="mt-8 flex justify-center gap-2">
            <Link
              href={(() => {
                const p = new URLSearchParams();
                p.set('page', String(data.page - 1));
                if (debounced) p.set('q', debounced);
                if (category) p.set('category', category);
                const qs = p.toString();
                return qs ? `?${qs}` : `${pathname}`;
              })()}
              aria-disabled={!data.hasPrevious}
              className={[
                'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700',
                !data.hasPrevious && 'pointer-events-none opacity-30',
              ].filter(Boolean).join(' ')}
            >
              Previous
            </Link>
            <Link
              href={(() => {
                const p = new URLSearchParams();
                p.set('page', String(data.page + 1));
                if (debounced) p.set('q', debounced);
                if (category) p.set('category', category);
                const qs = p.toString();
                return `?${qs}`;
              })()}
              aria-disabled={!data.hasNext}
              className={[
                'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700',
                !data.hasNext && 'pointer-events-none opacity-30',
              ].filter(Boolean).join(' ')}
            >
              Next
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
