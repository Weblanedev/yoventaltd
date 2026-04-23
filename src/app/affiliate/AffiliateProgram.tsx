'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { company } from '@/lib/contact';

const steps = [
  {
    title: 'Apply',
    body: 'Tell us about your audience and how you will share Yoventa: social, blog, email, or community.',
  },
  {
    title: 'Get your link',
    body: 'After we approve you, we send a unique tracking link. Purchases made through that link are attributed to you.',
  },
  {
    title: 'Earn when they buy',
    body: 'When someone completes a qualifying order via your link, you earn a commission. We follow up on payment and order details on our side.',
  },
] as const;

export function AffiliateProgram() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [channels, setChannels] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please tell us how you plan to promote Yoventa.');
      return;
    }
    setSubmitting(true);
    // Placeholder: no backend store yet; acknowledge application.
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        'Application received. We will email you at your account address with next steps and commission details.',
      );
      setMessage('');
      setChannels('');
    }, 400);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        title="Affiliate program"
        description="Promote our laptops and accessories and earn when people buy through your personal tracking link."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Affiliates' },
        ]}
      />

      <div className="prose prose-slate mt-2 max-w-none text-slate-700">
        <p>
          Join as an affiliate: share {company.legalName} with your audience. When
          we approve you, you receive a unique link. We track sales that come
          through that link and pay you a commission on qualifying orders, per our
          program terms.
        </p>
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="font-[family-name:var(--font-sora),system-ui,sans-serif] text-xl font-semibold text-slate-900">
          How it works
        </h2>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-900">
          Commission &amp; terms
        </h2>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed">
          Commission rates, cookie duration, and payout schedule are set when you
          are approved. We only pay on completed, non-fraudulent orders
          attributed to your link. For questions before you apply, write to{' '}
          <a
            className="font-medium text-emerald-800 underline"
            href={`mailto:${company.email}?subject=Affiliate%20program`}
          >
            {company.email}
          </a>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-sora),system-ui,sans-serif] text-xl font-semibold text-slate-900">
          Apply
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Signed in as{' '}
          <span className="font-medium text-slate-800">{user?.email}</span>. We
          will use this email to send your decision and, if approved, your
          tracking link and terms.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-700">
            How will you promote us?
            <textarea
              className="mt-1.5 w-full min-h-[120px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="E.g. Instagram tech reviews, student newsletter, IT consultancy clients…"
              required
            />
          </label>
          <label className="block text-sm text-slate-700">
            Website or social (optional)
            <input
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm"
              type="text"
              value={channels}
              onChange={(e) => setChannels(e.target.value)}
              placeholder="https://… or @handle on X / Instagram / TikTok"
            />
          </label>
          <p className="text-xs text-slate-500">
            By applying you agree that your promotion will be honest and
            compliant with our brand guidelines, which we send with approval.
          </p>
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            aria-label={submitting ? 'Submitting' : 'Submit application'}
            className="inline-flex min-h-10 min-w-40 items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
          >
            {submitting ? (
              <LoadingSpinner size="sm" decorative className="!text-white" />
            ) : (
              'Submit application'
            )}
          </button>
        </form>
      </section>

      <p className="mt-10">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-emerald-700 underline"
        >
          Back to account
        </Link>
      </p>
    </div>
  );
}
