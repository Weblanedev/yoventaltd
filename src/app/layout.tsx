import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Sora } from 'next/font/google';
import { AppProviders } from '@/components/providers/AppProviders';
import { ShellLayout } from '@/components/ShellLayout';
import { company } from '@/lib/contact';
import { siteName, siteTagline } from '@/lib/site';
import './globals.css';

const dm = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
});
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});
const jet = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: { default: `${siteName} · ${siteTagline}`, template: `%s | ${siteName}` },
  description: `${siteName} · ${company.businessLine}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm.variable} ${sora.variable} ${jet.variable} font-sans antialiased bg-slate-100 text-slate-800`}
        style={{ fontFamily: 'var(--font-dm), system-ui, sans-serif' }}
      >
        <AppProviders>
          <ShellLayout>{children}</ShellLayout>
        </AppProviders>
      </body>
    </html>
  );
}
