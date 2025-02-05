import type { Metadata } from 'next';
import './globals.scss';
import { Providers } from '@/redux/provider';
import { brand_data } from '@/data/brand-data';

export const metadata: Metadata = {
  title: `${brand_data.name}  - ${brand_data.slogan}`,
  description: `${brand_data.description}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
