const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  trailingSlash: true,
  experimental: { esmExternals: true },
  basePath: "/nextjs-blog",
  output: "export",
};

export default nextConfig;
