import type { NextConfig } from "next";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    }
}

module.exports = nextConfig

export default nextConfig;
