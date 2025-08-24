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

  // Configuration webpack pour résoudre les problèmes de cache
  webpack: (config, { dev }) => {
    if (dev && config.cache) {
      // En développement, utilise le cache en mémoire plutôt que sur disque
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
