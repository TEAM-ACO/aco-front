/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://acoapi.hyns.co.kr/aco/:path*`,
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
