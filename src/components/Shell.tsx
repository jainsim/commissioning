import type { ReactNode } from 'react'
import { Zap } from 'lucide-react'

/*
  Desktop presentation only.

  On a phone the app fills the screen, which is how it is meant to be used.
  On a laptop a 390px column floating in grey reads as a broken website rather
  than a deliberate mobile prototype, so above 900px the same app is placed
  inside a device frame with a panel next to it explaining what it is. Nothing
  about the app itself changes: this is a wrapper, not a second layout.
*/

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="stage">
      <aside className="brief">
        <div className="brief-brand">
          <span className="mark"><Zap size={20} fill="currentColor" /></span>
          Northbeam
        </div>

        <h1>A coded prototype of an app for installing a charging station.</h1>
        <p className="brief-note">
          Northbeam is a fictional brand and all station data is invented. Not shipped work.
        </p>

        <h2>Why I built it</h2>
        <p>
          Electricians work with gloves, glare and weak signal. I wanted to know what AI
          prototyping can do for a flow like that: it built the screens fast, but waiting and
          failure states still needed my design judgment.
        </p>

        <h2>The flow</h2>
        <ul>
          <li>Scan and pair</li>
          <li>Required steps gate</li>
          <li>Failure and recovery</li>
          <li>Owner details or skip</li>
        </ul>

        <h2>Design decisions I would make for the product</h2>
        <ul>
          <li>A progress bar: it shows how many steps exist, how many are done and how many are left.</li>
          <li>Offline sync: stations commission without signal and sync to ChargePoint when it returns.</li>
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
  )
}
