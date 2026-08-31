import { useEffect, useState } from 'react'
import { Flashlight, Keyboard, Check } from 'lucide-react'
import { TopBar, Button } from '../components/Chrome'
import { scanCode } from '../lib/api'
import { go } from '../lib/router'

export function Scan() {
  const [torch, setTorch] = useState(false)
  const [found, setFound] = useState(false)

  /*
    Two seconds of "looking", then a held confirmation before moving on.
    The pause is deliberate: a scanner that jumps to the next screen the
    instant it reads a code leaves the technician unsure what it captured.
  */
  useEffect(() => {
    let live = true
    scanCode().then(() => {
      if (!live) return
      setFound(true)
      setTimeout(() => { if (live) go('/connect') }, 1100)
    })
    return () => { live = false }
  }, [])

  return (
    <>
      <TopBar title="Scan" />

      <div className="scanhint">
        <p>{found ? 'Code scanned' : 'Scan the QR code on the station'}</p>
        {found ? (
          <div className="metaline">Express Plus · MAC 2000 0098 7654 321</div>
        ) : (
          <button className="linkbtn">Find the code</button>
        )}
      </div>

      <div className="viewfinder">
        {!found && <div className="sweep" />}
        <div className="reticle" style={found ? { background: 'rgba(15,122,67,.25)' } : undefined}>
          <span /><span /><span /><span />
          {found && (
            <span
              style={{
                inset: 0, width: 'auto', height: 'auto', border: 0,
                display: 'grid', placeItems: 'center', color: '#fff',
              }}
            >
              <Check size={64} strokeWidth={3} />
            </span>
          )}
        </div>
        {!found && (
          <button
            className={`torch ${torch ? 'on' : ''}`}
            aria-label="Toggle torch"
            onClick={() => setTorch(!torch)}
          >
            <Flashlight size={26} />
          </button>
        )}
      </div>

      <div className="footer">
        <Button variant="secondary" onClick={() => go('/connect')} disabled={found}>
          <Keyboard size={22} /> Enter manually
        </Button>
      </div>
    </>
  )
}
