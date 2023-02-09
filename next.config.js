/** @type {import('next').NextConfig} */
const CompressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://acoapi.hyns.co.kr/api/:path*`,
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: config => {
    config.plugins.push(new CompressionPlugin());
    return config;
  },
};

module.exports = nextConfig;
