/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://func-serverless-dev-api.azurewebsites.net/api/:path*',
        },
      ]
    },
};
module.exports = nextConfig
