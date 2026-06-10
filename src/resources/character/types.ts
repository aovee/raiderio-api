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
import type { KeystoneRun } from '../mythic-plus/types'
import type { RaidInstance, RaidProgression } from '../raiding/types'

// ==================================================

/**
 * The response from the character profile endpoint. The basic profile information is always included, while the optional fields are only included if they were requested in the `fields` parameter of the request.
 * @see {@link https://raider.io/api#/character/getApiV1CharactersProfile}
 */
export type ViewCharacterProfileResponse = Character & {
  covenant?: unknown
  gear?: CharacterGear
  guild?: {
    name: string
    realm: Realm['name']
  }
  mythic_plus_best_runs?: Array<KeystoneRun>
  mythic_plus_highest_level_runs?: Array<KeystoneRun>
  mythic_plus_previous_weekly_highest_level_runs?: Array<KeystoneRun>
  mythic_plus_ranks?: MythicPlusRanks
  mythic_plus_recent_runs?: Array<KeystoneRun>
  mythic_plus_scores_by_season?: Array<MythicPlusSeasonScores>
  mythic_plus_weekly_highest_level_runs?: Array<KeystoneRun>
  previous_mythic_plus_ranks?: MythicPlusRanks
  raid_achievement_curve?: Array<RaidAchievementCurve>
  raid_achievement_meta?: Array<RaidAchievementMeta>
  raid_progression?: Record<RaidInstance, RaidProgression>
  talentLoadout?: TalentLoadout
}

// ==================================================

export const characterProfileFieldKeys = [
  'gear',
  'talents',
  'talents:categorized',
  'guild',
  'covenant',
  'mythic_plus_scores_by_season',
  'mythic_plus_ranks',
  'mythic_plus_recent_runs',
  'mythic_plus_best_runs',
  'mythic_plus_best_runs:all',
  'mythic_plus_alternate_runs',
  'mythic_plus_alternate_runs:all',
  'mythic_plus_highest_level_runs',
  'mythic_plus_weekly_highest_level_runs',
  'mythic_plus_previous_weekly_highest_level_runs',
  'previous_mythic_plus_ranks'
] as const

export interface Character {
  achievement_points: number
  active_spec_name: Specialization['name']
  active_spec_role: Specialization['role']
  class: PlayableClass['name']
  faction: Faction
  gender: Gender
  id?: number
  last_crawled_at: ISODateString
  name: string
  profile_banner: string
  profile_url: string
  race: PlayableRace['name']
  realm: string
  region: RegionShortName
  thumbnail_url: string
}

export interface CharacterGear {
  artifact_traits: number
  corruption: CorruptionDetails
  created_at: ISODateString
  item_level_equipped: number
  item_level_total: number
  items: ItemsContainer
  source: string
  updated_at: ISODateString
}

export type CharacterProfileFieldKey =
  | (typeof characterProfileFieldKeys)[number]
  | `mythic_plus_scores_by_season:${string}`
  | `raid_achievement_curve:${string}`
  | `raid_achievement_meta:${string}`

export interface TalentLoadout {
  active_hero_tree: {
    description: string
    iconUrl: string
    id: number
    name: string
    slug: string
    traitTreeId: number
  }
  class_talents?: Array<TalentLoadoutEntry>
  hero_talents?: Array<TalentLoadoutEntry>
  loadout?: Array<TalentLoadoutEntry>
  loadout_spec_id: number
  loadout_text: string
  spec_talents?: Array<TalentLoadoutEntry>
}

export interface TalentLoadoutEntry {
  entryIndex: number
  node: TalentNodeChoice | TalentNodePassive | TalentNodeSpell
  rank: number
}

// ==================================================

export interface Spell {
  hasCooldown: boolean
  icon: string
  id: number
  name: string
  rank: null | number
  school: number
}

interface AzeritePower {
  id: number
  spell: {
    icon: string
    id: number
    name: string
    rank: null | number
    school: number
  }
}

interface CorruptionDetails {
  added: number
  cloakRank: number
  items: ItemsContainer
  resisted: number
  spells: Array<unknown>
  total: number
}

interface EnchantDetails {
  icon: string
  id: number
  name: string
}

interface GearItem {
  azerite_powers: Array<AzeritePower>
  bonuses: Array<number>
  corruption: Pick<CorruptionDetails, 'added' | 'resisted' | 'total'>
  domination_shards: Array<unknown>
  enchant: number
  enchants: Array<EnchantDetails['id']>
  enchants_details: Array<EnchantDetails>
  gems: Array<GemDetails['id']>
  gems_details: Array<GemDetails>
  icon: string
  is_azerite_power: boolean
  is_legendary: boolean
  item_id: number
  item_level: number
  item_quality: number
  name: string
}

interface GemDetails {
  icon: string
  id: number
  name: string
}

type ItemsContainer = Record<ItemSlot, GearItem>

interface MythicPlusSeasonScores {
  scores: Record<ScoreKey, number>
  season: SeasonReference
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
  aotc: ISODateString
  raid: RaidInstance
}

interface RaidAchievementMeta {
  completed_achievements: Array<RaidAchievement>
  completed_count: number
  meta_achievement: {
    id: number
    raid: string
  }
  remaining_achievements: Array<RaidAchievement>
  tier: `tier_${number}`
  total_count: number
}

type RankKey = 'overall' | `class_${Role}` | `spec_${number}` | keyof Role

interface Ranks {
  realm: number
  region: number
  world: number
}

type ScoreKey = 'all' | `spec${0 | 1 | 2 | 3}` | Role

interface TalentNode {
  col: number
  entries: Array<TalentNodeEntryPassive | TalentNodeEntrySpell>
  flags: number
  id: number
  important: boolean
  posX: number
  posY: number
  row: number
  subTreeId: number
  treeId: number
}

interface TalentNodeChoice extends TalentNode {
  type: 2
}

interface TalentNodeEntry {
  id: number
  maxRanks: number
  spell: Spell
  traitDefinitionId: number
  traitSubTreeId: number
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
