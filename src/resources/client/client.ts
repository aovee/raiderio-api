import type { RegionShortName, Resource } from '../../core'
import type {
  ClientScope,
  ViewClientCharacterRivalsResponse,
  ViewClientRunReviewResponse
} from './types'

// ==================================================

const clientBasePath = '/client'

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param realm The realm (can be formatted as "Altar of Storms" or "altar-of-storms").
 * @param name The character name.
 * @param scope The scope in which to retrieve rivals (can be 'realm', 'region' or 'world')
 * @param specId If specified, limits the rivalr window to same spec
 * @returns List of rivals (self +/- 2) surrounding a character in leaderboard. Defaults to the class leaderboard; pass specId for the spec leaderboard. See {@link ViewClientCharacterRivalsResponse}
 */
export function clientCharacterRivals(
  region: RegionShortName = 'eu',
  realm: string,
  name: string,
  scope?: ClientScope,
  specId?: number
): Resource<ViewClientCharacterRivalsResponse> {
  return {
    apiVersion: 1,
    path: `${clientBasePath}/character-rivals`,
    query: {
      region,
      realm,
      name,
      scope,
      specId
    }
  }
}

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param realm The realm (can be formatted as "Altar of Storms" or "altar-of-storms").
 * @param name The character name.
 * @param dungeonId Raider.IO dungeon ID the run was completed in
 * @param keyLevel Mythic keystone level of the completed run
 * @param clearTimeMs Clear time of the completed run in milliseconds
 * @param affixes Comma separated affix IDs for the completed run. Used to derive the affix-adjusted timer when the canonical run is not indexed yet.
 * @param itemLevelMean Observed average item level of the completed run group, used for exact-bracket ILVL Pace
 * @param scope Scope of the rivals spec leaderboard. One of: realm, region, world
 * @param specId Spec ID for the rivals leaderboard. Defaults to the character's most-played spec for this dungeon, falling back to their active spec
 * @param completedAt ISO 8601 completion timestamp of the run. Scopes the historical standing to the run's weekly period; defaults to now (current period) when omitted. Historical runs MUST send their real completion time. A malformed value degrades only the historical standing (it never fails the request).
 * @returns Aggregate review payload for a completed Mythic+ run: Keystone Pace, past dungeon runs, and nearby spec leaderboard rivals. See {@link ViewClientRunReviewResponse}
 */
export function clientRunReview(
  region: RegionShortName = 'eu',
  realm: string,
  name: string,
  dungeonId: number,
  keyLevel: number,
  clearTimeMs: number,
  affixes?: string,
  itemLevelMean?: number,
  scope?: ClientScope,
  specId?: number,
  completedAt?: string
): Resource<ViewClientRunReviewResponse> {
  return {
    apiVersion: 1,
    path: `${clientBasePath}/run-review`,
    query: {
      region,
      realm,
      name,
      dungeonId,
      keyLevel,
      clearTimeMs,
      affixes,
      itemLevelMean,
      scope,
      specId,
      completedAt
    }
  }
}
