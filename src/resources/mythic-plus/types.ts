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
  affix_details: Array<Affix>
  leaderboard_url: string
  region: RegionShortName
  title: string
}

/**
 * Leaderboad capacity for a region including the lowest level and time to quality
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusLeaderboardcapacity}
 */
export interface ViewMythicPlusLeaderboardCapacityResponse {
  realmListing: {
    affixes: Array<LeaderboardAffix>
    realms: Array<RealmCapacityEntry>
    region: Region
  }
}

/**
 * Details for a specific Mythic+ run
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1MythicplusRundetails}
 */
export interface ViewMythicPlusRunDetailsResponse {
  canManageOthersVideos: boolean
  canManageOwnVideos: boolean
  canViewPrivateDetails: boolean
  clear_time_ms: number
  completed_at: ISODateString
  deleted_at: ISODateString | null
  dungeon: Dungeon
  faction: Faction
  isPatron: boolean
  isTournamentProfile: boolean
  isViewingPrivateDetails: boolean
  keystone_platoon_id: number
  keystone_run_id: number
  keystone_team_id: number
  keystone_time_ms: number
  logged_details: LoggedRunDetails
  logged_run_id: number
  loggedSources: Array<LoggedSource>
  mythic_level: number
  num_chests: number
  num_modifiers_active: number
  replay_limit: number
  roster: Array<RunRosterMember>
  runPrivacyMode: string
  score: number
  season: SeasonReference
  status: string
  time_remaining_ms: number
  videos: Array<Video>
  weekly_modifiers: Array<RunModifier>
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
  affixes: Array<Affix>
  background_image_url: string
  clear_time_ms: number
  completed_at: ISODateString
  dungeon: string
  icon_url: string
  keystone_run_id: number
  map_challenge_mode_id: number
  mythic_level: number
  num_keystone_upgrades: number
  par_time_ms: number
  role: Role
  score: number
  short_name: string
  spec: Specialization
  url: string
  zone_expansion_id: ExpansionId
  zone_id: number
}

// ==================================================

interface Affix {
  description: string
  icon: string
  icon_url: string
  id: number
  name: string
  wowhead_url: string
}

interface Dungeon {
  expansion_id: ExpansionId
  group_finder_activity_ids: Array<number>
  icon_url: string
  id: number
  keystone_timer_ms: number
  map_challenge_mode_id: number
  name: string
  num_bosses: number
  patch: string
  short_name: string
  slug: string
  type: string
  wowInstanceId: number
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
  deaths: Array<RunDeathDetail>
  encounters: Array<RunEncounter>
  route_key: null | string
  showing_replay_authorized: boolean
  showing_route_authorized: boolean
  total_enemy_forces: number
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
  connectedRealms: Array<Realm>
  dungeons: Array<RealmDungeonCapacity>
  id: number
}

interface RealmDungeonCapacity {
  dungeon: Dungeon
  lowest: LeaderboardLowest | null
}

interface RunDeathDetail {
  approximate_died_at: number
  character_id: number
  logged_encounter_id: number
}

interface RunEncounter {
  approximate_relative_ended_at: number
  approximate_relative_started_at: number
  boss: RunEncounterBoss
  duration_ms: number
  id: number
  is_success: boolean
  pull_ended_at: ISODateString
  pull_started_at: ISODateString
  roster: Array<RunRosterMember>
  status: string
}

interface RunEncounterBoss {
  encounterId: number
  iconUrl: string
  name: string
  ordinal: number
  slug: string
  wingId: number
}

interface RunModifier {
  description: string
  icon: string
  id: number
  name: string
  slug: string
}

interface RunRosterMember {
  character: {
    artifactTraits: number
    class: PlayableClass
    gender: Gender
    id: number
    itemLevelEquipped: number
    name: string
    race: PlayableRace
    realm: Realm
    region: Region
    spec: Specialization
    talentLoadout: RunRosterTalentLoadout
    thumbnail: string
  }
  guild: null | RunRosterMemberGuild
  interestingAuras: Array<Spell>
  isBanned: boolean
  isTransfer: boolean
  items: CharacterGear
  oldCharacter: null | RunRosterMember['character']
  ranks: {
    realm: number
    region: number
    score: number
    world: number
  }
  role: Role
}

interface RunRosterMemberGuild {
  displayName: string
  faction: Faction
  id: number
  isDefaultLogo: boolean
  logo: string
  name: string
  path: string
  realm: Realm
  region: Region
}

interface RunRosterTalentLoadout {
  heroSubTreeId: number
  loadout: Array<TalentLoadoutEntry>
  loadoutText: string
  specId: number
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
