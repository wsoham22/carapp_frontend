/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Enable middleware support
      middleware: true,
    },
    images: {
      // Specify allowed domains for the next/image component
      domains: ['asset.cloudinary.com', 'example.com'],
    },
  };
  
  export default nextConfig;
  