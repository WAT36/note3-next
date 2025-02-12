const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      net: false,
      tls: false,
      fs: false,
      child_process: false,
    };
    return config;
  },
  trailingSlash: true,
  experimental: { esmExternals: true },
  output: "export",
};

export default nextConfig;
