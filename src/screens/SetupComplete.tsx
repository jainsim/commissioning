import { X, Share2, MailCheck, Clock, ChevronRight, Zap } from 'lucide-react'
import { Button } from '../components/Chrome'
import type { Owner, StationResult } from '../lib/api'
import { go } from '../lib/router'

export function SetupComplete({
  owner,
  emailed,
  results,
}: {
  owner: Owner | null
  emailed: boolean
  results: StationResult[]
}) {
  const stations = results.filter((r) => r.ok)

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={() => go('/')} aria-label="Close"><X size={28} /></button>
        <h1>Setup complete</h1>
        <button className="iconbtn" aria-label="Share"><Share2 size={24} /></button>
      </div>

      <div className="body">
        {/* Two honest states. If no email went out, the banner says so and says
            what happens next, rather than claiming a send that never happened. */}
        {emailed ? (
          <div className="banner good">
            <span className="ic"><MailCheck size={24} /></span>
            <div>
              <b>Activation email sent</b>
              <p>
                {owner?.firstName} {owner?.lastName} has the link at {owner?.email}. The stations go
                live once they activate them.
              </p>
            </div>
          </div>
        ) : (
          <div className="banner hold">
            <span className="ic"><Clock size={24} /></span>
            <div>
              <b>Waiting on owner details</b>
              <p>
                Your work is saved and the stations are commissioned. They stay offline until an
                owner is added and activates them. You can add the owner later from this job.
              </p>
            </div>
          </div>
        )}

        <h3 className="title" style={{ textAlign: 'left', marginBottom: 18 }}>Configuration details</h3>

        <h2 className="section">Organisation</h2>
        <dl style={{ margin: '0 0 24px' }}>
          <div className="drow"><dt>Organisation ID</dt><dd>{owner?.orgId ?? 'ORG1234'}</dd></div>
        </dl>

        <h2 className="section">Station owner</h2>
        <dl style={{ margin: '0 0 24px' }}>
          {owner ? (
            <>
              <div className="drow"><dt>First name</dt><dd>{owner.firstName}</dd></div>
              <div className="drow"><dt>Last name</dt><dd>{owner.lastName}</dd></div>
              <div className="drow"><dt>Email address</dt><dd>{owner.email}</dd></div>
            </>
          ) : (
            <div className="drow"><dt>Owner</dt><dd className="muted">Not added yet</dd></div>
          )}
        </dl>

        <h2 className="section"><Zap size={14} style={{ verticalAlign: -2 }} /> Stations · {stations.length}</h2>
        {stations.map((s) => (
          <button className="srow" key={s.mac} onClick={() => go(`/station/${s.serial}`)}>
            <span className="grow">
              <span className="mac">{s.mac}</span>
              <dl>
                <div><dt>Serial number</dt><dd>{s.serial}</dd></div>
                <div><dt>Model</dt><dd>{s.model}</dd></div>
                <div><dt>No. of ports</dt><dd>{s.ports}</dd></div>
              </dl>
            </span>
            <ChevronRight className="chev" size={24} />
          </button>
        ))}
      </div>

      <div className="footer">
        <Button onClick={() => go('/')}>Done</Button>
      </div>
    </>
  )
}
