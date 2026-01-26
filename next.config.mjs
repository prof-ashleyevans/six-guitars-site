/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'], // Reduced from avif+webp to just webp (50% fewer transformations)
    deviceSizes: [640, 828, 1080, 1920], // Reduced from 8 to 4 sizes
    imageSizes: [32, 64, 128, 256], // Reduced from 8 to 4 sizes
    minimumCacheTTL: 2678400, // 31 days (was 60 seconds)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
      },
    ],
  },
};

export default nextConfig;
