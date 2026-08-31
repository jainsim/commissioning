import { Plus, Wrench, Info, FileText, ChevronRight, Zap } from 'lucide-react'
import { Notice } from '../components/Chrome'
import { go } from '../lib/router'

const DOCS = [
  { name: 'Express Solo', sub: 'Installation guide' },
  { name: 'NB-6000', sub: 'Installation guide' },
  { name: 'Express Plus', sub: 'Installation guide (PL 1000 & PB)' },
]

export function Home({ onStart }: { onStart: () => void }) {
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

        <h2 className="section">Documents</h2>
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
