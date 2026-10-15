import { useEffect, useState } from 'react'
import { Plus, Wrench, Info, FileText, ChevronRight, Zap, CloudOff, RefreshCw, Check } from 'lucide-react'
import { Notice } from '../components/Chrome'
import { go } from '../lib/router'

const DOCS = [
  { name: 'Express Solo', sub: 'Installation guide' },
  { name: 'NB-6000', sub: 'Installation guide' },
  { name: 'Express Plus', sub: 'Installation guide (PL 1000 & PB)' },
]

type Net = 'offline' | 'syncing' | 'online' | 'hidden'

export function Home({ onStart }: { onStart: () => void }) {
  // Scripted connectivity demo: the prototype starts offline, syncs, comes back
  // online, then the banner clears. It auto-plays once on load rather than
  // waiting for a real dropout a viewer might never trigger.
  const [net, setNet] = useState<Net>('offline')
  useEffect(() => {
    const timers = [
      setTimeout(() => setNet('syncing'), 4000),
      setTimeout(() => setNet('online'), 5500),
      setTimeout(() => setNet('hidden'), 7500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Until the queued changes are synced, the device only has its cached files.
  const offline = net === 'offline' || net === 'syncing'

  return (
    <>
      <div className="topbar">
        <span className="iconbtn ghost" />
        <h1>
          <span className="brand">
            <span className="mark"><Zap size={22} fill="currentColor" /></span>
            Northbeam
          </span>
        </h1>
        <span className="iconbtn ghost" />
      </div>

      {net !== 'hidden' && (
        <div className={`netbar ${net}`} role="status" aria-live="polite">
          <span className="neticon">
            {net === 'offline' && <CloudOff size={18} />}
            {net === 'syncing' && <RefreshCw size={18} className="spin" />}
            {net === 'online' && <Check size={18} />}
          </span>
          <div className="netcopy">
            <span className="nettitle">
              {net === 'offline' && 'Offline mode'}
              {net === 'syncing' && 'Syncing'}
              {net === 'online' && 'Back online'}
            </span>
            <span className="netsub">
              {net === 'offline' && 'All changes will be synced when the internet connection is established.'}
              {net === 'syncing' && 'Syncing all offline changes…'}
              {net === 'online' && 'All changes synced.'}
            </span>
          </div>
        </div>
      )}

      <div className="body">
        <h2 className="section">Tasks</h2>
        <div className="tiles">
          <button className="tile" onClick={() => { onStart(); go('/scan') }}>
            <span className="ring"><Plus size={30} /></span>
            Install
          </button>
          <button className="tile" onClick={() => { onStart(); go('/scan') }}>
            <span className="ring"><Wrench size={28} /></span>
            Service
          </button>
        </div>

        <Notice
          icon={<Info size={26} />}
          title="What's supported?"
          body="Express Solo, Express Plus, NB-250, NB-280 and Home Flex."
        />

        <h2 className="section">{offline ? 'Downloaded documents' : 'Documents'}</h2>
        {DOCS.map((d) => (
          <button className="row" key={d.name}>
            <span className="docthumb"><FileText size={24} /></span>
            <span className="grow">
              <span className="rt">{d.name}</span>
              <span className="rs">{d.sub}</span>
            </span>
            <ChevronRight className="chev" size={24} />
          </button>
        ))}
      </div>
    </>
  )
}
