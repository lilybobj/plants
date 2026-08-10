import type { NextConfig } from "next";

// Set by the GitHub Pages workflow at build time; empty locally.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  // Without this, nested routes export as e.g. ministry.html instead of
  // ministry/index.html, which GitHub Pages can't resolve for /ministry/.
  trailingSlash: true,
  images: {
    // GitHub Pages serves static files only — no image optimization API
    // route. A custom loader (rather than just `unoptimized: true`) is what
    // makes basePath actually get applied to image URLs.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
