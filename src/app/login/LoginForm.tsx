'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { api, ApiError } from '@/lib/api-client';
import type { PublicUser } from '@/types/user';

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type F = yup.InferType<typeof schema>;

export function LoginForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const sp = useSearchParams();
  const [busy, setBusy] = useState(false);
  const next = sp.get('next') || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<F>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    setBusy(true);
    try {
      const r = await api<{ user: PublicUser }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setUser(r.user);
      toast.success('Welcome back');
      router.replace(next.startsWith('/') ? next : '/dashboard');
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error('Login failed');
      }
    } finally {
      setBusy(false);
    }
  });

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <PageHeader
        title="Log in"
        description="Access your account, checkout, and the product assistant."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Log in' },
        ]}
      />
      <form onSubmit={onSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-sm text-slate-700">
          Email
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </label>
        <label className="block text-sm text-slate-700">
          Password
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            type="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          aria-label={busy ? 'Signing in' : 'Log in'}
          className="inline-flex w-full min-h-10 items-center justify-center rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? (
            <LoadingSpinner size="sm" decorative className="!text-white" />
          ) : (
            'Log in'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        New here?{' '}
        <Link className="text-emerald-700 underline" href="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
}
