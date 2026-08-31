import { useEffect, useState } from 'react'

/*
  Hash routing in ~20 lines instead of React Router.

  The server only ever sees /commissioning/, which is a real folder with a
  real index.html, so no URL can 404 and no .htaccess rewrite is needed.
  Everything after the '#' stays in the browser.
*/
export function useRoute(): string {
  const read = () => window.location.hash.replace(/^#/, '') || '/'
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const go = (path: string) => { window.location.hash = path }
export const back = () => window.history.back()
