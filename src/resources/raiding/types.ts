import type {
  ISODateString,
  Ranks,
  Realm,
  Region,
  RegionShortName,
  Stream,
  SubRegion,
  Video
} from '../../core'
import type { Guild } from './../guild/types'

// ==================================================

/**
 * The rankings for the specified boss, raid, difficulty and region
 * @see {@link https://raider.io/api#/raiding/getApiV1RaidingBossrankings}
 */
export interface ViewBossRankingsResponse {
  bossRankings: Array<BossRanking>
}

/**
 * The hall of fame for a given raid
 * @see {@link https://raider.io/api#/raiding/getApiV1RaidingHalloffame}
 */
export interface ViewHallOfFameResponse {
  hallOfFame: {
    bossKills: Array<HallOfFameBossKill>
    winningGuilds: Array<HallOfFameGuildEntry>
  }
}

/**
 * Details of raiding progression for a raid, showing how many guilds have reached each boss kill milestone
 * @see {@link https://raider.io/api#/raiding/getApiV1RaidingProgression}
 */
export interface ViewRaidProgressionResponse {
  progression: Array<RaidRaceProgressionEntry>
}

/**
 * The raid rankings for a given raid and region
 * @see {@link https://raider.io/api#/raiding/getApiV1RaidingRaidrankings}
 */
export interface ViewRaidRankingsResponse {
  raidRankings: Array<RaidRankingEntry>
}

/**
 * Raid and boss static data for a specific expansion (slugs, names, etc)
 * @see {@link https://raider.io/api#/raiding/getApiV1RaidingStaticdata}
 */
export interface ViewRaidingStaticDataResponse {
  raids: Array<RaidStaticData>
}

// ==================================================

export const raidDifficulties = ['normal', 'heroic', 'mythic'] as const

export const raidInstances = [
  'the-tidebound-grotto',
  'the-venomous-abyss',
  'sporefall',
  'tier-mn-1',
  'manaforge-omega',
  'liberation-of-undermine',
  'nerubar-palace',
  'blackrock-depths',
  'awakened-amirdrassil-the-dreams-hope',
  'awakened-aberrus-the-shadowed-crucible',
  'awakened-vault-of-the-incarnates',
  'amirdrassil-the-dreams-hope',
  'aberrus-the-shadowed-crucible',
  'vault-of-the-incarnates',
  'fated-sepulcher-of-the-first-ones',
  'fated-sanctum-of-domination',
  'fated-castle-nathria',
  'sepulcher-of-the-first-ones',
  'sanctum-of-domination',
  'castle-nathria',
  'nyalotha-the-waking-city',
  'the-eternal-palace',
  'crucible-of-storms',
  'battle-of-dazaralor',
  'uldir',
  'antorus-the-burning-throne',
  'tomb-of-sargeras',
  'the-nighthold',
  'trial-of-valor',
  'the-emerald-nightmare'
] as const

export type RaidDifficulty = (typeof raidDifficulties)[number]

export type RaidDifficultyRankings = Record<RaidDifficulty, Ranks>

export interface RaidEncounter {
  slug: string
  name: string
  defeatedAt: ISODateString | null
}

export type RaidInstance = (typeof raidInstances)[number]

export type RaidProgression = Record<
  `${RaidDifficulty}_bosses_killed`,
  number
> & {
  summary: string
  expansion_id: number
  total_bosses: number
}

export interface RecruitmentProfile {
  activity_type: string
  entity_type: string
  recruitment_profile_id: number
}

export type GuildInfos = Pick<
  Guild,
  'id' | 'name' | 'displayName' | 'faction'
> & {
  realm: Realm
  region: Region
  subregion: SubRegion
  path: string
  logo: string
  isDefaultLogo: boolean
}

// ==================================================

interface BossRanking {
  rank: number
  regionRank: number
  guild: GuildInfos
  encountersDefeated: Array<
    EncounterDefeated & {
      attempts: number
    }
  >
  doesVideoExist: boolean
  streamers: GuildStreamers
  recruitmentProfiles: Array<RecruitmentProfile>
  itemLevelAvg: number
}

interface EncounterDefeated {
  slug: string
  lastDefeated: ISODateString
  firstDefeated: ISODateString
}

interface GuildDefeatEntry {
  defeatedAt: ISODateString
  guild: GuildInfos
  streamers: GuildStreamers
  recruitmentProfiles: Array<RecruitmentProfile>
}

interface GuildEncounter {
  guild: GuildInfos
  defeatedAt: ISODateString
  streamers: GuildStreamers
  doesVideoExist: boolean
  recruitmentProfiles: Array<RecruitmentProfile>
}

interface GuildPrivacy {
  raidPulls: boolean
  raidPercents: boolean
  raidComps: boolean
  wereRaidPullsRestricted: boolean
  wereRaidPercentsRestricted: boolean
  wereRaidCompsRestricted: boolean
  shareRaidUntil: ISODateString | null
}

interface GuildStreamers {
  count: number
  description?: string
  stream: Stream | null
}

interface HallOfFameBossKill {
  boss: string
  bossSummary: RaidBossSummary
  bossKillVideo: Video
  defeatedBy: {
    totalCount: number
    guilds: Array<GuildEncounter>
  }
  attemptedBy: {
    totalCount: number
    attempts: Array<GuildEncounter>
  }
}

interface HallOfFameGuildEntry {
  rank: number
  guild: GuildInfos
  encountersDefeated: Array<EncounterDefeated>
  streamers: GuildStreamers
  recruitmentProfiles: Array<RecruitmentProfile>
}

interface RaidBossSummary {
  encounterId: number
  wowEncounterId: number
  name: string
  slug: string
  ordinal: number
  wingId: number
  iconUrl: string
}

interface RaidEncounterStaticData {
  id: number
  slug: string
  name: string
}

type RaidingGuild = GuildInfos & {
  color: string
}

interface RaidRaceProgressionEntry {
  progress: number
  totalGuilds: number
  guilds: Array<GuildDefeatEntry>
}

interface RaidRankingEncounter {
  id: number
  slug: string
  numPulls: number
  pulStartedAt: ISODateString
  bestPercent: number
  isDefeated: boolean
}

interface RaidRankingEntry {
  rank: number
  regionRank: number
  guild: RaidingGuild
  encountersDefeated: Array<
    EncounterDefeated & {
      attempts: number
    }
  >
  guildPrivacy: GuildPrivacy
  encountersPulled: Array<RaidRankingEncounter>
}

interface RaidStaticData {
  id: number
  slug: RaidInstance
  name: string
  short_name: string
  icon: string
  starts: Record<RegionShortName, ISODateString>
  ends: Record<RegionShortName, ISODateString>
  encounters: Array<RaidEncounterStaticData>
}
