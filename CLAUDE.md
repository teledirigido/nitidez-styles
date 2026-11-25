# nitidez-styles

Design system for Nitidez: a Nuxt 4 layer (Vue components, composables, `app.config.ts` tokens) plus the SCSS the apps load. Consumers install it from a Git tag:

- `nuxt` (the invoicing app, a separate repo): `"@nitidez/styles": "github:teledirigido/nitidez-styles#vX.Y.Z"` and `extends: ['@nitidez/styles']`.
- `site` (marketing site, separate repo): not consuming it yet.

Not every piece is used by every app. Each app picks its set through an SCSS entry file (`scss/admin.scss`, `scss/auth.scss`; the site will get its own).

## Working rules (from the owner)

- **Never edit or create files unless the current message explicitly asks for it** ("add X", "fix this", "change Y"). A question ("how do I", "can I", "is this OK", "why") is not permission. Answer in words, and do not end with an offer such as "want me to apply it?". End explanations flatly.
- "Why?" is a request for more reasoning, not a sign the previous answer was wrong.
- When asked for feedback, give feedback only, no follow-up questions attached.
- Never use em dashes in any written text, code comments included. Rewrite the sentence.
- Replies: lead with the answer, keep it short, evidence after. A fix names the file, the exact change and the resulting code; multi-file fixes are numbered in the order to apply them.
- The owner likes driving edits: give targeted snippets, do not bundle unrequested extras.
- Do not make confident claims about Nuxt or Vue internals without checking the installed source first.

## Layout

```
app.config.ts          tokens: nitidez.chip, nitidez.button (colors only, as var(--c-*))
components/            AdminButton, Chip, StatusIcon, SubmitButton, Toast, Forms/Textarea
composables/           useButtonTone
nuxt.config.ts         empty defineNuxtConfig({}): makes the repo a layer
scss/
  admin.scss auth.scss entry files (one per layout)
  tokens/              CSS variables on :root, loaded first through site/index.scss
    colors.scss        palette and color utility classes
    typography.scss    font families, weights, sizes (sizes shrink below desktop)
    _scales.scss       the spacing and radius steps (Sass only, no CSS output)
    spacing.scss       --space-0-25 ... --space-10
    radii.scss         --radius-0-2 ... --radius-1-6, --radius-pill
    shadows.scss       --shadow-s / m / l
  templates/           what each entry loads
  components/ global/ theme/
```

There is no `app/` folder, so the layer's `srcDir` is the repo root: `components/`, `composables/` and `app.config.ts` live at the root.

## Conventions

### Palette (`scss/tokens/colors.scss`)

