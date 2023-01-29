/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // poweredByHeader: process.env.NODE_ENV === 'development',
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
};

module.exports = nextConfig;
