import type { RegionShortName } from '../../core'

// ==================================================

/**
 * Period information for each region
 * @see {@link https://raider.io/api#/general/getApiV1Periods}
 */
export interface ViewPeriodsResponse {
  periods: Array<RegionPeriod>
}

// ==================================================

interface Period {
  end: string
  period: number
  start: string
}

interface RegionPeriod {
  current: Period
  next: Period
  previous: Period
  region: RegionShortName
}
