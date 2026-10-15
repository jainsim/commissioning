/*
  The service worker. About 50 lines, hand-written on purpose.

  A service worker is a script the browser keeps running in the background,
  separate from the page. Once installed, it sits between the app and the
  network and gets to answer every request the app makes. That is what makes
  offline possible: when the network is gone, the worker answers from a local
  cache instead, and the app cannot tell the difference.

  CACHE_VERSION is the single most important line in this file. Browsers keep
  a service worker and its cache indefinitely. Ship a new build without
  changing this string and returning visitors keep getting the old app
  forever. Bump it on every deploy.
*/

const CACHE_VERSION = 'commissioning-v3'

/*
  Install: pre-cache the app shell.

  The subtle part. Vite puts a content hash in every built filename
  (index-CWIjGUZq.js), so this file cannot hardcode the asset list. And we
  cannot rely on the fetch handler below to cache them on first visit either:
  the browser downloads the JS and CSS *before* the service worker has finished
  installing and taken control, so those first requests never reach the worker
  and never get cached. The app appears to work offline on the machine you
  tested on, and fails on a phone. It is a race, so it fails intermittently,
  which is worse than failing every time.

  The fix, without adding a build plugin: the worker fetches index.html itself,
  reads the script and stylesheet URLs out of the HTML, and caches those
  explicitly. Ten lines, no build step, no generated manifest to trust.
*/
const ASSET_PATTERN = /(?:src|href)="([^"]+\.(?:js|css))"/g

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION)
      const html = await fetch('./index.html', { cache: 'reload' }).then((r) => r.text())
      const assets = [...html.matchAll(ASSET_PATTERN)].map((m) => m[1])
      await cache.addAll(['./', './index.html', ...assets])
    })()
  )
  // Don't sit in a "waiting" state behind the previous worker. For a demo we
  // want the new version live on the next load, not the load after that.
  self.skipWaiting()
})

// Activate: delete every cache that is not the current version, so old builds
// don't accumulate on the device.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only ever handle GETs we own. POSTs and other origins go straight through.
  if (request.method !== 'GET') return
  if (new URL(request.url).origin !== self.location.origin) return

  // A navigation is the user loading the app itself. Always answer with the
  // cached shell so a cold start works with no signal at all.
  if (request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then((hit) => hit || fetch(request)))
    return
  }

  // Everything else - JS, CSS, fonts - is cache-first. Vite puts a content
  // hash in each filename, so a cached file is never stale: a changed file
  // gets a new name and therefore a new cache entry.
  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy))
        }
        return response
      })
    })
  )
})
