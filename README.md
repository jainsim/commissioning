# Northbeam — Station commissioning

A working prototype of the field technician commissioning flow, built in code from
Figma. Runs in a phone browser, deployed as static files.

Live at https://seema-jain.com/commissioning/

## Screens

home → scan → BLE connection → device details → location photo → progress →
results (success + failure) → owner notification error dialog

## Stack

| Choice | Reason |
|---|---|
| Vite | Builds to plain HTML/CSS/JS. No Node runtime at hosting time, which shared hosting requires. |
| React + TypeScript | Seven screens with async states. Types double as documentation. |
| Hash routing (`src/lib/router.ts`) | The server only ever sees `/commissioning/`, a real folder. Nothing 404s, no `.htaccess` needed. |
| Hand-written service worker (`public/sw.js`) | ~50 lines, fully explainable. Workbox would be a black box. The app loads with no signal. |
| Inline SVG illustrations | Repaint with the brand colour instead of being flat PNGs to re-export. |
| `lucide-react`, `@fontsource/inter` | Bundled locally, no CDN, no external requests at runtime. |

## Fake API

`src/lib/api.ts`. Every call resolves after a delay so the UI deals with real waiting
states. One station in three fails, which drives the failure path. Owner notification
always fails, which makes the error dialog reachable. Swapping this file for real
`fetch()` calls is the only change a backend would need.

## Design changes from the Figma

- Palette rebranded: electric blue `#2B5BFF` on near-black, not ChargePoint grey/orange
- Type and touch targets scaled up: 18px base, 60px minimum targets, for gloved hands and glare
- Primary actions pinned to the bottom third for one-handed reach
- Status uses a word as well as a colour, so it survives glare and colour blindness

## Not built

Faults, backend selection, station owner known/unknown, skills verification.

## Deploying

```
npm install
npm run build
```

Upload the **contents** of `dist/` into a folder named `commissioning` in `public_html`.

**Bump `CACHE_VERSION` in `public/sw.js` on every deploy.** Otherwise returning
visitors keep getting the old cached app, permanently.
