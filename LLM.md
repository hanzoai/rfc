# Hanzo RFC

## Overview
RFC documentation template — the one site shell behind LPs, HIPs, ZIPs and any
similar proposal index. A fork supplies `rfc.config.ts` plus a markdown
directory; nothing else needs editing.

## Stack (Hanzo 8.x)
- **Next 15** app router, `output: 'export'` — the whole site prerenders from
  markdown on disk, so there is no runtime.
- **React 19**.
- **[@hanzo/ui](https://npmjs.com/package/@hanzo/ui) 8.x** — the canonical Hanzo
  component layer, itself built on `@hanzo/gui` (Tamagui hard fork). This site
  consumes its design tokens via `@hanzo/ui/theme.css`.
- **TypeScript 7** — the native Go compiler. `tsc` and `tsgo` are the same ELF
  binary; `pnpm typecheck` runs it. Do NOT add `@typescript/native-preview`,
  which is a 7.0.0-dev line behind stable.
- **No Tailwind, no Radix, no shadcn, no PostCSS.** Styling is one stylesheet
  (`app/global.css`) of semantic classes over CSS custom properties.

## Build & Run
```bash
pnpm install
pnpm build       # next build -> ./out
pnpm dev         # port 3002
pnpm typecheck   # tsgo --noEmit
```

## Structure
```
rfc/
  app/            routes; global.css is the ONE stylesheet
  components/     shell (chrome, docs-shell), proposal primitives, search
  lib/            source.ts (markdown index), toc.ts
  examples/       hips/lps/zips config samples
  rfc.config.ts   the single fork point: name, categories, footer, socials
  scripts/        OG image generation
```

## Conventions
- `app/global.css` names things for what they ARE (`rfc-card`, `rfc-badge`,
  `rfc-row`), never for what they look like. One definition per concept.
- Colour resolves through tokens: `--status-*` for lifecycle, `--hue-*` for
  category accents. A new status is one CSS line, never a lookup object.
- `next.config.mjs` is plain ESM on purpose — a `.ts` config would make config
  loading depend on which TypeScript is installed.
