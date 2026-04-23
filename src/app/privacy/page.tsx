import { PageHeader } from '@/components/PageHeader';
import { siteName } from '@/lib/site';
import { company } from '@/lib/contact';

export const metadata = {
  title: 'Privacy',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Privacy"
        description="How we treat information in this demo environment."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'Privacy' },
        ]}
      />
      <div className="prose prose-slate max-w-none text-slate-700">
        <p>
          {siteName} is a demo storefront. We collect account details you
          provide at registration, session cookies to keep you signed in, and
          information your browser normally sends in requests. We do not sell this
          demo data. For production use, a full privacy policy and DPA may apply.
        </p>
        <p>
          Contact: {company.email}
        </p>
      </div>
    </div>
  );
}
