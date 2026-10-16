import type { ReactNode } from 'react'
import { Zap } from 'lucide-react'

/*
  Desktop presentation only.

  On a phone the app fills the screen, which is how it is meant to be used.
  On a laptop a 360px column floating in grey reads as a broken website rather
  than a deliberate mobile prototype, so above 900px the same app is placed
  inside a device frame: a wide header on top, then an explainer column beside
  the phone. Nothing about the app itself changes: this is a wrapper.
*/

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="stage">
      <header className="brief-head">
        <div className="brief-brand">
          <span className="mark"><Zap size={20} fill="currentColor" /></span>
          Northbeam
        </div>
        <h1>A coded prototype of an app for installing a charging station.</h1>
        <p className="brief-note">
          Northbeam is a fictional brand and all station data is invented. Not shipped work.
        </p>
      </header>

      <div className="cols">
        <aside className="brief">
          <h2>Built for the field</h2>
          <p>
            Electricians work with gloves, glare and weak signal. I used big UI: large buttons and
            text, so it is easier to touch and read.
          </p>

          <h2>Why I built it</h2>
          <p>
            I wanted to know what AI prototyping can do for a flow like that: it built the screens
            fast, but waiting and failure states still needed my design judgment.
          </p>

          <h2>The flow</h2>
          <ul>
            <li><strong>Scan and pair:</strong> scan the charger barcode to pair it with the app.</li>
            <li><strong>Required steps:</strong> wiring, network and location must be added. Everything else is optional.</li>
            <li><strong>Failure and recovery:</strong> one station fails to upload. Remove it and finish setup with the rest.</li>
            <li><strong>Owner details:</strong> add the charger owner's details now, or skip.</li>
          </ul>

          <h2>Next steps</h2>
          <ul>
            <li><strong>Progress bar:</strong> shows how many steps exist, how many are done and how many are left.</li>
            <li><strong>Offline sync:</strong> stations commission without signal and sync to ChargePoint when the network returns.</li>
          </ul>

          <h2>What I learned</h2>
          <p>
            A coded prototype exposes gaps a clickable flow hides, like the failed station and the
            offline case.
          </p>
        </aside>

        <div className="device">
          <div className="device-frame">{children}</div>
        </div>
      </div>
    </div>
  )
}
