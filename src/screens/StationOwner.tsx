import { useRef, useState } from 'react'
import { AlertCircle, Mail } from 'lucide-react'
import { TopBar, Button, Notice } from '../components/Chrome'
import { notifyOwner, type Owner } from '../lib/api'
import { go } from '../lib/router'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function StationOwner({ onFinish }: { onFinish: (owner: Owner | null, emailed: boolean) => void }) {
  const [f, setF] = useState({ firstName: '', lastName: '', email: '', orgId: 'ORG1234' })
  const [touched, setTouched] = useState(false)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  // A ref, not state: it must be current the moment send() reads it, and it
  // never needs to trigger a re-render.
  const attempt = useRef(0)

  const bad = {
    firstName: !f.firstName.trim(),
    lastName: !f.lastName.trim(),
    email: !EMAIL.test(f.email.trim()),
  }
  const invalid = bad.firstName || bad.lastName || bad.email

  async function send() {
    setTouched(true)
    if (invalid) return
    if (busy) return
    setBusy(true)
    try {
      await notifyOwner(f, attempt.current++)
      onFinish(f, true)
      go('/complete')
    } catch {
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  const field = (
    key: 'firstName' | 'lastName' | 'email',
    label: string,
    placeholder: string,
    error: string,
    type = 'text'
  ) => (
    <div className="field">
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        type={type}
        value={f[key]}
        placeholder={placeholder}
        autoComplete="off"
        aria-invalid={touched && bad[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
      />
      {touched && bad[key] && <span className="err">{error}</span>}
    </div>
  )

  return (
    <>
      <TopBar title="Station owner" />
      <div className="body">
        <h3 className="title">Who owns these stations?</h3>
        <p className="lede">
          We will email them a link to activate the stations. Without an owner the stations stay
          commissioned but offline.
        </p>

        <div className="field">
          <label htmlFor="org">Organisation ID</label>
          <input id="org" value={f.orgId} onChange={(e) => setF({ ...f, orgId: e.target.value })} />
        </div>

        {field('firstName', 'First name', 'John', 'Enter the owner’s first name')}
        {field('lastName', 'Last name', 'Doe', 'Enter the owner’s last name')}
        {field('email', 'Email address', 'name@company.com', 'Enter a valid email address', 'email')}

        <Notice
          icon={<Mail size={24} />}
          title="What the owner gets"
          body="A single email listing every station from this job, with one link to activate them all."
        />
      </div>

      <div className="footer">
        <Button onClick={send} disabled={busy}>
          {busy ? 'Sending…' : 'Send activation email'}
        </Button>
        <Button variant="secondary" onClick={() => { onFinish(null, false); go('/complete') }}>
          I don’t have owner details
        </Button>
      </div>

      {failed && (
        <div className="scrim">
          <div className="modal" role="alertdialog" aria-label="Owner notification error">
            <div className="inner">
              <div className="ic"><AlertCircle size={38} /></div>
              <b>We couldn’t send that email</b>
              <p>
                The activation email didn’t go through. Check your connection and try again, or skip
                for now and send it later from the job record.
              </p>
            </div>
            <div className="acts">
              <button className="go" onClick={() => { setFailed(false); send() }}>Try again</button>
              <button className="skip" onClick={() => { setFailed(false); onFinish(f, false); go('/complete') }}>
                Skip this step
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
