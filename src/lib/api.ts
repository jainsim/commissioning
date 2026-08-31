/*
  Fake API. No server, no database.

  Every call resolves after a delay so the UI has to deal with real waiting
  states rather than instant transitions. Swapping this file for real fetch()
  calls is the only change a backend would need.
*/

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface StationResult {
  mac: string
  serial: string
  model: string
  ports: number
  ok: boolean
  error?: string
}

export interface Owner {
  firstName: string
  lastName: string
  email: string
  orgId: string
}

export const scanCode = () => wait(2000)
export const connectToStation = () => wait(2400)
export const saveStep = () => wait(700)

export async function commissionStations(): Promise<StationResult[]> {
  await wait(3000)
  return [
    { mac: '2000 0098 7654 321', serial: '233115115190', model: 'EXPD-PL2000', ports: 2, ok: true },
    { mac: '2000 0098 7654 322', serial: '233115115189', model: 'EXPD-PL2000', ports: 2, ok: true },
    {
      mac: '2000 0098 7654 323',
      serial: '233115115188',
      model: 'EXPD-PL2000',
      ports: 2,
      ok: false,
      error: 'Station did not respond to the configuration handshake.',
    },
  ]
}

/*
  Fails on the first attempt and succeeds on every retry, so both branches of
  the owner-notification dialog are reachable in a demo and neither is a dead
  end. The attempt number is passed in rather than counted in here: a module
  holding hidden state across a flow is exactly the kind of thing that makes a
  bug reproducible only on the second run-through.
*/
export async function notifyOwner(_owner: Owner, attempt: number): Promise<void> {
  await wait(1600)
  if (attempt === 0) throw new Error('Owner notification email could not be sent.')
}
