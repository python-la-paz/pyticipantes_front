/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com'],
        remotePatterns: [{
            protocol: 'https',
            hostname: '**.googleusercontent.com',
        }],
    },
    i18n: {
        locales: ['es'],
        defaultLocale: 'es',
    },
    output: 'standalone',

};

export default nextConfig;
