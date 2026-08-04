// A global stylesheet is a side-effect import the bundler resolves, so it has
// no type to find. TypeScript 7 reports that as TS2882; this is the declaration
// it wants. Next types `*.module.css` itself — this site has no CSS modules.
declare module '*.css';
