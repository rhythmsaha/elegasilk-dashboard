/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // domains: ['picsum.photos'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
            },

            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },

            {
                protocol: 'https',
                hostname: 'www.karagiri.com',
            },
            {
                protocol: 'https',
                hostname: '*',
            },
        ],
    },
};

module.exports = nextConfig;
