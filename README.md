# PrimeVue 4 + Tailwind Template

Vue 3 + Vite + TypeScript starter with PrimeVue 4, Tailwind CSS 4, Vue Router, Vue Query, and a small dark-mode/theme setup already wired in.

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Start The App

Install dependencies:

```sh
npm install
```

Start the Vite dev server:

```sh
npm run dev
```

Build a production bundle:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Optional Environment Setup

The `/videos` page calls the YouTube Data API. To enable it, create a `.env.local` file in the project root:

```sh
VITE_YOUTUBE_API_KEY=your-api-key
```

If the key is missing, the page stays disabled and shows an inline setup message instead of failing silently.

## Quality Checks

Run unit tests:

```sh
npm run test:unit -- --run
```

Run type-checking:

```sh
npm run type-check
```

Run linting:

```sh
npm run lint
```

Format source files under `src/`:

```sh
npm run format
```

## What Is In The App

- `src/main.ts` boots the app and registers Pinia, Vue Query, Vue Router, and PrimeVue.
- `src/App.vue` is the app shell with the top navigation and dark-mode toggle.
- `src/router/index.ts` defines the current routes: `/`, `/videos`, and `/about`.
- `src/composables/trendingVideosQuery.ts` shows the current async data-fetching pattern with Vue Query and `ofetch`.
- `src/composables/useTheme.ts` centralizes dark-mode state and persistence.

## Extending The App

Use [`docs/architecture.md`](docs/architecture.md) as the source of truth for extending the app. It explains:

- where to add new pages, components, composables, and stores
- when to use Vue Query vs. Pinia
- how PrimeVue theming, Tailwind utilities, and dark mode fit together
- which files own bootstrap, routing, shared styling, and reusable UI patterns
