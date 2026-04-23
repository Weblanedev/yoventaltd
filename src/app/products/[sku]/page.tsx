import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { PageHeader } from '@/components/PageHeader';
import { fetchSingleProduct } from '@/lib/dummyjson';
import { formatUsd } from '@/lib/pricing';
import { siteName } from '@/lib/site';
import { PRODUCT_CATEGORIES } from '@/lib/categories';
import type { Metadata } from 'next';

type Ctx = { params: Promise<{ sku: string }> };

function imgUrl(u: string) {
  return u || '/globe.svg';
}

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { sku } = await params;
  const p = await fetchSingleProduct(sku);
  if (!p) return { title: 'Product' };
  return { title: p.name, description: p.description?.slice(0, 150) };
}

export default async function ProductDetailPage({ params }: Ctx) {
  const { sku } = await params;
  const p = await fetchSingleProduct(sku);
  if (!p) notFound();
  const unit = p.salePrice;
  const off =
    p.regularPrice > unit
      ? Math.round(
          (1 - unit / p.regularPrice) * 100,
        )
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        title={p.name}
        description={p.description}
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/products', label: 'Products' },
          { label: p.name },
        ]}
      />
      <p className="text-xs text-slate-500">
        {siteName} · {PRODUCT_CATEGORIES.map((c) => c.label).join(' · ')}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
          <Image
            src={imgUrl(p.image)}
            alt={p.name}
            width={640}
            height={480}
            className="max-h-96 w-full object-contain"
            unoptimized
          />
        </div>
        <div>
          {off > 0 && (
            <p className="text-sm text-emerald-700">
              {off}% off list; sale price
            </p>
          )}
          <p className="text-2xl font-semibold text-slate-900">
            {formatUsd(unit)}
            {p.regularPrice > unit && (
              <span className="ml-2 text-base font-normal text-slate-500 line-through">
                {formatUsd(p.regularPrice)}
              </span>
            )}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {p.brand} {p.categoryPath[1] ? `· ${p.categoryPath[1]}` : ''}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {p.inStock
              ? `In stock · ${p.stock} available`
              : 'Currently out of stock'}
          </p>
          <div className="mt-6">
            <AddToCartButton product={p} />
          </div>
        </div>
      </div>
    </div>
  );
}
