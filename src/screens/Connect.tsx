import { useEffect } from 'react'
import { Bluetooth } from 'lucide-react'
import { TopBar, Notice } from '../components/Chrome'
import { connectToStation } from '../lib/api'
import { go } from '../lib/router'

export function Connect() {
  useEffect(() => {
    let live = true
    connectToStation().then(() => { if (live) go('/connected') })
    return () => { live = false }
  }, [])

  return (
    <>
      <TopBar title="Express Plus Setup" />
      <div className="body">
        <Notice
          icon={<Bluetooth size={26} />}
          title="Stay within range"
          body="Stay within 10 metres of the station while Bluetooth is connecting."
        />
        <div className="centre">
          <div className="spinner" />
          <h3 className="title">Connecting to station</h3>
          <p className="lede">Do not power cycle the station during this process.</p>
        </div>
      </div>
    </>
  )
}
