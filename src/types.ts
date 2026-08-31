// One job = one charging station a technician has to commission on site.
export type JobStatus = 'not_started' | 'in_progress' | 'blocked' | 'complete'

export interface Job {
  id: string
  siteName: string
  address: string
  stationSerial: string
  stationModel: string
  portCount: number
  scheduledFor: string // ISO date
  status: JobStatus
}
