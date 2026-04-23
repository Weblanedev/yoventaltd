import { Suspense } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { ProductsPageClient } from './ProductsPageClient';

export const metadata = {
  title: 'Shop',
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={(
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <PageLoader className="min-h-[30vh]" />
        </div>
      )}
    >
      <ProductsPageClient />
    </Suspense>
  );
}
