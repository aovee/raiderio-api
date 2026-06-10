export const regions = ['us', 'eu', 'tw', 'kr', 'cn'] as const
export interface Realm {
  altName: string
  altSlug: string
  connectedRealmId: number
  id: number
  isConnected: boolean
  locale: string
  name: string
  realmType: string
  slug: string
  wowConnectedRealmId: number
  wowRealmId: number
}

export type RealmSummary = Pick<Realm, 'isConnected' | 'name' | 'slug'>

export interface Region {
  name: string
  short_name: RegionShortName
  slug: string
}

export type RegionShortName = (typeof regions)[number]

export interface SubRegion {
  name: string
  slug: string
  short_name: string
  regions: Array<Region>
}
