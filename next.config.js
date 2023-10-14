/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    config.module.rules.push({
      test: /\.proto$/,
      use: 'protobufjs-loader',
    })

    return config
  },
}

module.exports = nextConfig
