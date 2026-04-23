import Link from 'next/link';
import { company } from '@/lib/contact';
import { siteName } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">{siteName}</p>
            <p className="mt-1 text-sm text-slate-600">{company.businessLine}.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Contact</p>
            <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
              {company.addressLines.join('\n')}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {company.phone}
              <br />
              <a
                className="text-emerald-700 underline"
                href={`mailto:${company.email}`}
              >
                {company.email}
              </a>
            </p>
            <a
              className="mt-1 inline-block text-sm text-emerald-700 underline"
              href={company.website}
              target="_blank"
              rel="noreferrer"
            >
              {company.website.replace('https://', '')}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Policies</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/returns">Returns</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
