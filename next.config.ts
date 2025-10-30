import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // env: {
  //   customKey: "http://134.209.131.20/backend/api/v1",
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http", // or 'https' if applicable
        hostname: "134.209.131.20",
        port: "", // Leave empty unless a specific port is required
        pathname: "/**", // Allows any path on this hostname
      },
    ],
  },
};

export default nextConfig;
