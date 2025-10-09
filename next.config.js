/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'erp.dtpeduli.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Optimize for performance
  compress: true,
  poweredByHeader: false,
  // Enable React strict mode
  reactStrictMode: true,
  // Note: swcMinify and optimizeFonts are removed in Next 15 with Turbopack
  // Turbopack config
  experimental: {
    // keep existing experimental flags and set turbopack root to this app
    optimizePackageImports: ['lucide-react'],
    turbopack: {
      root: __dirname,
    },
  },
}

module.exports = nextConfig
