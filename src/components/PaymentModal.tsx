'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type Props = {
  open: boolean;
  onClose: () => void;
  onPaid: () => void;
  total: number;
  formatted: string;
};

export function PaymentModal({ open, onClose, onPaid, total, formatted }: Props) {
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      onPaid();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
      role="dialog"
      aria-modal
    >
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-2xl">
        <h2 className="text-lg font-semibold text-slate-900">Confirm your order</h2>
        <p className="mt-1 text-sm text-slate-600">
          This step records your order request with us. We will contact you to
          confirm payment and delivery. Order total:{' '}
          <span className="font-medium">{formatted}</span> ({total.toFixed(2)} USD
          before shipping)
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            aria-busy={submitting}
            aria-label={submitting ? 'Submitting' : 'Submit order request'}
            className="inline-flex min-h-9 min-w-[10rem] items-center justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
          >
            {submitting ? (
              <LoadingSpinner size="sm" decorative className="!text-white" />
            ) : (
              'Submit order request'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
