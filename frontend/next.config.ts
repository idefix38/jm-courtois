import type { NextConfig } from 'next';

// Autorise aussi l'hôte Strapi de l'environnement courant (prod incluse), en plus des hôtes de dev fixes ci-dessous
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ? new URL(process.env.NEXT_PUBLIC_STRAPI_URL) : null;

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'cms',
                port: '1337',
                pathname: '/uploads/**',
            },
            ...(strapiUrl
                ? [{
                    protocol: strapiUrl.protocol.replace(':', '') as 'http' | 'https',
                    hostname: strapiUrl.hostname,
                    port: strapiUrl.port,
                    pathname: '/uploads/**' as const,
                }]
                : []),
        ],
    },
};

export default nextConfig;
