import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
         protocol: 'https',
         hostname: 'via.placeholder.com', 
         pathname: '**'
      }
    ],
  },
};

export default nextConfig;
