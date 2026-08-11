import type {
  ExpansionId,
  Faction,
  Gender,
  ISODateString,
  LocalizedString,
  PlayableClass,
  PlayableRace,
  Realm,
  Region,
  RegionShortName,
  Role,
  SeasonReference,
  SeasonSlug,
  Specialization,
  Stream,
  Video
} from '../../core'
import type {
  CharacterGear,
  Spell,
  TalentLoadoutEntry
} from '../character/types'
import type { GuildSearchMatch } from '../general/types'
import type { RecruitmentProfile } from '../raiding/types'

// ==================================================

/**
 * The affixes for a specific region, including the latest run seen with this affix
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusAffixes}
 */
export interface ViewMythicPlusAffixesResponse {
  region: RegionShortName
  title: string
  leaderboard_url: string
  affix_details: Array<Affix>
}

/**
 * Leaderboad capacity for a region including the lowest level and time to quality
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusLeaderboardcapacity}
 */
export interface ViewMythicPlusLeaderboardCapacityResponse {
  realmListing: {
    region: Region
    affixes: Array<LeaderboardAffix>
    realms: Array<RealmCapacityEntry>
  }
}

/**
 * Details for a specific Mythic+ run
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusRundetails}
 */
export interface ViewMythicPlusRunDetailsResponse {
  season: SeasonReference
  status: string
  dungeon: Dungeon
  keystone_run_id: number
  mythic_level: number
  clear_time_ms: number
  keystone_time_ms: number
  completed_at: ISODateString
  num_chests: number
  time_remaining_ms: number
  logged_run_id: number
  videos: Array<Video>
  weekly_modifiers: Array<RunModifier>
  num_modifiers_active: number
  faction: Faction
  deleted_at: ISODateString | null
  score: number
  logged_details: LoggedRunDetails
  replay_limit: number
  keystone_team_id: number
  keystone_platoon_id: number
  isTournamentProfile: boolean
  roster: Array<RunRosterMember>
  canManageOwnVideos: boolean
  canManageOthersVideos: boolean
  loggedSources: Array<LoggedSource>
  isPatron: boolean
  runPrivacyMode: string
  canViewPrivateDetails: boolean
  isViewingPrivateDetails: boolean
}

/**
 * Information about the top runs that match the given criteria
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusRuns}
 */
export interface ViewMythicPlusRunsResponse {
  rankings: Array<MythicPlusRankingRun>
}

/**
 * Colors used for score tiers in the given season
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusScoretiers}
 */
export type ViewMythicPlusScoreTiersResponse = Array<ScoreTier>

/**
 * Mythic+ Season cutoffs for a region
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusSeasoncutoffs}
 */
export interface ViewMythicPlusSeasonCutoffsResponse {
  cutoffs: SeasonCutoffs
  ui: {
    access_key: string
    region: RegionShortName
    season: SeasonReference
  }
}

/**
 * Mythic plus season and dungeon static data for a specific expansion (slugs, names, etc.)
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusStaticdata}
 */
export interface ViewMythicPlusStaticDataResponse {
  dungeons: Array<SeasonDungeon>
  seasons: Array<MythicPlusStaticData>
}

/**
 * Mythic plus spec rankings
 */
export interface ViewMythicPlusSpecRankingsResponse {
  rankings: {
    rankedCharacters: Array<MythicPlusRankedCharacter>
    ui: {
      region: RegionShortName | 'world'
      season: SeasonSlug
      class: string
      spec: string
      page: number
      pageSize: number
      lastPage: number
    }
    region: Region
    realm: Realm | null
  }
}

// ==================================================

export interface KeystoneRun {
  dungeon: string
  short_name: string
  mythic_level: number
  completed_at: ISODateString
  clear_time_ms: number
  keystone_run_id: number
  par_time_ms: number
  num_keystone_upgrades: number
  map_challenge_mode_id: number
  zone_id: number
  zone_expansion_id: ExpansionId
  icon_url: string
  background_image_url: string
  score: number
  affixes: Array<Affix>
  url: string
  spec: Specialization
  role: Role
}

