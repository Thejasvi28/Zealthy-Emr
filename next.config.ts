import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    domains: ['localhost'],
  },
  
  // Experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
