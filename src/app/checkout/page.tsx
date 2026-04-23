'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/PageHeader';
import { PaymentModal } from '@/components/PaymentModal';
import { RequireAuth } from '@/routes/RequireAuth';
import { useCart } from '@/context/CartContext';
import { formatUsd } from '@/lib/pricing';

function CheckoutContent() {
  const { items, clear } = useCart();
  const [payOpen, setPayOpen] = useState(false);
  const router = useRouter();

  const subtotal = useMemo(
    () => items.reduce((a, b) => a + b.product.salePrice * b.quantity, 0),
    [items],
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Checkout"
        description="Confirm your order here. We will follow up on payment and shipping details with you directly."
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/cart', label: 'Cart' },
          { label: 'Checkout' },
        ]}
      />
      {items.length === 0 ? (
        <p className="text-slate-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-1 text-sm text-slate-700">
            {items.map((i) => (
              <li key={i.cartKey} className="flex justify-between gap-2">
                <span>
                  {i.product.name} × {i.quantity}
                </span>
                <span>
                  {formatUsd(i.product.salePrice * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-right text-lg font-semibold">
            Total: {formatUsd(subtotal)}
          </p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setPayOpen(true)}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Pay
            </button>
          </div>
          <PaymentModal
            open={payOpen}
            onClose={() => setPayOpen(false)}
            total={subtotal}
            formatted={formatUsd(subtotal)}
            onPaid={() => {
              setPayOpen(false);
              clear();
              toast.success('Order request sent. We will contact you shortly');
              router.push('/dashboard');
            }}
          />
        </>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}
