// Plain .mjs, not next.config.ts — deliberately.
//
// Next loads a TypeScript config through the TypeScript compiler API, so a .ts
// config would make config LOADING depend on which TypeScript is installed. As
// ESM there is nothing to resolve: Next reads this file natively and the type
// comes from the JSDoc annotation.
//
// That dependency is not hypothetical. Next also reads `compilerOptions.paths`
// through `ts.parseJsonConfigFileContent`, and TypeScript 7 — the native Go
// compiler — ships no JS API at all (`require('typescript')` is just
// `{version, versionMajorMinor}`). Under 7 every `@/…` import fails to resolve
// and the type-check step silently disappears, so this repo stays on 5.x until
// Next stops linking the API. See LLM.md.

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The whole site is prerendered from markdown on disk; there is no runtime.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,

  // @hanzo/gui and the component layer on top of it ship untranspiled ESM that
  // still names `react-native`. On web that name IS react-native-web, which is
  // the alias below; `transpilePackages` is what makes Next compile the source
  // rather than hand raw ESM to the server runtime.
  transpilePackages: ['@hanzo/gui', '@hanzo/ui', '@hanzogui/config', 'react-native-web'],

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      'react-native$': 'react-native-web',
    };
    return webpackConfig;
  },
};

export default config;
