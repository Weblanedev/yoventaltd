'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { siteName } from '@/lib/site';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const nav = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

function cls(active: boolean) {
  return [
    'rounded-md px-2 py-1.5 text-sm font-medium',
    active ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600 hover:bg-slate-200/80',
  ].join(' ');
}

export function Navbar() {
  const path = usePathname();
  const { user, loading, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="font-semibold text-slate-900">
          {siteName}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cls(path === n.href || path.startsWith(`${n.href}/`))}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800 hover:border-slate-300"
          >
            Cart
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-0.5 text-[10px] text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          {loading ? (
            <span className="inline-flex items-center text-slate-500" aria-label="Loading">
              <LoadingSpinner size="sm" decorative />
            </span>
          ) : user ? (
            <>
              <Link
                href="/affiliate"
                className="rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-200/80"
              >
                Affiliates
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-200/80"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => void logout()}
                className="rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-200/80"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-200/80"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-emerald-600 px-2.5 py-1.5 text-sm text-white hover:bg-emerald-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
