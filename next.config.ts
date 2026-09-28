import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Cloudflare Pages / Workers compatible Next.js configuration.
 *
 * - `output: 'export'` produces a fully static bundle in ./out which can be
 *   uploaded to Cloudflare Pages as a static asset build (no Node runtime,
 *   no Vercel-only features, no server actions, no ISR revalidation).
 * - Because everything is pre-rendered, `next/image` runs unoptimized and the
 *   artwork is served directly as small SVG assets.
 */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Cloudflare serves everything from a CDN; keep the HTML cache-friendly.
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
