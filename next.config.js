/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["cloud.appwrite.io", "iili.io"],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
