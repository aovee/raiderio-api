import type {
  Faction,
  PlayableClass,
  Realm,
  Region,
  RegionShortName,
  SubRegion
} from '../../core'

// ==================================================

/**
 * Period information for each region
 * @see {@link https://raider.io/api#/general/getApiV1Periods}
 */
export interface ViewPeriodsResponse {
  periods: Array<RegionPeriod>
}

export type ViewSearchResponse = {
  matches: Array<SearchMatch>
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

interface SearchMatch {
  type: 'character' | 'guild'
  name: string
  data: CharacterSearchMatch | GuildSearchMatch
}

interface CharacterSearchMatch {
  id: number
  name: string
  faction: Faction
  region: Region
  realm: Realm
  class: PlayableClass
}

interface GuildSearchMatch {
  id: number
  name: string
  displayName: null | string
  faction: Faction
  realm: Realm
  region: Region
  subregion: SubRegion | null
  path: string
  logo: string
  isDefaultLogo: boolean
}
