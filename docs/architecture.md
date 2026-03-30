# Architecture

This document describes how the app is currently structured and how to extend it without fighting the existing setup.

## Stack

- Vue 3 with `<script setup>` and TypeScript
- Vite for dev/build
- Vue Router for page routing
- Pinia is installed and registered, but there are no stores yet
- Vue Query handles async server-state fetching
- PrimeVue provides UI components
- Tailwind CSS 4 provides utility classes and a small set of shared app primitives
- VueUse handles dark-mode persistence and browser preference integration

## Entry Point

The application boots in `src/main.ts`.

Responsibilities:

- imports the global font, PrimeIcons, and app CSS
- creates the Vue app
- registers Pinia
- registers Vue Query
- registers the router
- registers PrimeVue with the app preset and dark-mode selector

If you add new app-wide plugins, `src/main.ts` is the place to wire them in.

## App Shell

`src/App.vue` is the shell component.

Current responsibilities:

- renders the top-level navigation with `Menubar`
- defines the navigation entries for Home, Videos, and About
- owns the theme toggle UI
- renders the current route via `RouterView`

Keep `App.vue` focused on global shell concerns. Do not move page-specific logic into it.

## Routing

Routes live in `src/router/index.ts`.

Current routes:

- `/` -> `HomeView` (eager)
- `/videos` -> `VideosView` (lazy)
- `/about` -> `AboutView` (lazy)

### Adding a new page

1. Create a view under `src/views/`.
2. Add a route entry in `src/router/index.ts`.
3. If it should appear in navigation, add it to `menuItems` in `src/App.vue`.

Prefer lazy loading for non-home routes unless there is a strong reason not to.

## Data Flow

This app currently uses two different data buckets:

- local UI state and app behavior
- async remote data

### Local UI state

Theme state is centralized in `src/composables/useTheme.ts`.

It wraps VueUse `useDark()` and standardizes:

- the storage key
- the DOM selector and class used for dark mode
- the toggle API used by components

Theme constants live in `src/theme/constants.ts`.

If you need another global UI preference with similar behavior, follow this composable-first pattern instead of duplicating storage and DOM logic in components.

### Remote/server state

The YouTube trending feature is split between `src/views/VideosView.vue` and `src/composables/trendingVideosQuery.ts`.

Current pattern:

- `useQuery` from Vue Query owns the request lifecycle
- `ofetch` performs the HTTP request
- query settings such as `staleTime`, `enabled`, and `retry` live next to the query
- derived UI messages stay in the view
- a missing `VITE_YOUTUBE_API_KEY` disables the query instead of issuing a broken request

For new server-backed screens:

- prefer Vue Query over ad hoc `onMounted + ref + fetch`
- keep view-specific queries close to the view until reuse becomes obvious
- extract into `src/composables/` only when multiple places need the same query behavior

## State Management

Pinia is available but not yet used.

Use Pinia only for genuinely shared client-side state, for example:

- authentication/session state
- user settings not already covered by a dedicated composable
- cross-page UI state

Do not use Pinia for fetched server data that Vue Query should own.

If stores are introduced, place them under `src/stores/`.

## Styling and Theme

The styling system has three layers. They serve different purposes.

### 1. PrimeVue component theme

`src/theme/preset.ts` defines the PrimeVue preset used by the app.

Right now it wraps Lara with no custom token overrides:

- it gives the app a stable theme entrypoint
- it allows future component-token customization without rewriting `main.ts`

Use `preset.ts` when you want to globally change how PrimeVue components look, such as:

- button radii
- card shadows
- form field tokens
- focus-ring tokens
- semantic color palettes

### 2. App-wide styling primitives

`src/assets/main.css` is the home for shared app-level primitives.

Current examples:

- `.app-page`
- `.page-title`
- `.page-copy`
- `.nav-link`
- `.surface-card`
- `.timeline-marker-chip`

Put styles in `main.css` when they are:

- reused across multiple screens
- generic enough to describe a pattern, not a specific page
- not better expressed as PrimeVue theme tokens

Do not put one-off page styling here just to reduce template length.

### 3. View-local styling

Keep page-specific styling in the `.vue` file that owns it.

Examples:

- a layout tweak only used in `VideosView`
- a title treatment only used in one card grid
- a one-off section arrangement for a single page

If a pattern starts repeating across pages, promote it into `main.css` or extract a component.

### Tailwind and PrimeVue relationship

PrimeVue owns component styling.
Tailwind is used for:

- layout
- spacing
- app-specific composition
- small local adjustments

`tailwindcss-primeui` exposes PrimeVue token-based color utilities such as `text-primary` and `bg-surface-0`, so Tailwind classes can still follow the active component theme.

## Dark Mode

Dark mode is class-based and uses `.dark` on `<html>`.

The pieces are:

- `src/composables/useTheme.ts`: source of truth for runtime theme state
- `src/theme/constants.ts`: shared constants
- `index.html`: pre-paint script to avoid flash and respect stored or system preference
- `src/main.ts`: PrimeVue watches `.dark`
- `src/assets/main.css`: Tailwind `dark:` variant is configured with `@custom-variant`
- `vite.config.ts`: injects theme constants into the HTML bootstrap script

If you change dark-mode storage or selector behavior, update the composable/constants path rather than patching components directly.

## Components

General component guidance:

- use PrimeVue components first when they fit the job
- keep small reusable render helpers in `src/components/`
- prefer typed props and plain data over `v-html`

`src/components/TextWithLinks.vue` is the current example of a small focused reusable component.

Create a new component when:

- a UI chunk repeats across pages
- a view is becoming too large
- a repeated style pattern needs behavior, not just CSS

If something is only a page-local fragment, keep it in the view until reuse becomes real.

## Logging

`src/utils/logger.ts` exports a tagged `consola` logger.

Use it for application logs instead of ad hoc `console.log` calls when the message is meaningful for debugging or error reporting.

Create child tags with `logger.withTag(...)` for feature-level logging, as shown in the YouTube query composable.

## Directory Guide

- `src/main.ts`: app bootstrap
- `src/App.vue`: shell and top-level navigation
- `src/router/`: route definitions
- `src/views/`: route-level pages
- `src/components/`: reusable UI pieces
- `src/composables/`: reusable logic hooks
- `src/stores/`: shared client-side state, if introduced
- `src/theme/`: theme preset and theme-related constants
- `src/assets/`: global CSS and static app assets
- `src/utils/`: helpers that are not Vue-specific
- `docs/architecture.md`: extension guide for future work

If you need a new folder, prefer names that reflect runtime responsibility rather than implementation trivia.

## Extending the App

When adding a feature, use this decision path:

1. Is it a new page?
   Add a view, then add a route.
2. Is it shared client UI state?
   Consider a composable first, Pinia second.
3. Is it fetched async data?
   Use Vue Query.
4. Is it a reusable UI chunk?
   Create a component.
5. Is it a reusable app-level style pattern?
   Add a shared primitive in `main.css`.
6. Is it a global PrimeVue look-and-feel change?
   Update `src/theme/preset.ts`.

## Current Status

These parts are intentionally minimal right now:

- `src/theme/preset.ts` exists but currently mirrors Lara defaults
- Pinia is installed and registered but unused
- `AboutView` is still placeholder content
- the Videos page is the only example of remote data fetching
- the README now points here for extension guidance

That is acceptable. Extend these pieces only when the app actually needs them.
