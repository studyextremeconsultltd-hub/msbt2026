import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.18", "192.168.1.9"],
  images: {
    qualities: [70, 75, 90, 95],
    localPatterns: [
      { pathname: "/brand/**" },
      { pathname: "/manchester/**" },
      { pathname: "/students/**" },
      { pathname: "/courses/**" },
      { pathname: "/categories/**" },
      { pathname: "/logos/**" },
    ],
  },
};

export default nextConfig;
