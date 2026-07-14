import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — the site has no server-side behavior.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
