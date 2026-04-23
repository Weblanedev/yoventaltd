'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { api, ApiError } from '@/lib/api-client';
import type { PublicUser } from '@/types/user';

const schema = yup.object({
  name: yup.string().min(1, 'Name is required').required(),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

type F = yup.InferType<typeof schema>;

export function RegisterForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<F>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    setBusy(true);
    try {
      const r = await api<{ user: PublicUser }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setUser(r.user);
      toast.success('Account created');
      router.replace('/dashboard');
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error('Registration failed');
      }
    } finally {
      setBusy(false);
    }
  });

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <PageHeader
        title="Create account"
        description="Create a Yoventa account to save a profile, checkout, and use the in-store assistant."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Register' },
        ]}
      />
      <form onSubmit={onSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-sm text-slate-700">
          Name
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </label>
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
            autoComplete="new-password"
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
          aria-label={busy ? 'Creating account' : 'Register'}
          className="inline-flex w-full min-h-10 items-center justify-center rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? (
            <LoadingSpinner size="sm" decorative className="!text-white" />
          ) : (
            'Register'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link className="text-emerald-700 underline" href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}
