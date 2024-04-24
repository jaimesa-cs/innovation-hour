/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.contentstack.io',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
