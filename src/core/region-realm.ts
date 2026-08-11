export const regions = ['us', 'eu', 'tw', 'kr', 'cn'] as const
export interface Realm {
  id: number
  connectedRealmId: number
  wowRealmId: number
  wowConnectedRealmId: number
  name: string
  altName: string
  slug: string
  altSlug: string
  locale: string
  isConnected: boolean
  realmType: string
}

export type RealmSummary = Pick<Realm, 'isConnected' | 'name' | 'slug'>

export interface Region {
  name: string
  slug: string
  short_name: RegionShortName
}

export type RegionShortName = (typeof regions)[number]

export interface SubRegion {
  name: string
  slug: string
  short_name: string
  regions: Array<Region>
}
