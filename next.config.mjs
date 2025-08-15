/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
};

export default nextConfig;
