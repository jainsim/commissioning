# Deploying

The site is published by GitHub Actions to GitHub Pages on every push to `main`.

Live URL: `https://<your-github-username>.github.io/commissioning/`

## One-time setup

1. Create a GitHub repo named exactly **commissioning** (the name becomes the URL path).
2. Push this project to it.
3. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Push once more, or run the Deploy workflow manually from the Actions tab.

## If you rename the repo

Change `base` in `vite.config.ts` to `'/<new-repo-name>/'`. It must match the repo
name or every asset 404s.

## After each deploy

Bump `CACHE_VERSION` in `public/sw.js`. The service worker caches the app, and
without a version bump returning visitors keep getting the old build.
