// Plain .mjs, not next.config.ts — deliberately.
//
// Next loads a TypeScript config through the TypeScript compiler API, which makes
// config LOADING depend on which TypeScript is installed. On the native compiler
// (@typescript/native-preview) the API surface differs and the build dies before
// compiling anything. As ESM there is nothing to resolve: Next reads this file
// natively and the type comes from the JSDoc annotation.
//
// Typechecking is a separate concern and runs on tsgo (`pnpm typecheck`).

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The whole site is prerendered from markdown on disk; there is no runtime.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default config;
