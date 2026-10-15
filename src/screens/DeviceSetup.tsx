import { useState } from 'react'
import type { ReactNode } from 'react'
import { Cable, Gauge, RadioTower, MapPin, Wand2, Check } from 'lucide-react'
import { TopBar, Button } from '../components/Chrome'
import { SiteMapArt } from '../components/Illustration'
import { saveStep } from '../lib/api'
import { go } from '../lib/router'

export type StepKey = 'wiring' | 'dlm' | 'network' | 'location' | 'wizard'

interface Def {
  key: StepKey
  icon: ReactNode
  name: string
  optional?: boolean
  todo: string
  done: string
}

const STEPS: Def[] = [
  { key: 'wiring',   icon: <Cable size={22} />,      name: 'Wiring details',          todo: 'Not entered',    done: 'Single phase · 48 A · L1' },
  { key: 'dlm',      icon: <Gauge size={22} />,      name: 'Dynamic load management', todo: 'Not configured', done: 'Enabled · 32 A ceiling', optional: true },
  { key: 'network',  icon: <RadioTower size={22} />, name: 'Network details',         todo: 'Not entered',    done: 'Cellular · signal excellent' },
  { key: 'location', icon: <MapPin size={22} />,     name: 'Location details',        todo: 'No photo yet',   done: 'Photo captured' },
  { key: 'wizard',   icon: <Wand2 size={22} />,      name: 'Complete onscreen wizard',todo: 'PIN not confirmed', done: 'PIN confirmed', optional: true },
]

const REQUIRED: StepKey[] = ['wiring', 'network', 'location']

export function DeviceSetup({
  done,
  complete,
}: {
  done: Record<StepKey, boolean>
  complete: (k: StepKey) => void
}) {
  // Which step is mid-save. Only one at a time, which is also true of the
  // real thing: the station is configured over a single Bluetooth link.
  const [saving, setSaving] = useState<StepKey | null>(null)

  async function run(k: StepKey) {
    if (k === 'location') return go('/photo')
    setSaving(k)
    await saveStep()
    complete(k)
    setSaving(null)
  }

  const doneCount = REQUIRED.filter((k) => done[k]).length
  const allDone = STEPS.filter((s) => done[s.key]).length
  const ready = doneCount === REQUIRED.length
  const remaining = REQUIRED.filter((k) => !done[k])
    .map((k) => STEPS.findIndex((s) => s.key === k) + 1)

  // "1, 3 and 4" rather than "1 and 3 and 4".
  const list =
    remaining.length <= 1
      ? String(remaining[0] ?? '')
      : remaining.slice(0, -1).join(', ') + ' and ' + remaining[remaining.length - 1]

  return (
    <>
      <TopBar title="Express Plus · MAC …321" />

      {/* Static header: title, lede and the step progress stay pinned while the
          step list below scrolls. */}
      <div className="setup-head">
        <h3 className="title">Device details</h3>
        <p className="lede">Complete the following steps</p>

        <div className="progresshead">
          <span>Steps</span>
          <span>{allDone}/{STEPS.length}</span>
        </div>
        <div className="stepper">
          {STEPS.map((s) => (
            <span key={s.key} className={`seg ${done[s.key] ? 'on' : ''}`} />
          ))}
        </div>
      </div>

      <div className="body">
        {STEPS.map((s, i) => {
          const isDone = done[s.key]
          return (
            <div className={`step ${isDone ? 'done' : ''}`} key={s.key}>
              <span className="badge">{isDone ? <Check size={24} /> : s.icon}</span>
              <div className="grow">
                <div className="kicker">Step {i + 1}{s.optional ? ' (optional)' : ''}</div>
                <div className="name">{s.name}</div>
                <div className="val">{isDone ? s.done : s.todo}</div>

                {s.key === 'location' && isDone && (
                  <div style={{ borderRadius: 10, overflow: 'hidden', margin: '10px 0 2px', maxWidth: 300 }}>
                    <SiteMapArt />
                  </div>
                )}

                {saving === s.key ? (
                  <span className="saving"><span className="spinner sm" /> Writing to station…</span>
                ) : (
                  <button className="linkbtn" onClick={() => run(s.key)} disabled={!!saving}>
                    {isDone ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="footer">
        {!ready && (
          <p className="hint">
            Complete step{remaining.length > 1 ? 's' : ''} {list} to continue
          </p>
        )}
        <Button onClick={() => go('/progress')} disabled={!ready}>Complete device setup</Button>
      </div>
    </>
  )
}
