import type {
  Faction,
  ISODateString,
  Ranks,
  Realm,
  RealmSummary,
  Region,
  Stream,
  Video
} from '../../core'

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
  defeatedAt: ISODateString | null
  name: string
  slug: string
}

export type RaidInstance = (typeof raidInstances)[number]

export type RaidProgression = Record<
  `${RaidDifficulty}_bosses_killed`,
  number
> & {
  expansion_id: number
  summary: string
  total_bosses: number
}

export interface RecruitmentProfile {
  activity_type: string
  entity_type: string
  recruitment_profile_id: number
}

// ==================================================

type BossRanking = Record<RaidInstance, RaidDifficultyRankings>

interface EncounterDefeated {
  firstDefeated: ISODateString
  lastDefeated: ISODateString
  slug: string
}

interface GuildDefeatEntry {
  defeatedAt: ISODateString
  guild: GuildSummary
}

interface GuildEncounter {
  encountersDefeated: Array<EncounterDefeated>
  guild: RaidingGuild
  rank: number
}

interface GuildPrivacy {
  raidComps: boolean
  raidPercents: boolean
  raidPulls: boolean
  shareraidUntil: ISODateString
  wereRaidCompsRestricted: boolean
  wereRaidPercentsRestricted: boolean
  wereRaidPullsRestricted: boolean
}

interface GuildStreamers {
  count: number
  description: string
  stream: Stream
}

interface GuildSummary {
  displayName: string
  faction: Faction
  id: number
  name: string
  realm: RealmSummary
  region: Region
}

interface HallOfFameBossKill {
  attemptedBy: {
    attempts: Array<GuildEncounter>
    totalCount: number
  }
  boss: string
  bossKillVideo: Video
  bossSummary: RaidBossSummary
  defeatedBy: {
    guilds: Array<GuildEncounter>
    totalCount: number
  }
}

type HallOfFameGuildEntry = GuildEncounter & {
  defeatedAt: ISODateString
  doesVideoExist: boolean
  recruitmentProfiles: Array<RecruitmentProfile>
  streamers: GuildStreamers
}

interface RaidBossSummary {
  encounterId: number
  iconUrl: string
  name: string
  ordinal: number
  slug: string
  wingId: number
}

interface RaidEncounterStaticData {
  id: number
  name: string
  slug: string
}

type RaidingGuild = GuildSummary & {
  color: string
  isDefaultLogo: boolean
  logo: string
  path: string
  realm: Realm
}

interface RaidRaceProgressionEntry {
  guilds: Array<GuildDefeatEntry>
  progress: number
  totalGuilds: number
}

interface RaidRankingEncounter {
  bestPercent: number
  id: number
  isDefeated: boolean
  numPulls: number
  pulStartedAt: ISODateString
  slug: string
}

interface RaidRankingEntry {
  encountersDefeated: Array<EncounterDefeated>
  encountersPulled: Array<RaidRankingEncounter>
  guild: RaidingGuild
  guildPrivacy: GuildPrivacy
  rank: number
  regionRank: number
}

interface RaidStaticData {
  encounters: Array<RaidEncounterStaticData>
  ends: {
    ends: ISODateString
  }
  icon: string
  id: number
  name: string
  short_name: string
  slug: RaidInstance
  starts: {
    starts: ISODateString
  }
}
