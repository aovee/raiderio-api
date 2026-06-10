import type {
  Faction,
  PlayableClass,
  PlayableRace,
  Specialization
} from './character'
import type { Realm, Region } from './region-realm'
import type { SeasonReference } from './season'

export interface Ranks {
  realm: number
  region: number
  world: number
}

export interface Stream {
  activiy_record_id: number
  community_ids: Array<string>
  description?: string
  game_id: string
  id: string
  is_featured_stream: boolean
  language: string
  name: string
  started_at: string
  thumbnail_url: string
  title: string
  type: string
  user_id: string
  viewer_count: number
}

export interface Video {
  character: {
    class: PlayableClass
    faction: Faction
    flags: unknown
    id: number
    level: number
    name: string
    path: string
    persona_id: number
    race: PlayableRace
    realm: Realm
    region: Region
    spec: Specialization
  }
  createdByUserId: number
  duration: number
  id: string
  seasonSlug: SeasonReference
  startVideoTimeSeconds: null | number
  thumbnailUrl: null | string
  videoId: string
  videoType: string
}
