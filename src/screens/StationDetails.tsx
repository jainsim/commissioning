import type { ReactNode } from 'react'
import { TopBar } from '../components/Chrome'
import { SiteMapArt } from '../components/Illustration'
import type { StationResult } from '../lib/api'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="dsection">
      <h2 className="section">{title}</h2>
      <dl style={{ margin: 0 }}>{children}</dl>
    </div>
  )
}

const Row = ({ k, v, muted }: { k: string; v: string; muted?: boolean }) => (
  <div className="drow">
    <dt>{k}</dt>
    <dd className={muted ? 'muted' : undefined}>{v}</dd>
  </div>
)

export function StationDetails({ station, photo }: { station?: StationResult; photo: string | null }) {
  if (!station) {
    return (
      <>
        <TopBar title="Station details" />
        <div className="body"><p className="lede" style={{ marginTop: 32 }}>Station not found.</p></div>
      </>
    )
  }

  return (
    <>
      <TopBar title="Station details" />
      <div className="body">
        <Section title="Identity">
          <Row k="MAC ID" v={station.mac} />
          <Row k="Station ID" v="122041009284" />
          <Row k="Model #" v={station.model} />
          <Row k="Serial number" v={station.serial} />
          <Row k="Firmware" v="8.0.1-3024.05.00.449-alpha" />
        </Section>

        <Section title="Cellular">
          <Row k="SIM" v="Northbeam managed" />
          <Row k="Network carrier" v="Vodafone" />
          <Row k="Signal strength" v="Excellent" />
          <Row k="RSRP" v="-80 dBm" />
          <Row k="RSRQ" v="-10 dB" />
        </Section>

        <Section title="RFID">
          <Row k="AC breaker rating" v="60 A" />
          <Row k="Card reader" v="Enabled" />
        </Section>

        <Section title="Wi-Fi">
          <Row k="IP configuration" v="DHCP" />
          <Row k="IP address" v="192.168.0.1" />
          <Row k="Status" v="Connected" />
        </Section>

        <Section title="Cloud">
          <Row k="Profile" v="Europe" />
          <Row k="Status" v="Connected" />
          <Row k="Cloud status" v="Connected" />
        </Section>

        <Section title="Location">
          <Row k="Address" v="20-4 S Innsbrucker Bundesstr. 126" />
          <Row k="City" v="Salzburg" />
          <Row k="Building" v="Level B2" />
          <Row k="Floor" v="Lower ground" />
          <Row k="Parking spot" v="B2-14" />
          <Row k="Port 1 accessibility" v="Step-free" />
          <Row k="Port 2 accessibility" v="Step-free" />
        </Section>

        <div className="dsection">
          <h2 className="section">Photo</h2>
          <div className="photostrip">
            {photo ? (
              <img src={photo} alt="Station location" style={{ width: '100%', display: 'block' }} />
            ) : (
              <SiteMapArt />
            )}
          </div>
          <p className="caption">Captured during commissioning. Helps drivers find the station.</p>
        </div>
      </div>
    </>
  )
}
