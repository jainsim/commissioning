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

const STEPS = [
  'Tap Install. The scanner finds a code after a moment.',
  'Wait for the Bluetooth link, then continue to setup.',
  'Add each required step. The button unlocks when all three are done.',
  'Complete device setup. One of the three stations fails on purpose.',
  'Remove the failed one, then complete setup.',
  'Add owner details, or skip to see the other ending.',
]

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="stage">
      <aside className="brief">
        <div className="brief-brand">
          <span className="mark"><Zap size={20} fill="currentColor" /></span>
          Northbeam
        </div>

        <h1>Field commissioning</h1>
        <p className="brief-lede">
          A working prototype of the flow an electrician follows to commission an EV charging
          station on site. Built in code, not clickable screens.
        </p>

        <h2>Try it</h2>
        <ol>
          {STEPS.map((s) => <li key={s}>{s}</li>)}
        </ol>

        <h2>Built with</h2>
        <p>
          React, TypeScript and Vite. Hand-written service worker so it loads without a
          connection. No backend: a mock API with artificial latency drives the waiting and
          failure states.
        </p>

        <p className="brief-foot">
          Prototype by Seema Jain. Northbeam is a fictional brand and all station data is invented.
        </p>
      </aside>

      <div className="device">
        <div className="device-frame">{children}</div>
      </div>
    </div>
  )
}
