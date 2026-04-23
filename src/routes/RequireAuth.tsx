'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const next = path ? `?next=${encodeURIComponent(path)}` : '';
      router.replace(`/login${next}`);
    }
  }, [user, loading, path, router]);

  if (loading) {
    return <PageLoader className="min-h-[50vh]" />;
  }
  if (!user) {
    return (
      <div
        className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-12"
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Redirecting to sign in</span>
        <LoadingSpinner size="md" decorative />
      </div>
    );
  }
  return <>{children}</>;
}
