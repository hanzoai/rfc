import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  transpilePackages: ['@hanzo/docs', '@hanzo/radix', '@hanzo/ui'],
  turbopack: {
    root: resolve(__dirname),
    resolveAlias: {
      '@hanzo/docs': resolve(__dirname, '../docs/packages/core'),
      '@hanzo/radix': resolve(__dirname, '../docs/packages/radix-ui'),
      '@hanzo/ui': resolve(__dirname, '../docs/packages/ui'),
    },
  },
};

export default config;
