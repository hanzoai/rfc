# Hanzo RFC

## Overview
RFC documentation template — the one site shell behind LPs, HIPs, ZIPs and any
similar proposal index. A fork supplies `rfc.config.ts` plus a markdown
directory; nothing else needs editing.

## Stack (Hanzo 8.x)
- **Next 15** app router, `output: 'export'` — the whole site prerenders from
  markdown on disk, so there is no runtime.
- **React 19**.
- **[@hanzo/ui](https://npmjs.com/package/@hanzo/ui) 8.0.x** — the canonical Hanzo
  component layer, on **`@hanzo/gui` 8.0.x** (Tamagui hard fork, ~184 packages
  renamed `@tamagui/*` → `@hanzogui/*`). Components (`Button`, `Command`) *and*
  design tokens (`@hanzo/ui/theme.css`) both come from here.
  - Import **per member** — `@hanzo/ui/primitives/Button`, never `@hanzo/ui`.
    The root export is a barrel over the whole library, so one `Button` off it
    pulled Dialog/Command/Select/Slider into the first load: 270 kB vs 168 kB.
    `experimental.optimizePackageImports` does **not** fix this — measured, the
    unused components still shipped, because `transpilePackages` opts the
    package out of that transform.
  - `@hanzo/gui` **silently ignores props it does not know**. `<Theme inverse>`
    type-checks and inverts nothing (gui 8 `ThemeProps` has no `inverse`). A
    green build proves nothing about a visual change; drive the export in a
    browser and read `getComputedStyle`.
- **TypeScript 5.9** — deliberately, not 7. TypeScript 7 is the native Go
  compiler and this repo's sources are clean under it (`tsc --noEmit` exits 0),
  but 7 ships **no JS compiler API**: `require('typescript')` yields only
  `{version, versionMajorMinor}`. Next reads `compilerOptions.paths` through
  `ts.parseJsonConfigFileContent`, so under 7 every `@/…` import fails to
  resolve and the type-check step silently vanishes. Move when Next stops
  linking the API. Never add `@typescript/native-preview` — that is a
  7.0.0-dev line *behind* stable 7.
- **No Tailwind, no Radix, no shadcn, no PostCSS, no cmdk, no next-themes.**
  What is not a component is one stylesheet (`app/global.css`) of semantic
  classes over CSS custom properties.

## The light/dark switch
Two token sources read two different classes, and only wiring one is silent:
`@hanzo/ui/theme.css` keys the identity off **`.dark`**, gui resolves `$color…`
off **`t_light`/`t_dark`**. `app/providers.tsx` drives both from one state —
`NextThemeProvider` writes `.dark` (via its `value` map; left at its default it
writes gui's class instead, which GuiProvider already owns), `GuiProvider` writes
`t_dark` from `defaultTheme`. One writer per class.

`defaultTheme` on `GuiProvider` is a gui theme name, never `'system'` — gui has
no theme by that name and the resulting `t_system` class matches nothing.

`--background` is the ONE token gui also declares, at bare `:root`, injected
after the stylesheet — so gui wins it on source order in both modes and the
other 30 identity tokens come from theme.css. That asymmetry is why a surface
that inverts the page (`.rfc-cta`) wraps only its CONTROLS in `<Inverted>`:
inverting the whole panel flips `--background` for the panel's own text too.

## Build & Run
```bash
pnpm install
pnpm build       # next build -> ./out
pnpm dev         # port 3002
pnpm typecheck   # tsc --noEmit
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
- **If @hanzo/ui has it, use it.** A button is `<Button>`; the palette is
  `Command`. There is no `.rfc-btn` and no hand-rolled dialog, and adding one
  back is adding a second answer to an answered question.
- `app/global.css` covers only what @hanzo/ui does not: layout (`rfc-shell`,
  `rfc-stack`, `rfc-cluster`, `rfc-grid`), type, and the proposal domain
  (`rfc-badge` carries the lifecycle hue, which no generic `Badge` variant
  encodes). Names say what a thing IS, never what it looks like.
- Colour resolves through tokens: `--status-*` for lifecycle, `--hue-*` for
  category accents. A new status is one CSS line, never a lookup object.
- `next.config.mjs` is plain ESM on purpose — a `.ts` config would make config
  loading depend on which TypeScript is installed. Its webpack block PREPENDS
  the `.web.*` extensions: react-native packages publish `Foo.js` beside
  `Foo.web.js` and import `./Foo`, so the default order picks the NATIVE file
  and the build dies in react-native Flow source it cannot parse.
