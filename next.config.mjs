/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // The 3D economic network was retired in Nov 2026; send old links to the globe.
  async redirects() {
    return [{ source: "/network", destination: "/#globe", permanent: true }];
  },
};
export default nextConfig;
