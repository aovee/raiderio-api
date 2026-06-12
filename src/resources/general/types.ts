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
