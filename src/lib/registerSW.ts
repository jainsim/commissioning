/*
  import.meta.env.BASE_URL is the '/commissioning/' set in vite.config.ts.
  Registering the worker from inside that folder is what limits its scope to
  that folder: a worker can only control URLs at or below its own location.
  It can never touch the rest of seema-jain.com.
*/
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  if (!import.meta.env.PROD) return // a cached shell in dev hides your edits
  // The single-file preview build uses a relative base and has no sw.js
  // alongside it, so skip registration there.
  if (import.meta.env.BASE_URL !== '/commissioning/') return
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch((err) => console.error('Service worker registration failed', err))
  })
}
