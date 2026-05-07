# Nuqta Creative Studio

A creative agency website built with React, Vite, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for dev server and bundling
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **shadcn/ui** component library
- **Wouter** for routing
- **TanStack Query** for data fetching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run in development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The output will be in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions**
4. Add this file as `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

5. Push the workflow file — your site will be live at `https://<your-username>.github.io/<repo-name>/`