export interface Affix {
  id: number
  name: string
  description: string
  icon: string
  icon_url: string
  wowhead_url: string
}

export interface KeystoneRunCount {
  zone_id: number
  dungeon: string
  short_name: string
  season_runs_total: number
  season_runs_timed: number
}

// ==================================================

interface Dungeon {
  type: string
  id: number
  name: string
  short_name: string
  slug: string
  expansion_id: ExpansionId
  icon_url: string
  patch: string
  wowInstanceId: number
  map_challenge_mode_id: number
  keystone_timer_ms: number
  num_bosses: number
  group_finder_activity_ids: Array<number>
}

interface KeystoneRunRosterMember {
  character: {
    class: PlayableClass
    faction: Faction
    flags: Record<string, unknown>
    id: number
    level: number
    name: string
    path: string
    persona_id: number
    race: PlayableRace
    realm: Realm
    recruitmentProfiles: Array<RecruitmentProfile>
    region: Region
    spec: Specialization
    stream: null | Stream
  }
  isBanned: boolean
  isTransfer: boolean
  oldCharacter: null | RunRosterMember['character']
  role: Role
}

type LeaderboardAffix = Pick<Affix, 'icon' | 'id'> & {
  description: LocalizedString
  name: LocalizedString
  slug: string
}

interface LeaderboardLowest {
  mythicLevel: number
  rank: number
  timeInMilliseconds: number
}

interface LoggedRunDetails {
  correlationId: string
  route_key: null | string
  showing_route_authorized: boolean
  showing_replay_authorized: boolean
  total_enemy_forces: number
  deaths: Array<RunDeathDetail>
  encounters: Array<RunEncounter>
  enemies: Array<RunEnemy>
}

interface LoggedSource {
  logId: string
  source: string
}

interface MythicPlusRankingRun {
  rank: number
  run: RankingKeystoneRun
  score: number
}

interface RankingKeystoneRun {
  clear_time_ms: number
  completed_at: ISODateString
  deleted_at: ISODateString | null
  dungeon: Dungeon
  faction: 'mixed' | Faction
  keystone_platoon_id: null | number
  keystone_run_id: number
  keystone_team_id: number
  logged_run_id: number
  mythic_level: number
  num_chests: number
  num_modifiers_active: number
  platoon: null | Record<string, unknown>
  roster: Array<KeystoneRunRosterMember>
  season: SeasonReference
  time_remaining_ms: number
  videos: Array<Video>
  weekly_modifiers: Array<RunModifier>
}

interface RealmCapacityEntry {
  id: number
  connectedRealms: Array<Realm>
  dungeons: Array<RealmDungeonCapacity>
}

interface RealmDungeonCapacity {
  dungeon: Dungeon
  lowest: LeaderboardLowest | null
}

interface RunDeathDetail {
  logged_encounter_id: number
  character_id: number
  approximate_died_at: number
}

interface RunEncounter {
  id: number
  status: string
  pull_started_at: ISODateString
  pull_ended_at: ISODateString
  duration_ms: number
  is_success: boolean
  approximate_relative_started_at: number
  approximate_relative_ended_at: number
  boss: RunEncounterBoss
  roster: Array<RunRosterMember>
}

interface RunEncounterBoss {
  encounterId: number
  wowEncounterId: number
  name: string
  slug: string
  ordinal: number
  wingId: number
  iconUrl: string
}

interface RunEnemy {
  name: string
  enemy_forces_value: number
  finished_at: ISODateString
  npc_id: number
  count: number
  started_at: ISODateString
  approximate_relative_ended_at: number
}

interface RunModifier {
  id: number
  icon: string
  name: string
  slug: string
  description: string
}

