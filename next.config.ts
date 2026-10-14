import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Use `npm run lint` for linting checks to prevent worker serialization issues in Next 15 with ESLint 9
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
