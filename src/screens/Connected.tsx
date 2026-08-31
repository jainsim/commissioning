import { Check, Bluetooth } from 'lucide-react'
import { TopBar, Button } from '../components/Chrome'
import { go } from '../lib/router'

/*
  A held confirmation, not a flash. The technician needs to know the link is
  up and to which station before they start entering configuration, because
  everything they do next is written to whatever this connected to.
*/
export function Connected() {
  return (
    <>
      <TopBar title="Express Plus Setup" showBack={false} />
      <div className="body stack">
        <div className="centre">
          <div className="bigcheck"><Check size={52} strokeWidth={3} /></div>
          <h3 className="title">Device connected</h3>
          <p className="lede">Bluetooth link established. You can move on to the configuration steps.</p>

          <dl style={{ margin: '4px 0 0' }}>
            <div className="drow"><dt>Model</dt><dd>Express Plus</dd></div>
            <div className="drow"><dt>MAC ID</dt><dd>2000 0098 7654 321</dd></div>
            <div className="drow"><dt>Signal</dt><dd><Bluetooth size={17} style={{ verticalAlign: -3 }} /> Excellent</dd></div>
          </dl>
        </div>
      </div>
      <div className="footer">
        <Button onClick={() => go('/device')}>Continue to setup</Button>
      </div>
    </>
  )
}
