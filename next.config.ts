import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },

  webpack: (config, { dev }) => {
    /**
     * Workaround for webpack cache issues in Next.js 15.5.0.
     * - In development: Uses in-memory cache for faster rebuilds.
     * - In production: Disables cache entirely to avoid filesystem/snapshot errors.
     * Note: Filesystem cache should work in theory, but may fail silently due to permissions,
     * plugin conflicts, or Next.js 15.5.0 bugs. Disabling cache ensures a stable production build.
     */
    if (dev) {
      config.cache = { type: "memory" };
    } else {
      config.cache = false;
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
