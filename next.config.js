/** @type {import('next').NextConfig} */
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
  // webpack(config, {webpack}){
  //   const prod = process.env.NODE_ENV === 'production';
  //   const plugins = [
  //       ...config.plugins,
  //       // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
  //   ];
  //   return{
  //       ...config,
  //       mode: prod ? 'production' : 'development',
  //       plugins,
  //   };
  // },
};

module.exports = nextConfig;
