'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { RequireAuth } from '@/routes/RequireAuth';
import { useAuth } from '@/context/AuthContext';
import { api, ApiError } from '@/lib/api-client';
import type { PublicUser, UserProfile } from '@/types/user';
import Link from 'next/link';

const schema = yup.object({
  name: yup.string().min(1, 'Name is required'),
  phone: yup.string().optional(),
  addressLine1: yup.string().optional(),
  addressLine2: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zip: yup.string().optional(),
  country: yup.string().optional(),
});

function DashboardForm() {
  const { user, setUser, refresh } = useAuth();
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      phone: user.profile?.phone,
      addressLine1: user.profile?.addressLine1,
      addressLine2: user.profile?.addressLine2,
      city: user.profile?.city,
      state: user.profile?.state,
      zip: user.profile?.zip,
      country: user.profile?.country,
    });
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;
    setSaving(true);
    const profile: UserProfile = {
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
    };
    try {
      const r = await api<{ user: PublicUser }>('/api/user/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: data.name, profile }),
      });
      setUser(r.user);
      await refresh();
      toast.success('Profile saved');
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error('Could not save');
      }
    } finally {
      setSaving(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="mt-2 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">
        Signed in as {user?.email}
      </p>
      <label className="block text-sm">
        Name
        <input
          className="mt-1 w-full max-w-md rounded border border-slate-300 px-2 py-1.5"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-xs text-red-600">{errors.name.message}</span>
        )}
      </label>
      <label className="block text-sm">
        Phone
        <input
          className="mt-1 w-full max-w-md rounded border border-slate-300 px-2 py-1.5"
          {...register('phone')}
        />
      </label>
      <label className="block text-sm">
        Address line 1
        <input
          className="mt-1 w-full max-w-md rounded border border-slate-300 px-2 py-1.5"
          {...register('addressLine1')}
        />
      </label>
      <label className="block text-sm">
        Address line 2
        <input
          className="mt-1 w-full max-w-md rounded border border-slate-300 px-2 py-1.5"
          {...register('addressLine2')}
        />
      </label>
      <div className="grid gap-2 sm:grid-cols-2 sm:max-w-md">
        <label className="block text-sm">
          City
          <input
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5"
            {...register('city')}
          />
        </label>
        <label className="block text-sm">
          State
          <input
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5"
            {...register('state')}
          />
        </label>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:max-w-md">
        <label className="block text-sm">
          ZIP
          <input
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5"
            {...register('zip')}
          />
        </label>
        <label className="block text-sm">
          Country
          <input
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5"
            {...register('country')}
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          aria-busy={saving}
          aria-label={saving ? 'Saving' : 'Save profile'}
          className="inline-flex min-h-9 min-w-28 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {saving ? (
            <LoadingSpinner size="sm" decorative className="!text-white" />
          ) : (
            'Save profile'
          )}
        </button>
        <Link
          href="/affiliate"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
        >
          Affiliate program
        </Link>
      </div>
    </form>
  );
}

function DashboardContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Account"
        description="Update your display name and shipping details for faster checkout."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Account' },
        ]}
      />
      <DashboardForm />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
