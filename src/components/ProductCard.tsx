import Image from 'next/image';
import Link from 'next/link';
import { formatUsd } from '@/lib/pricing';
import type { StoreProduct } from '@/lib/store-types';

function imgSrc(url: string) {
  if (!url) return '/globe.svg';
  return url;
}

export function ProductCard({ p }: { p: StoreProduct }) {
  return (
    <Link
      href={`/products/${encodeURIComponent(p.sku)}`}
      className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={imgSrc(p.image)}
          alt=""
          width={400}
          height={300}
          className="h-full w-full object-contain p-3"
          unoptimized
        />
      </div>
      <div className="p-3">
        <p className="line-clamp-2 min-h-10 text-sm font-medium text-slate-900">
          {p.name}
        </p>
        <p className="mt-1 text-sm text-emerald-700">{formatUsd(p.salePrice)}</p>
        <p className="mt-0.5 text-xs text-slate-500">
          {p.inStock ? 'In stock' : 'Out of stock'}
        </p>
      </div>
    </Link>
  );
}
