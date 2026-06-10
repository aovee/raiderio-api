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
export interface ViewGuildProfileResponse {
  displayName: null | string
  faction: Faction
  last_crawled_at: ISODateString
  members?: Array<GuildMember>
  name: string
  profile_url: string
  raid_encounters?: Array<RaidEncounter>
  raid_progression?: Record<RaidInstance, RaidProgression>
  raid_rankings?: Record<RaidInstance, RaidDifficultyRankings>
  realm: Realm['name']
  region: RegionShortName
}

// ==================================================

export const guildProfileKeys = {
  members: 'members',
  raid_progression: 'raid_progression',
  raid_rankings: 'raid_rankings'
} as const

export type GuildProfileFieldKey =
  | (typeof guildProfileKeys)[keyof typeof guildProfileKeys]
  | `raid_encounters:${RaidInstance}:${RaidDifficulty}`

// ==================================================

interface BossKill {
  defeatedAt: ISODateString
  durationMs: number
  isSuccess: boolean
  itemLevelEquippedAvg: number
  itemLevelEquippedMax: number
  itemLevelEquippedMin: number
  pulledAt: ISODateString
}

interface BossKillRosterMember {
  character: {
    artifactTraits: number
    class: PlayableClass
    gender: Gender
    id: number
    interestingAuras: Array<Spell>
    itemLevelEquipped: number
    items: CharacterGear
    name: string
    race: PlayableRace
    realm: Realm
    recruitmentProfiles: Array<RecruitmentProfile>
    region: Region
    spec: Specialization
    talentLoadout: TalentLoadout
    thumbnail: string
  }
  vantus: boolean
}

interface GuildMember {
  character: Pick<
    Character,
    | 'achievement_points'
    | 'active_spec_name'
    | 'active_spec_role'
    | 'class'
    | 'faction'
    | 'gender'
    | 'last_crawled_at'
    | 'name'
    | 'profile_banner'
    | 'profile_url'
    | 'race'
    | 'realm'
    | 'region'
  >
  rank: number
}