- Every color is a CSS variable on `:root`, grouped as Primary, Secondary, Neutral, transparencies, selection, code, Semantic.
- Neutral: `--c-page` (body background), `--c-white`, then `--c-gray-1` (lightest, #f5f5f5) to `--c-gray-7` (darkest, #333). Borders are usually `gray-3` or `gray-4`, field borders `gray-5`, muted text `gray-6`, body text `gray-7`.
- Secondary family: `--c-secondary` (beige background), `-2` (hover, active, soft lines), `-3` (brown text), `-4` (dark, active desktop nav item), `--c-on-secondary`.
- Transparencies: `--c-black-10 / 20 / 30` and `--c-white-30 / 70` for lines and hovers that must work on any background. A black alpha over a color equals mixing that color with black, so use these instead of `color-mix(..., black)`. `--c-overlay` is `--c-black-30`.
- Semantic naming: `--c-x` is the text or icon color, `--c-x-bg` the background behind it (`--c-success` / `--c-success-bg`).
- When one semantic color needs two shades, add numbered ones and point the semantic name at one of them: `--c-green-1` (solid backgrounds, `--c-success`), `--c-green-2` (text on `--c-success-bg`). Same for `--c-red-1` / `--c-red-2`.
- Utility classes use the semantic names: `.c-danger`, `.bg-danger`, `.c-success`, `.bg-success`.
- No literal colors (hex, rgb, named colors, `color.adjust`, `color-mix`) outside `scss/tokens/`. A new shade first goes into the palette, mapped to the nearest existing color when one is close.
- No component-specific colors in the palette (no `--c-nav-hover`). A component with its own look gets a tone in `app.config.ts` that points at palette colors.

### Typography, spacing, radii (`scss/tokens/`)

- Font sizes: `--font-size-xs / s / sm / m / l / xl` plus `--font-size-body`. Responsive sizes are handled by redefining the variables inside a media query on `:root`, not per class.
- Weights: `--font-weight-light / regular / bold` (300 / 400 / 600). Families: `--font-body`, `--font-mono`.
- Spacing scale: 0.25rem steps up to 2rem, then 1rem steps up to 10rem. Radius scale: 0.2rem steps up to 1.6rem, plus `--radius-pill`. Both are defined once in `tokens/_scales.scss`; the variables and the utility classes are generated from it.
- Naming: variables replace the decimal point with a dash (`--space-1-25`, `--radius-0-4`, since a dot is not valid in a variable name); utility classes keep the dot (`pt-1.25`, `gap-0.5`, `br-0.4`), escaped as `.pt-1\.25` in the generated CSS. Never write `pt-05` or `pt-15`.
- Utilities per step: `p`, `px`, `py`, `my` (generated first) and `pt`, `pb`, `mt`, `mb` (generated after, so a side wins over a shorthand on the same element), `gap`, `gap-column`, `gap-row` (up to 5rem), `br`, plus `--nondesktop` / `--mobile` variants up to 5rem.
- Buttons, form fields, chips and the toast share `--radius-0-4`; cards use `--radius-1`; tables `--radius-1-6`.
- A value that is not on a scale is rounded to the nearest step (ties go up) rather than adding a step. Extend `_scales.scss` only when a new step is used in several places.
- Shadows: `--shadow-s` (dropdowns, button submenu), `--shadow-m` (cards: `.has-bg`, forms, tables), `--shadow-l` (floating panels such as the toast).
- Use these variables in new SCSS instead of literal values. `$bodyFontSize` in `theme/variables.scss` stays a Sass variable on purpose: `functions.scss` uses it for px to rem math at compile time.

### Tones (`app.config.ts`)

- `nitidez.chip` and `nitidez.button` hold tones: `{ bg, fg, border? }` for chips, `{ bg, fg, hoverBg?, hoverFg?, submenuBg?, submenuFg? }` for buttons. Optional values fall back to `bg` / `fg`.
- Nuxt merges this file with each app's `app.config.ts`, so an app can add tones or override colors.
- Components type the prop from the merged config: `type ChipTone = keyof ReturnType<typeof useAppConfig>['nitidez']['chip']`. Do not `import type { AppConfig } from 'nuxt/schema'`: a layer outside `node_modules` cannot resolve it.
- Components pass the tone as inline CSS variables (`--chip-bg`, `--button-bg`, ...). The stylesheet reads them with fallbacks. A more specific rule that sets the property itself still wins; an ancestor cannot override the variables.
- `Chip` carries its own CSS in the SFC. Button CSS stays global in `scss/components/button.scss` because apps also style native `<button>` elements with `useButtonTone`. Keep its color rules at two classes of specificity (`.admin-button-wrapper .admin-button-tone`) so rules like `.form-inline-actions button { background: none }` keep losing.

### What belongs in the package

- Components take props and slots only: no `$t` / i18n keys, no API calls, no stores.
- No business vocabulary. Tones are generic (`success`, `warning`, `danger`, `info`, `outline`, ...). Mapping a status to a tone (`PAID` to `success`) lives in the consuming app as `Record<ENUM, Tone>`, so a new enum value fails the typecheck there.
- SCSS imports between package files use relative paths. The `@scss` alias exists only in consumers (pointing at `node_modules/@nitidez/styles/scss`).

## Local development with the nuxt app

Both repos side by side (`invoices/nuxt`, `invoices/nitidez-styles`):

```sh
# in nuxt/, after every change here
rm -rf node_modules/@nitidez/styles && npm install --install-links ../nitidez-styles
npx nuxi typecheck
```

- `--install-links` copies instead of symlinking. With a symlink, TypeScript resolves `vue` from this repo and every component prop becomes `any`.
- The `rm -rf` is needed because npm skips the copy when the version is unchanged.
- No HMR: Nuxt's Vite watcher ignores `node_modules`. After reinstalling, restart `npm run dev` in the consumer, not just the browser: Nuxt builds the merged `app.config` at startup, so a reload keeps the old tones while the CSS already has the new palette (for example a chip pointing at a renamed `--c-gray-*`). If the stale value survives a restart, `rm -rf .nuxt` and start again.
- In this repo, `npm run prepare:types` generates `.nuxt/` so the editor knows Nuxt auto-imports.
- Quick SCSS check without the app: `npx sass --no-source-map scss/admin.scss > /dev/null` (same for `auth.scss`).

## Releasing

1. Bump `version` in `package.json`. The tag must match it.
2. Commit, then `git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin main vX.Y.Z`.
3. In the consumer: `npm install github:teledirigido/nitidez-styles#vX.Y.Z`, then typecheck. Never merge a consumer with `file:../nitidez-styles` in its `package.json`.

Semver: renamed or removed classes, variables or files, and stricter props are breaking (major).