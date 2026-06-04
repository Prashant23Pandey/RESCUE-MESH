// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable API routes to be compiled with TypeScript
  pageExtensions: ['tsx', 'ts', 'js', 'jsx'],
};
module.exports = nextConfig;
