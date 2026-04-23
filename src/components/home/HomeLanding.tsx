import Image from 'next/image';
import Link from 'next/link';
import { fetchTopFromCategory } from '@/lib/dummyjson';
import { PRODUCT_CATEGORIES } from '@/lib/categories';
import { company } from '@/lib/contact';
import { formatUsd } from '@/lib/pricing';
import { siteName, siteTagline } from '@/lib/site';
import type { StoreProduct } from '@/lib/store-types';

function productImg(p: StoreProduct) {
  return p.image || '/globe.svg';
}

function HeroMosaic({ items }: { items: StoreProduct[] }) {
  const [a, b, c, d] = items;
  if (items.length < 2) {
    return null;
  }
  return (
    <div className="flex min-h-[min(28rem,70vw)] max-h-[34rem] flex-col gap-3" aria-hidden>
      <div className="flex min-h-0 flex-1 gap-3">
        {a && (
          <div className="relative min-h-[12rem] flex-[1.4] overflow-hidden rounded-2xl bg-slate-200 shadow-md ring-1 ring-slate-200/60">
            <Image
              src={productImg(a)}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 28rem, 100vw"
              unoptimized
              priority
            />
          </div>
        )}
        <div className="flex w-[32%] max-w-[11rem] flex-col gap-3 min-[400px]:max-w-none min-[400px]:flex-1">
          {b && (
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-slate-200 shadow-md ring-1 ring-slate-200/60">
              <Image
                src={productImg(b)}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          {c && (
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-slate-200 shadow-md ring-1 ring-slate-200/60">
              <Image
                src={productImg(c)}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
      {d && (
        <div className="relative h-24 shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-md ring-1 ring-slate-200/60 sm:h-28">
          <Image
            src={productImg(d)}
            alt=""
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

export default async function HomeLanding() {
  const [laptops, accessories] = await Promise.all([
    fetchTopFromCategory('laptops', 10, { revalidate: 3600 }),
    fetchTopFromCategory('mobile-accessories', 10, { revalidate: 3600 }),
  ]);

  const heroPick = (() => {
    const out: StoreProduct[] = [];
    for (const p of [...laptops.slice(0, 3), ...accessories.slice(0, 2)]) {
      if (p?.image) out.push(p);
    }
    if (out.length < 3) {
      for (const p of [...laptops, ...accessories]) {
        if (p?.image && !out.includes(p) && out.length < 5) out.push(p);
      }
    }
    return out.slice(0, 5);
  })();

  const categoryPreview = {
    laptops: laptops[0],
    accessories: accessories[0],
  } as const;

  const popular = [...laptops.slice(0, 4), ...accessories.slice(0, 2)].filter(
    Boolean,
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative border-b border-slate-200/80 bg-gradient-to-br from-white via-slate-50/90 to-emerald-50/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:min-h-[min(40rem,85vh)] lg:flex-row lg:items-center lg:gap-16 lg:py-28">
          <div className="max-w-xl shrink-0 lg:py-4">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
              {siteTagline}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-sora),system-ui,sans-serif] text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {siteName}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Shop genuine laptops, chargers, cases, and accessories. US-dollar
              pricing, clear stock status, and support from our team in Lagos.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600" aria-hidden>
                  ✓
                </span>
                Curated for work, study, and business
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600" aria-hidden>
                  ✓
                </span>
                Fast answers via live chat when you are signed in
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Shop the catalog
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 text-sm font-medium text-slate-800 shadow-sm hover:border-slate-400"
              >
                Request a quote
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-500">
              {company.addressLines.join(' · ')}
            </p>
          </div>
          <div className="w-full min-w-0 flex-1 lg:max-w-[min(32rem,100%)]">
            <HeroMosaic items={heroPick} />
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="bg-slate-100/80 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-sora),system-ui,sans-serif] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Shop by category
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Choose laptops or accessories — every listing includes photos,
              specs, and up-to-date pricing.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PRODUCT_CATEGORIES.map((c) => {
              const preview =
                c.slug === 'laptops'
                  ? categoryPreview.laptops
                  : categoryPreview.accessories;
              const href = `/products?category=${c.slug}`;
              return (
                <Link
                  key={c.slug}
                  href={href}
                  className="group relative min-h-[18rem] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/60 transition hover:ring-emerald-400/50"
                >
                  {preview?.image && (
                    <Image
                      src={productImg(preview)}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-slate-900/10" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <h3 className="text-2xl font-bold drop-shadow">
                      {c.label}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-white/90 drop-shadow">
                      {c.description}
                    </p>
                    <span className="mt-5 inline-flex w-fit items-center text-sm font-semibold text-emerald-300 group-hover:text-white">
                      View range →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-sora),system-ui,sans-serif] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why buy from {siteName}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We focus on what you need: reliable hardware, honest listings, and
              human support.
            </p>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {[
              {
                title: 'Real product imagery',
                body: 'Listings use actual photos and details from our catalog so you know what you are ordering.',
              },
              {
                title: 'Laptops & accessories in one place',
                body: 'From notebooks to chargers and protection — build your setup without hopping between sites.',
              },
              {
                title: 'Local support',
                body: `Questions? Reach us at ${company.email} or use live chat when you are logged in.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular / featured */}
      <section className="border-y border-slate-200/80 bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-[family-name:var(--font-sora),system-ui,sans-serif] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Popular picks
              </h2>
              <p className="mt-3 max-w-xl text-lg text-slate-600">
                A snapshot of what customers are viewing right now. Open any
                item for full specifications.
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all products →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.slice(0, 6).map((p) => (
              <Link
                key={p.sku}
                href={`/products/${p.sku}`}
                className="group flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition hover:border-emerald-300/80 hover:shadow-md"
              >
                <div className="relative h-32 w-32 shrink-0 bg-white">
                  <Image
                    src={productImg(p)}
                    alt=""
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                  <p className="line-clamp-2 text-sm font-medium text-slate-900 group-hover:text-emerald-800">
                    {p.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    {formatUsd(p.salePrice)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {p.inStock ? 'In stock' : 'Out of stock'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-[family-name:var(--font-sora),system-ui,sans-serif] text-2xl font-bold text-white sm:text-3xl">
            Ready to order or need a quote?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Tell us your budget and use case — we will help you pick the right
            laptop and accessories.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
            >
              Contact the team
            </Link>
            <Link
              href="/register"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-500 bg-transparent px-6 text-sm font-medium text-white hover:border-slate-400"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
