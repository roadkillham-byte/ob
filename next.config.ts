import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Every route is generated at build time. Nothing renders on request.
  reactStrictMode: true,
};

export default nextConfig;
