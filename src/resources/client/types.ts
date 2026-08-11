import type { ISODateString } from '../../core'
import type { Realm } from './../../core/region-realm'

// ==================================================

/**
 * Rivals leaderboard window (self +/- 2) around a character. Defaults to the class leaderboard; pass specId for the spec leaderboard.
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1ClientCharacterrivals}
 */
export interface ViewClientCharacterRivalsResponse {
  rivals: Array<CharacterRival> | null
}

/**
 * Aggregate review payload for a completed Mythic+ run: Keystone Pace, past dungeon runs, and nearby spec leaderboard rivals
 * @see {@link https://raider.io/api#/mythic_plus/getApiV1ClientRunreview}
 */
export interface ViewClientRunReviewResponse {
  percentile: null
  historicalPercentile: null
  historicalLocked: boolean
  keystonePace: null
  runScore: number
  pastRuns: Array<PastRun>
  rivals: Array<CharacterRival | null>
}

// ==================================================

export type ClientScope = 'realm' | 'region' | 'world'

interface CharacterRival {
  rank: number
  name: string
  realm: Realm['name']
  score: number
  isSelf: boolean
}

interface PastRun {
  completedAt: ISODateString
  keyLevel: number
  clearTimeMs: number
  timed: boolean
  score: number
}
