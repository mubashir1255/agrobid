/**
 * @file next.config.ts
 *
 * Next.js 16 configuration for AgroBid Pakistan.
 *
 * Key settings:
 *   - reactCompiler: true — enables the React Compiler (babel-plugin-react-compiler)
 *     for automatic memoization optimizations
 *   - images: configures remote patterns for trusted image domains
 *   - typescript: fail the build on type errors (production safety)
 *
 * Note: ESLint build configuration is handled via eslint.config.mjs.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── React Compiler ── */
  reactCompiler: true,

  /* ── Build-time type safety ── */
  typescript: {
    // Fail production builds on type errors (never silently ship broken types)
    ignoreBuildErrors: false,
  },

  /* ── Image optimization ── */
  images: {
    remotePatterns: [
      // Add trusted image CDN domains here as needed
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Format preference: AVIF then WebP for best compression
    formats: ["image/avif", "image/webp"],
  },

  /* ── Experimental features ── */
  experimental: {
    // Opt into React 19 optimistic updates
    optimisticClientCache: true,
  },
};

export default nextConfig;
