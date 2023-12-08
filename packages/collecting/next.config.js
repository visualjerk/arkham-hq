/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arkhamdb.com',
        port: '',
        pathname: '/bundles/**/*',
      },
    ],
  },
}

module.exports = nextConfig
