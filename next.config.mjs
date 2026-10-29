import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  experimental: {
    trustHost: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(nextConfig)