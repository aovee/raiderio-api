import type {
  ExpansionId,
  Locale,
  RegionShortName,
  Resource,
  SeasonReference,
  SeasonSlug,
  WeekScope
} from '../../core'
import type {
  ViewMythicPlusAffixesResponse,
  ViewMythicPlusLeaderboardCapacityResponse,
  ViewMythicPlusRunDetailsResponse,
  ViewMythicPlusRunsResponse,
  ViewMythicPlusScoreTiersResponse,
  ViewMythicPlusSeasonCutoffsResponse,
  ViewMythicPlusStaticDataResponse,
  ViewMythicPlusSpecRankingsResponse
} from './types'

// ==================================================

const mythicPlusBasePath = '/mythic-plus'

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param locale The locale (en, es, fr, de, ru, ko or cn).
 * @returns List of current Mythic Plus affixes, including their names and descriptions in the specified locale. See {@link ViewMythicPlusAffixesResponse}
 */
export function mythicPlusAffixes(
  region: RegionShortName = 'eu',
  locale: Locale = 'en'
): Resource<ViewMythicPlusAffixesResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/affixes`,
    query: {
      locale,
      region
    }
  }
}

// ==================================================

/**
 *
 * @param scope The week scope (current or previous).
 * @param region The region (us, eu, kr or tw).
 * @param realm The realm (can be formatted as "Altar of Storms" or "altar-of-storms"). Optional, if not provided, the capacity for the entire region will be returned.
 * @returns The Mythic Plus leaderboard capacity for the specified scope, region and realm (if provided). See {@link ViewMythicPlusLeaderboardCapacityResponse}
 */
export function mythicPlusLeaderboardCapacity(
  scope: WeekScope,
  region: RegionShortName,
  realm?: null | string
): Resource<ViewMythicPlusLeaderboardCapacityResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/leaderboard-capacity`,
    query: {
      realm: realm ?? undefined,
      region,
      scope
    }
  }
}

// ==================================================

/**
 * @param season The season slug (e.g. "season-tww-4").
 * @param id The ID of the Mythic Plus run.
 * @returns Detailed information about the specified Mythic Plus run, including the dungeon, keystone level, clear time, affixes, roster and more. See {@link ViewMythicPlusRunDetailsResponse}
 */
export function mythicPlusRunDetails(
  season: SeasonReference,
  id: number
): Resource<ViewMythicPlusRunDetailsResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/run-details`,
    query: {
      id,
      season
    }
  }
}

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param page The page number for pagination (starting from 0).
 * @param season The season slug (e.g. "season-tww-4"). Optional, if not provided, runs from the current season will be returned.
 * @param dungeon The name of the dungeon (e.g. "plaguefall"). Optional, if not provided, runs from all dungeons will be returned.
 * @param affixes A hyphen-separated list of affix slugs (e.g. "fortified-bolstering"). Optional, if not provided, runs with any affixes will be returned.
 * @returns information about the top runs that match the given criteria. See {@link ViewMythicPlusRunsResponse}
 */
export function mythicPlusRuns(
  region: 'world' | Exclude<RegionShortName, 'cn'>,
  page = 0,
  season?: SeasonReference,
  dungeon?: string,
  affixes?: string
): Resource<ViewMythicPlusRunsResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/runs`,
    query: {
      affixes,
      dungeon,
      page,
      region: region.toString(),
      season
    }
  }
}

// ==================================================

/**
 * @param season The season slug (e.g. "season-tww-4"). Optional, if not provided, the score tiers for the current season will be returned.
 * @returns the colors used for score tiers in the given season. See {@link ViewMythicPlusScoreTiersResponse}
 */
export function mythicPlusScoreTiers(
  season: SeasonReference = 'current'
): Resource<ViewMythicPlusScoreTiersResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/score-tiers`,
    query: { season }
  }
}

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param season The season slug (e.g. "season-tww-4"). Optional, if not provided, the cutoffs for the current season will be returned.
 * @returns the Mythic+ Season cutoffs for a region. See {@link ViewMythicPlusSeasonCutoffsResponse}
 */
export function mythicPlusSeasonCutoffs(
  region: RegionShortName,
  season: SeasonReference = 'current'
): Resource<ViewMythicPlusSeasonCutoffsResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/season-cutoffs`,
    query: { region, season }
  }
}

// ==================================================

/**
 * @param expansionId The expansion ID (e.g. 9 for Shadowlands).
 * @returns mythic plus season and dungeon static data for a specific expansion (slugs, names, etc.). See {@link ViewMythicPlusStaticDataResponse}
 */
export function mythicPlusStaticData(
  expansionId: ExpansionId
): Resource<ViewMythicPlusStaticDataResponse> {
  return {
    apiVersion: 1,
    path: `${mythicPlusBasePath}/static-data`,
    query: { expansion_id: expansionId }
  }
}

// ==================================================

/**
 * @param region The region (us, eu, kr, tw or world).
 * @param playableClass Class to filter (must be slugged)
 * @param playableSpec Spec to filter (must be slugged)
 * @param page Page to display (defaults to 0)
 * @param pageSize Items per page (defaults to 100)
 * @param season The season slug (e.g. "season-tww-4").
 * @returns mythic plus spec rankings. See {@link ViewMythicPlusSpecRankingsResponse}
 */
export function mythicPlusSpecRankings(
  region: RegionShortName | 'world',
  playableClass: string,
  playableSpec: string,
  page: number = 0,
  pageSize: number = 100,
  season: SeasonSlug
): Resource<ViewMythicPlusSpecRankingsResponse> {
  return {
    apiVersion: null,
    path: `${mythicPlusBasePath}/rankings/specs`,
    query: {
      region: region,
      class: playableClass,
      spec: playableSpec,
      season: season,
      page: page.toString(),
      pageSize: pageSize.toString()
    }
  }
}
