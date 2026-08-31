import type { ReactNode } from 'react'
import { ChevronLeft, HelpCircle } from 'lucide-react'
import { back } from '../lib/router'

export function TopBar({ title, showBack = true }: { title: ReactNode; showBack?: boolean }) {
  return (
    <div className="topbar">
      {showBack ? (
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={30} />
        </button>
      ) : (
        <span className="iconbtn ghost" />
      )}
      <h1>{title}</h1>
      <button className="iconbtn" aria-label="Help">
        <HelpCircle size={26} />
      </button>
    </div>
  )
}

export function Notice({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="notice">
      <span className="ic">{icon}</span>
      <div>
        <b>{title}</b>
        <p>{body}</p>
      </div>
    </div>
  )
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}) {
  return (
    <button className={`btn ${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
