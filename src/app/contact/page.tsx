import { PageHeader } from '@/components/PageHeader';
import { company } from '@/lib/contact';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Contact us"
        description="We respond to business and support enquiries on Weekdays, West Africa time."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Contact' },
        ]}
      />
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-medium text-slate-900">Yoventa Limited</p>
        <p className="mt-2 whitespace-pre-line text-slate-600">
          {company.addressLines.join('\n')}
        </p>
        <p className="mt-3 text-slate-600">Phone: {company.phone}</p>
        <p className="mt-1 text-slate-600">
          Email:{' '}
          <a className="text-emerald-700 underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </p>
        <a
          className="mt-2 inline-block text-emerald-700 underline"
          href={company.website}
          target="_blank"
          rel="noreferrer"
        >
          {company.website}
        </a>
      </div>
    </div>
  );
}
