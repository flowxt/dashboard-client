/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Options compatibles avec Next.js 15.3.1
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    // Résolution du problème avec webpack et les modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false,
      crypto: false,
    };

    return config;
  },
};

export default nextConfig;
