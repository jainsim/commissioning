import { useCallback, useState } from 'react'
import { useRoute } from './lib/router'
import { Shell } from './components/Shell'
import type { Owner, StationResult } from './lib/api'
import { Home } from './screens/Home'
import { Scan } from './screens/Scan'
import { Connect } from './screens/Connect'
import { Connected } from './screens/Connected'
import { DeviceSetup, type StepKey } from './screens/DeviceSetup'
import { LocationPhoto } from './screens/LocationPhoto'
import { Progress } from './screens/Progress'
import { Results } from './screens/Results'
import { StationOwner } from './screens/StationOwner'
import { SetupComplete } from './screens/SetupComplete'
import { StationDetails } from './screens/StationDetails'

const NO_STEPS: Record<StepKey, boolean> = {
  wiring: false, dlm: false, network: false, location: false, wizard: false,
}

export default function App() {
  const route = useRoute()

  // One flow, so all shared state lives here and is passed down as props.
  // No state library: with eleven screens this is still less code to read
  // than wiring one up.
  const [steps, setSteps] = useState(NO_STEPS)
  const [photo, setPhoto] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [results, setResults] = useState<StationResult[]>([])
  const [owner, setOwner] = useState<Owner | null>(null)
  const [emailed, setEmailed] = useState(false)

  const completeStep = useCallback(
    (k: StepKey) => setSteps((s) => ({ ...s, [k]: true })),
    []
  )

  // Capturing the photo is what completes the location step, so the two are
  // set together rather than letting them drift apart.
  const savePhoto = useCallback((v: string | null) => {
    setPhoto(v)
    setSteps((s) => ({ ...s, location: !!v }))
  }, [])

  const removeStation = useCallback(
    (mac: string) => setResults((r) => r.filter((s) => s.mac !== mac)),
    []
  )

  const finishOwner = useCallback((o: Owner | null, sent: boolean) => {
    setOwner(o)
    setEmailed(sent)
  }, [])

  const reset = useCallback(() => {
    setSteps(NO_STEPS)
    setPhoto(null)
    setComment('')
    setResults([])
    setOwner(null)
    setEmailed(false)
  }, [])

  // '/station/:serial' is the only route with a parameter, so it is matched by
  // prefix rather than pulling in a pattern-matching router.
  const stationSerial = route.startsWith('/station/') ? route.slice('/station/'.length) : null

  let screen
  if (stationSerial) {
    screen = <StationDetails station={results.find((r) => r.serial === stationSerial)} photo={photo} />
  } else {
    switch (route) {
      case '/scan':      screen = <Scan />; break
      case '/connect':   screen = <Connect />; break
      case '/connected': screen = <Connected />; break
      case '/device':    screen = <DeviceSetup done={steps} complete={completeStep} />; break
      case '/photo':
        screen = <LocationPhoto photo={photo} setPhoto={savePhoto} comment={comment} setComment={setComment} />
        break
      case '/progress':  screen = <Progress onDone={setResults} />; break
      case '/results':   screen = <Results results={results} onRemove={removeStation} />; break
      case '/owner':     screen = <StationOwner onFinish={finishOwner} />; break
      case '/complete':  screen = <SetupComplete owner={owner} emailed={emailed} results={results} />; break
      default:           screen = <Home onStart={reset} />
    }
  }

  return (
    <Shell>
      <div className="phone">{screen}</div>
    </Shell>
  )
}
