import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { TopBar, Button } from '../components/Chrome'
import type { StationResult } from '../lib/api'
import { go } from '../lib/router'

export function Results({
  results,
  onRemove,
}: {
  results: StationResult[]
  onRemove: (mac: string) => void
}) {
  const ok = results.filter((r) => r.ok).length

  return (
    <>
      <TopBar title="Device setup progress" showBack={false} />

      <div className="body">
        <div className="progresshead">
          <span>Stations commissioned</span>
          <span>{ok} of {results.length}</span>
        </div>

        {results.map((r) => (
          <div key={r.mac} className={`result ${r.ok ? 'pass' : 'fail'}`}>
            <span className="ic">{r.ok ? <CheckCircle2 size={28} /> : <AlertTriangle size={28} />}</span>
            <div className="grow">
              <b>{r.ok ? 'Station setup successful' : 'Station setup failed'}</b>
              <dl>
                <div><dt>MAC</dt><dd>{r.mac}</dd></div>
                <div><dt>Serial</dt><dd>{r.serial}</dd></div>
                <div><dt>Model</dt><dd>{r.model}</dd></div>
              </dl>
              {!r.ok && (
                <>
                  <p style={{ margin: '8px 0 0', fontSize: 15 }}>{r.error}</p>
                  <div className="acts">
                    <button className="linkbtn">Retry</button>
                    <button className="linkbtn" onClick={() => onRemove(r.mac)}>Remove</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <p className="lede" style={{ marginTop: 32 }}>
            No stations left in this job. Scan a station to start again.
          </p>
        )}

        {results.length > 0 && (
          <p style={{ color: 'var(--ink-2)', fontSize: 16, marginTop: 22 }}>
            Set up another station with the same organisation and site details?
          </p>
        )}
      </div>

      <div className="footer">
        <Button variant="secondary" onClick={() => go('/scan')}>Add another station</Button>
        <Button onClick={() => go('/owner')} disabled={ok === 0}>Complete setup</Button>
      </div>
    </>
  )
}
