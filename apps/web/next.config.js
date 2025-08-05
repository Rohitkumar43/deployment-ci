/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in development to avoid file path issues
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false;
    }
    return config;
  }
};

export default nextConfig;
