/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
