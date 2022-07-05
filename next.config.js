/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/instances",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
