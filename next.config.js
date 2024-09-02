const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  trailingSlash: true,
  experimental: { esmExternals: true },
  output: "export",
};

export default nextConfig;
