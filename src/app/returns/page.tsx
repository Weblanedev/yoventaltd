import { PageHeader } from '@/components/PageHeader';
import { company } from '@/lib/contact';
import { siteName } from '@/lib/site';

export const metadata = {
  title: 'Returns',
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Returns & support"
        description="Demo policy. Replace with your legal and operations copy before production."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Returns' },
        ]}
      />
      <div className="prose prose-slate max-w-none text-slate-700">
        <p>
          {siteName} demo orders do not process real payments. In a live deployment,
          define your return window, restocking conditions, and RMA process here.
        </p>
        <p>Questions: {company.email} · {company.phone}</p>
      </div>
    </div>
  );
}
