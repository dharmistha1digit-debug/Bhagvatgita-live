import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.203', 'localhost:3000'],

  // ✅ Allow images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vedicscriptures.github.io',
      },
      {
        protocol: 'https',
        hostname: 'v1.pinimg.com',
      },
    ],
  },

  // ✅ Performance: compress output
  compress: true,

  // ✅ Experimental: faster builds
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;