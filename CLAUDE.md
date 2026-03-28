# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check + production build (parallel)
npm run test:unit    # Run Vitest unit tests
npm run lint         # Run oxlint + eslint (auto-fix)
npm run format       # Prettier format src/
npm run type-check   # vue-tsc type checking
```

## Architecture

Vue 3 + Vite + TypeScript project using PrimeVue (Aura theme) for UI components and Tailwind CSS 4 for utility styling.

**Styling stack (cascade order matters):**
`@layer theme, base, primevue, components, utilities` in `src/assets/main.css`. Dark mode uses class-based toggling (`.dark` on `<html>`) with three cooperating systems:
- PrimeVue: `darkModeSelector: ".dark"` in `src/main.ts` — swaps design tokens
- Tailwind: `@custom-variant dark (&:where(.dark, .dark *))` in `main.css` — enables `dark:` utilities
- VueUse: `useDark()` in `App.vue` — manages state + localStorage persistence (`vueuse-color-scheme` key)
- Flash prevention: inline `<script>` in `index.html` reads localStorage before paint

**`tailwindcss-primeui`** bridges PrimeVue tokens to Tailwind colors (e.g. `bg-surface-0`, `text-primary`). It does NOT configure the `dark:` variant — that requires the `@custom-variant` above.

**Routing:** `src/router/index.ts` — `/` (HomeView, eager) and `/about` (AboutView, lazy).

**State:** Pinia is registered but no stores yet. Use `src/stores/` when needed.

## Conventions

- Prefer PrimeVue components over custom HTML/CSS. Use Tailwind utilities for spacing and layout.
- Use `TextWithLinks` component (`src/components/TextWithLinks.vue`) instead of `v-html` for rendering text with inline hyperlinks.
- ESLint uses flat config (`eslint.config.ts`) with `vue/flat/recommended`, oxlint, and Prettier integration.
- Linting runs oxlint first (fast Rust linter), then eslint. Always run both via `npm run lint`.
