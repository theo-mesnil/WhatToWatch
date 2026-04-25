# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Start dev client (requires a development build, not Expo Go)
yarn ios              # Run on iOS simulator
yarn android          # Run on Android
yarn lint             # ESLint + TypeScript type-check (zero warnings allowed)
yarn test             # Run tests in watch mode (no coverage)
yarn test:ci          # Run tests once (CI mode)
yarn generate:api:types  # Regenerate API types from openapi/ specs — never edit src/api/types.d.ts manually
yarn generate:icons   # Regenerate Icon components from SVGs in src/components/Icon/icons/
yarn translate        # Extract i18n strings and generate translation files
```

## Environment

Requires `EXPO_PUBLIC_API_KEY` set to a TMDb v3/v4 API Bearer token. See `.env.example`.

## Architecture

### Routing — Expo Router (`src/app/`)

File-based routing. The four main tabs live in `(tabs)/`: home (`index.tsx`), streaming, search, me. Content detail pages (`movie/[id]`, `tv/[id]`, `person/[id]`) are stack screens. Modals are declared in `src/app/_layout.tsx` with `presentation: 'modal'`.

**Always navigate using typed helpers from `src/routes/index.ts`** (`moviePath()`, `tvPath()`, etc.) rather than raw string paths.

### API Layer (`src/api/`)

A custom `fetch`-based client in `api.ts` exposes `api` (TMDb v3) and `apiV4` (TMDb v4). All API modules export `useGet*` hooks built on **TanStack Query**. Types are auto-generated from `openapi/` specs — run `yarn generate:api:types` after updating the spec files.

The API key is sent as a Bearer token via `Authorization` header. The device locale is appended to every request via `defaultParams`.

### Styling — Uniwind (Tailwind v4)

**Uniwind is the primary styling system.** Use `className` on all React Native and Reanimated components — they support it natively. Do **not** call `withUniwind()` on `react-native` or `react-native-reanimated` components.

Use `withUniwind()` only for third-party components (e.g. `expo-image`, `expo-blur`, `expo-linear-gradient`). If a component is used across multiple files, create the wrapped version once in a shared module.

CSS variables are defined in `src/global.css` under `@layer theme` for both `light` and `dark` variants. Key tokens:

| CSS variable | Tailwind class | Meaning |
|---|---|---|
| `--color-background` | `bg-background` | Page background |
| `--color-foreground` | `bg-foreground` | Card/element surface |
| `--color-text-base` | `text-text-base` | Body text |
| `--color-text-maximal` | `text-text-maximal` | High-contrast text |
| `--skeleton-gradient-start/end` | via `useCSSVariable` | Loader shimmer colors |

The codebase is being migrated from `StyleSheet` + `theme.colors.*` to Uniwind `className`. New code should use `className`; the legacy `~/theme` JS object still exists but is being phased out.

### Theming

`ThemeProvider` (`src/contexts/theme.tsx`) persists the user's choice (`light`/`dark`/`system`) in SecureStore and calls `Uniwind.setTheme()`. Safe-area insets are pushed to Uniwind in the root layout via `SafeAreaListener`.

### Auth (`src/contexts/Auth.tsx`)

TMDb OAuth v4 flow: opens a `WebBrowser` session, exchanges a request token for an access token + session ID, and stores the result in SecureStore. Exposes `useAuth()` hook.

### Components

- `src/components/` — shared components, some still using the legacy `StyleSheet` approach
- `src/components/new/` — newer components fully on Uniwind `className`

The `Text` component (`src/components/new/text.tsx`) wraps variants (`h0`–`h3`, `lg`, `md`) as className bundles. The `Loader` component uses `react-native-reanimated` for its pulse animation.

### Screens

Screen-specific component subtrees live in `src/screens/tabs/` (e.g. the trending carousel in `screens/tabs/index/`). These are imported by the route files in `src/app/`.

### Layouts (`src/layouts/`)

Reusable page shells: `ContentLayout` (for movie/TV detail pages with a cover image, header, scroll), `basic`, `tabs`, `modal`, `genre`. Import the appropriate layout in route files.

### i18n

`react-intl` with English (`en-US`) and French (`fr-FR`). Message IDs are auto-generated from content hash — always use `<FormattedMessage defaultMessage="..." id="..." />` and run `yarn translate` to extract. The `formatjs/enforce-id` ESLint rule enforces correct ID format.

### ESLint conventions

- Imports are sorted by `eslint-plugin-perfectionist` (natural order, grouped: builtins → externals → internals → relatives)
- Always use `import type` for type-only imports (`@typescript-eslint/consistent-type-imports`)
- `no-console` is an error — avoid `console.log/error` in production code
