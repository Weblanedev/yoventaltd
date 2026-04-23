'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { formatUsd } from '@/lib/pricing';

function src(u: string) {
  return u || '/globe.svg';
}

export default function CartPage() {
  const { items, setQty, remove } = useCart();
  const subtotal = items.reduce(
    (a, b) => a + b.product.salePrice * b.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Your cart"
        description="Review your line items. Sign in to complete checkout and track your order path."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Cart' },
        ]}
      />
      {items.length === 0 ? (
        <p className="text-slate-600">
          Your cart is empty.{' '}
          <Link className="text-emerald-700 underline" href="/products">
            Browse the shop
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((line) => (
            <div
              key={line.cartKey}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={src(line.product.image)}
                  alt=""
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${line.product.sku}`}
                  className="font-medium text-slate-900 hover:underline"
                >
                  {line.product.name}
                </Link>
                <p className="text-sm text-slate-500">
                  {formatUsd(line.product.salePrice)} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  className="w-20 rounded border border-slate-300 px-2 py-1"
                  value={line.quantity}
                  onChange={(e) =>
                    setQty(line.cartKey, Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button
                  type="button"
                  onClick={() => remove(line.cartKey)}
                  className="text-sm text-amber-800 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="text-right text-lg font-semibold text-slate-900">
            Subtotal: {formatUsd(subtotal)}
          </p>
          <div className="flex justify-end">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Go to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
