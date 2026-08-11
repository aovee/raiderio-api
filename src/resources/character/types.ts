import type {
  Faction,
  Gender,
  ISODateString,
  ItemSlot,
  PlayableClass,
  PlayableRace,
  Realm,
  RegionShortName,
  Role,
  SeasonReference,
  Specialization
} from '../../core'
import type { KeystoneRun, KeystoneRunCount } from '../mythic-plus/types'
import type { RaidInstance, RaidProgression } from '../raiding/types'

// ==================================================

/**
 * The response from the character profile endpoint. The basic profile information is always included, while the optional fields are only included if they were requested in the `fields` parameter of the request.
 * @see {@link https://raider.io/api#/character/getApiV1CharactersProfile}
 */
export type ViewCharacterProfileResponse = Character & {
  gear?: CharacterGear
  talentLoadout?: TalentLoadout
  guild?: {
    name: string
    realm: Realm['name']
  }
  covenant?: unknown
  mythic_plus_best_runs?: Array<KeystoneRun>
  mythic_plus_highest_level_runs?: Array<KeystoneRun>
  mythic_plus_previous_weekly_highest_level_runs?: Array<KeystoneRun>
  mythic_plus_ranks?: MythicPlusRanks
  mythic_plus_recent_runs?: Array<KeystoneRun>
  mythic_plus_scores_by_season?: Array<MythicPlusSeasonScores>
  mythic_plus_weekly_highest_level_runs?: Array<KeystoneRun>
  mythic_plus_dungeon_run_counts?: Array<KeystoneRunCount>
  previous_mythic_plus_ranks?: MythicPlusRanks
  raid_achievement_meta?: Array<RaidAchievementMeta>
  raid_achievement_curve?: Array<RaidAchievementCurve>
  raid_progression?: Record<RaidInstance, RaidProgression>
}

// ==================================================

export const characterProfileFieldKeys = [
  'gear',
  'talents',
  'talents:categorized',
  'guild',
  'covenant',
  'raid_progression',
  'mythic_plus_ranks',
  'mythic_plus_recent_runs',
  'mythic_plus_best_runs',
  'mythic_plus_best_runs:all',
  'mythic_plus_alternate_runs',
  'mythic_plus_alternate_runs:all',
  'mythic_plus_highest_level_runs',
  'mythic_plus_weekly_highest_level_runs',
  'mythic_plus_previous_weekly_highest_level_runs',
  'mythic_plus_dungeon_run_counts',
  'previous_mythic_plus_ranks'
] as const

export interface Character {
  name: string
  race: PlayableRace['name']
  class: PlayableClass['name']
  active_spec_name: Specialization['name']
  active_spec_role: Specialization['role']
  gender: Gender
  faction: Faction
  achievement_points: number
  thumbnail_url: string
  region: RegionShortName
  realm: string
  last_crawled_at: ISODateString
  profile_url: string
  profile_banner: string
  id?: number
}

export interface CharacterGear {
  created_at: ISODateString
  updated_at: ISODateString
  source: string
  item_level_equipped: number
  item_level_total: number
  artifact_traits: number
  corruption: CorruptionDetails
  items?: ItemsContainer
}

export type CharacterProfileFieldKey =
  | (typeof characterProfileFieldKeys)[number]
  | `mythic_plus_scores_by_season:${string}` // Chainable via ":" (e.g. "mythic_plus_scores_by_season:current:season-mn-1")
  | `mythic_plus_dungeon_run_counts:${string}` // Chainable via ":" (e.g. "mythic_plus_dungeon_run_counts:season-mn-1:season-tww-3")
  | `raid_achievement_curve:${string}`
  | `raid_achievement_meta:${string}`

export interface TalentLoadout {
  loadout_spec_id: number
  loadout_text: string
  loadout?: Array<TalentLoadoutEntry>
  class_talents?: Array<TalentLoadoutEntry>
  spec_talents?: Array<TalentLoadoutEntry>
  hero_talents?: Array<TalentLoadoutEntry>
  active_hero_tree?: {
    id: number
    traitTreeId: number
    name: string
    slug: string
    description: string
    iconUrl: string
  }
}

export interface TalentLoadoutEntry {
  node: TalentNodeChoice | TalentNodePassive | TalentNodeSpell
  entryIndex: number
  rank: number
  grantedNode: boolean
  includeInSummary?: boolean
}

export interface Spell {
  id: number
  name: string
  icon: string
  school: number
  rank: null | number
  hasCooldown: boolean
}

// ==================================================

interface AzeritePower {
  id: number
  spell: {
    id: number
    school: number
    icon: string
    name: string
    rank: null | number
  }
  tier: number
}

interface CorruptionDetails {
  added: number
  resisted: number
  total: number
  cloakRank: number
  spells: Array<unknown>
  items: ItemsContainer
}

interface GearItem {
  item_id: number
  item_level: number
  enchant: number
  icon: string
  name: string
  item_quality: number
  is_legendary: boolean
  is_azerite_power: boolean
  azerite_powers: Array<AzeritePower | null>
  corruption: Pick<CorruptionDetails, 'added' | 'resisted' | 'total'>
  domination_shards: Array<unknown>
  tier: string
  gems: Array<GemDetails['id']>
  gems_detail: Array<GemDetails>
  enchants: Array<EnchantDetails['id']>
  enchants_detail: Array<EnchantDetails>
  bonuses: Array<number>
}

interface GemDetails {
  id: number
  name: string
  icon: string
}

interface EnchantDetails {
  id: number
  name: string
  icon: string
}

export type ItemsContainer = Record<ItemSlot, GearItem>

interface MythicPlusSeasonScores {
  season: SeasonReference
  scores: Record<ScoreKey, number>
  segments: Record<ScoreKey, MythicPlusScoreSegment>
}

type MythicPlusRanks = Record<RankKey, Ranks>

interface MythicPlusScoreSegment {
  color: string
  score: number
}

interface RaidAchievement {
  id: number
  raid: string
  timestamp: ISODateString
}

interface RaidAchievementCurve {
  raid: RaidInstance
  aotc: ISODateString
}

interface RaidAchievementMeta {
  tier: `tier_${number}`
  completed_count: number
  total_count: number
  meta_achievement: {
    id: number
    raid: string
  }
  completed_achievements: Array<RaidAchievement>
  remaining_achievements: Array<Omit<RaidAchievement, 'timestamp'>>
}

type RankKey = 'overall' | 'class' | `class_${Role}` | `spec_${number}` | Role

interface Ranks {
  world: number
  region: number
  realm: number
}

type ScoreKey = 'all' | `spec${0 | 1 | 2 | 3}` | Role

interface TalentNode {
  id: number
  treeId: number
  subTreeId: number
  flags: number
  entries: Array<TalentNodeEntryPassive | TalentNodeEntrySpell>
  important: boolean
  posX: number
  posY: number
  row: number
  col: number
}

interface TalentNodeChoice extends TalentNode {
  type: 2
}

interface TalentNodeEntry {
  id: number
  traitDefinitionId: number
  traitSubTreeId: number
  maxRanks: number
  spell: Spell
}

interface TalentNodeEntryPassive extends TalentNodeEntry {
  type: 2
}

interface TalentNodeEntrySpell extends TalentNodeEntry {
  type: 1
}

interface TalentNodePassive extends TalentNode {
  type: 0
}

interface TalentNodeSpell extends TalentNode {
  type: 1
}
