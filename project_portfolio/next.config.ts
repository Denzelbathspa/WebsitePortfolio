import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/WebsitePortfolio',
  assetPrefix: '/WebsitePortfolio/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Add this to generate deterministic class names
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
