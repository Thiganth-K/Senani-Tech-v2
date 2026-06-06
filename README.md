# SenaniTech — Website

>A small Vite + React + TypeScript starter configured with shadcn/ui components and TailwindCSS, used as the marketing site for SenaniTech.

## Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Local development](#local-development)
- [Build & preview](#build--preview)
- [Code-splitting notes](#code-splitting-notes)
- [Removing build-time tooling additions](#removing-build-time-tooling-additions)
- [Linting & tests](#linting--tests)
- [Deploying](#deploying)
- [Contributing](#contributing)

## Overview

This repository contains a Vite + React (SWC) TypeScript app with TailwindCSS and several Radix UI components. It is intended as a static site (marketing) for SenaniTech.

Key technologies:

- Vite (build tooling)
- React 18 with JSX runtime
- TypeScript
- TailwindCSS
- shadcn/ui generated components

## Prerequisites

- Node.js 18+ (recommended)
- npm (or yarn / pnpm)

## Local development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Open http://localhost:8080 (port configured in `vite.config.ts`).

## Build & preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run start
```

The `dist/` directory will contain the built site.

## Code-splitting notes

You may see Vite warnings about large chunks. This project includes a `build` section in `vite.config.ts` that:

- raises `chunkSizeWarningLimit`, and
- uses `rollupOptions.output.manualChunks` to group `node_modules` into a `vendor` chunk and component code into a `components` chunk.

If you still hit large chunk warnings or want finer splitting, consider:

- Converting large page-level components to dynamic imports (`await import('./LargePage')`) so they load only when needed.
- Adding additional `manualChunks` rules for specific heavy libraries (charts, big UI libraries).

Example dynamic import:

```tsx
const Page = React.lazy(() => import('./pages/BigPage'));
// or
const Big = () => {
  const Component = React.lazy(() => import('./components/HeavyComponent'));
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
};
```

## Removing build-time tooling additions

This project previously used `lovable-tagger` as a development plugin. That usage has been removed from `vite.config.ts` and from `devDependencies`.

If your `package-lock.json` or `node_modules` still contains `lovable-tagger`, run:

```bash
npm install
```

to update the lockfile and remove the package from node_modules.

## Linting & tests

Run linter:

```bash
npm run lint
```

Run tests:

```bash
npm run test
# or watch
npm run test:watch
```

## Deploying

This is a static site — output in `dist/` can be deployed to any static host (Netlify, Vercel, GitHub Pages, S3, etc.). Ensure the host serves `index.html` for SPA routes if you use client-side routing.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Run the dev server and add your changes
4. Open a pull request

--
If you want, I can run `npm install` to update the lockfile and then run a production build to verify chunk sizes. Would you like me to do that now?
