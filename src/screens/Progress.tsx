import { useEffect } from 'react'
import { TopBar } from '../components/Chrome'
import { commissionStations, type StationResult } from '../lib/api'
import { go } from '../lib/router'

export function Progress({ onDone }: { onDone: (r: StationResult[]) => void }) {
  useEffect(() => {
    let live = true
    commissionStations().then((r) => {
      if (!live) return
      onDone(r)
      go('/results')
    })
    return () => { live = false }
  }, [onDone])

  return (
    <>
      <TopBar title="Device setup progress" showBack={false} />
      <div className="body">
        <div className="working">
          <span className="spinner sm" />
          <div>
            <b>Station setup is in progress</b>
            <div className="metaline">MAC · 2000 0098 7654 321</div>
          </div>
        </div>
      </div>
    </>
  )
}
