import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/p', destination: '/products', permanent: true },
      { source: '/shop', destination: '/products', permanent: true },
      { source: '/partner', destination: '/affiliate', permanent: true },
    ];
  },
};

export default nextConfig;
