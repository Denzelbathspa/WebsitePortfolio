import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/WebsitePortfolio',  // MUST match your repo name
  assetPrefix: '/WebsitePortfolio/',  // Add this for assets
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
