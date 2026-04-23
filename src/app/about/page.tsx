import { PageHeader } from '@/components/PageHeader';
import { siteName, siteTagline } from '@/lib/site';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <PageHeader
        title="About us"
        description="A focused retailer for laptops and laptop accessories, built around clear pricing and support you can reach."
        crumbs={[
          { href: '/', label: 'Home' },
          { label: 'About' },
        ]}
      />
      <div className="prose prose-slate max-w-none text-slate-700">
        <p>
          {siteName} is built around a simple promise: {siteTagline.toLowerCase()},
          with accurate photos and details on every product page, prices in US
          dollars, and stock you can see before you add to cart.
        </p>
        <p>
          Whether you are equipping a home office, a student, or a business, we
          are here to help you choose. For larger or B2B orders, use the contact
          page. Creators and partners can apply to the affiliate program (account
          required) to earn when people buy through their tracking link.
        </p>
      </div>
    </div>
  );
}
