'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { StoreProduct } from '@/lib/store-types';

export function AddToCartButton({ product }: { product: StoreProduct }) {
  const { add } = useCart();
  const [n, setN] = useState(1);
  const [adding, setAdding] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="text-sm text-slate-600">
        Qty
        <input
          type="number"
          min={1}
          className="ml-1 w-16 rounded border border-slate-300 px-2 py-1"
          value={n}
          onChange={(e) => setN(Math.max(1, Number(e.target.value) || 1))}
        />
      </label>
      <button
        type="button"
        disabled={!product.inStock || adding}
        aria-busy={adding}
        onClick={() => {
          setAdding(true);
          add(product, n);
          toast.success('Added to cart');
          window.setTimeout(() => setAdding(false), 500);
        }}
        aria-label={adding ? 'Adding' : 'Add to cart'}
        className="inline-flex min-h-9 min-w-[7.5rem] items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
      >
        {adding ? (
          <LoadingSpinner size="sm" decorative className="!text-white" />
        ) : (
          'Add to cart'
        )}
      </button>
    </div>
  );
}
