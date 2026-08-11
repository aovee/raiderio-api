import type {
  Faction,
  Gender,
  ISODateString,
  PlayableClass,
  PlayableRace,
  Realm,
  Region,
  RegionShortName,
  Specialization
} from '../../core'
import type {
  Character,
  CharacterGear,
  Spell,
  TalentLoadout
} from '../character/types'
import type {
  RaidDifficulty,
  RaidDifficultyRankings,
  RaidEncounter,
  RaidInstance,
  RaidProgression,
  RecruitmentProfile
} from '../raiding/types'

// ==================================================

/**
 * Information about a guild boss kill
 * @see {@link https://raider.io/api#/guild/getApiV1GuildsBosskill}
 */
export interface ViewGuildBossKillResponse {
  kill: BossKill
  roster: Array<BossKillRosterMember>
}

/**
 * Information about a guild
 * @see {@link https://raider.io/api#/guild/getApiV1GuildsProfile}
 */
export type ViewGuildProfileResponse = Omit<Guild, 'id'> & {
  members?: Array<GuildMember>
  raid_encounters?: Array<RaidEncounter>
  raid_progression?: Record<RaidInstance, Omit<RaidProgression, 'expansion_id'>>
  raid_rankings?: Record<RaidInstance, RaidDifficultyRankings>
}

// ==================================================

export const guildProfileKeys = {
  members: 'members',
  raid_progression: 'raid_progression',
  raid_rankings: 'raid_rankings'
} as const

export type GuildProfileFieldKey =
  | (typeof guildProfileKeys)[keyof typeof guildProfileKeys]
  | `raid_progression:${string}`
  | `raid_encounters:${RaidInstance}:${RaidDifficulty}`

export interface Guild {
  id?: number
  name: string
  displayName: null | string
  faction: Faction
  region: RegionShortName
  realm: Realm['name']
  last_crawled_at: ISODateString
  profile_url: string
}

// ==================================================

interface BossKill {
  pulledAt: ISODateString
  defeatedAt: ISODateString
  durationMs: number
  isSuccess: boolean
  itemLevelEquippedAvg: number
  itemLevelEquippedMax: number
  itemLevelEquippedMin: number
}

interface BossKillRosterMember {
  character: {
    id: number
    name: string
    race: PlayableRace
    class: PlayableClass
    spec: Specialization
    talentLoadout: {
      specId: number
      heroSubTreeId: number | null
      loadout: TalentLoadout['loadout']
      exportLoadoutText: string
      importLoadoutText: string
      dbcIndexVersion: string
      loadoutText: string
    }
    gender: Gender
    thumbnail: string
    itemLevelEquipped: number
    artifactTraits: number
    realm: Realm
    region: Region
    items: CharacterGear
    interestingAuras: Array<Spell>
    recruitmentProfiles: Array<RecruitmentProfile>
  }
  vantus: boolean
}

interface GuildMember {
  rank: number
  character: Pick<
    Character,
    | 'name'
    | 'race'
    | 'class'
    | 'active_spec_name'
    | 'active_spec_role'
    | 'gender'
    | 'faction'
    | 'achievement_points'
    | 'region'
    | 'realm'
    | 'last_crawled_at'
    | 'profile_url'
    | 'profile_banner'
  >
}
