import Link from 'next/link';

type Crumb = { href?: string; label: string };

export function PageHeader({
  title,
  description,
  crumbs = [],
}: {
  title: string;
  description: string;
  crumbs?: Crumb[];
}) {
  return (
    <div className="mb-8">
      {crumbs.length > 0 && (
        <ol className="mb-2 flex flex-wrap items-center gap-1 text-sm text-slate-500">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-slate-400">/</span>}
              {c.href ? (
                <Link className="hover:text-slate-800" href={c.href}>
                  {c.label}
                </Link>
              ) : (
                <span className="text-slate-700">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      )}
      <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
    </div>
  );
}
