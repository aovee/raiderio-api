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
  matches: Array<CharacterSearchMatch | GuildSearchMatch>
}

// ==================================================

interface Period {
  period: number
  end: string
  start: string
}

interface RegionPeriod {
  region: RegionShortName
  current: Period
  next: Period
  previous: Period
}

interface SearchMatch {
  name: string
}

type CharacterSearchMatch = SearchMatch & {
  type: 'character'
  data: {
    id: number
    name: string
    faction: Faction
    region: Region
    realm: Realm
    class: PlayableClass
  }
}

export type GuildSearchMatch = SearchMatch & {
  type: 'guild'
  data: {
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
}
