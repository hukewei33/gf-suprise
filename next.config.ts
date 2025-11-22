import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/gf-suprise',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