interface RunRosterMember {
  character: {
    id: number
    persona_id: number
    name: string
    class: PlayableClass
    race: PlayableRace
    faction: Faction
    level: number
    spec: Pick<Specialization, 'id' | 'name' | 'slug' | 'is_melee' | 'role'>
    path: string
    realm: Realm
    region: Region
    stream: unknown
    recruitmentProfiles: Array<RecruitmentProfile>
    flags: number[]
    talentLoadout: {
      specId: number
      heroSubTreeId: number | null
      loadout: TalentLoadout['loadout']
      exportLoadoutText: string
      importLoadoutText: string
      dbcIndexVersion: string
      loadoutText: string
    }
  }
  oldCharacter: null | RunRosterMember['character']
  isTransfer: boolean
  isBanned: boolean
  guild: GuildInfos
  role: Role
  items: CharacterGear
  ranks: {
    realm: number
    region: number
    score: number
    world: number
  }
  interestingAuras: Array<Spell>
}

interface ScoreTier {
  rgbFloat: [number, number, number]
  rgbHex: string
  rgbInteger: [number, number, number]
  score: number
}

export const bracketDungeonLevels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29
] as const

type BracketDungeonLevel = (typeof bracketDungeonLevels)[number]

export const percentiles = [999, 990, 900, 750, 600] as const

interface Coordinates {
  total: number
  x: number
  y: number
}

interface CutoffFactionStat {
  quantile: number
  quantileMinValue: number
  quantilePopulationCount: number
  quantilePopulationFraction: number
  totalPopulationCount: number
}

interface GraphData {
  color: string
  data: Array<Coordinates>
  marker: {
    enabled: boolean
  }
  name: string
  type: string
}

interface MythicPlusStaticData {
  blizzard_season_id: number
  dungeons: Array<SeasonDungeon>
  ends: Record<RegionShortName, ISODateString>
  is_main_season: boolean
  name: string
  seasonal_affix: Affix | null
  short_name: string
  slug: SeasonReference
  starts: Record<RegionShortName, ISODateString>
}

type Percentile = (typeof percentiles)[number]

type PercentileKey = `p${Percentile}`

type SeasonCutoffEntry = Record<'all' | Faction, CutoffFactionStat | null> &
  Record<'allColor' | `${Faction}Color`, null | string>

type SeasonCutoffs = Record<
  `allTimed${BracketDungeonLevel}`,
  SeasonCutoffEntry & {
    score: number
  }
> &
  Record<PercentileKey, SeasonCutoffEntry> & {
    bracketDungeonLevels: Array<BracketDungeonLevel>
    graphData: Record<PercentileKey, GraphData>
    isRemappedSeason: boolean
    keystoneConqueror: SeasonCutoffEntry & { score: number }
    keystoneExplorer: SeasonCutoffEntry & { score: number }
    keystoneHero: SeasonCutoffEntry & { score: number }
    keystoneLegend: SeasonCutoffEntry & { score: number }
    keystoneMaster: SeasonCutoffEntry & { score: number }
  }

interface SeasonDungeon {
  background_image_url: string
  challenge_mode_id: number
  icon_url: string
  id: number
  keystone_timer_seconds: number
  name: string
  short_name: string
  slug: string
}

type GuildDetails = GuildSearchMatch['data']

interface MythicPlusRankedCharacter {
  rank: number
  score: number
  scoreColor: string
  runs: Array<MythicPlusRankedCharacterRun>
  character: MythicPlusRankedCharacterDetails
  guild: GuildDetails
  patronLevel: number
}

interface MythicPlusRankedCharacterRun {
  zoneId: number
  keystoneRunId: number
  clearTimeMs: number
  mythicLevel: number
  score: number
  period: number
  affixes: number[]
  loggedRunId: number
  numChests: number
}

interface MythicPlusRankedCharacterDetails {
  id: number
  persona_id: number
  name: string
  class: PlayableClass
  race: PlayableRace
  faction: Faction
  level: number
  spec: Specialization
  path: string
  realm: Realm
  region: Region
  stream: Stream | null
  recruitmentProfiles: Array<RecruitmentProfile>
  flags: Record<string, unknown>
  talentLoadoutText: string
}
