/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n.config");
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    nextConfig,
    i18n,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};
