import type { ExpansionId, Realm, RegionShortName, Resource } from '../../core'
import type {
  RaidDifficulty,
  RaidInstance,
  ViewBossRankingsResponse,
  ViewHallOfFameResponse,
  ViewRaidingStaticDataResponse,
  ViewRaidProgressionResponse,
  ViewRaidRankingsResponse
} from './types'

// ==================================================

const raidingBasePath = '/raiding'

// ==================================================

/**
 * @param raid The raid instance to retrieve boss rankings for.
 * @param boss The boss slug to retrieve rankings for (e.g. "sire-denathrius").
 * @param difficulty The raid difficulty to retrieve rankings for (e.g. "mythic").
 * @param region The region to retrieve rankings for (us, eu, kr or tw).
 * @param realm  The realm slug to retrieve rankings for (e.g. "area-52"). Optional, if not provided rankings for all realms in the specified region will be returned.
 * @returns the rankings for the specified boss, raid, difficulty and region. See {@link ViewBossRankingsResponse}
 */
export function raidingBossRankings(
  raid: RaidInstance,
  boss: string,
  difficulty: RaidDifficulty,
  region: RegionShortName,
  realm?: null | Realm['slug']
): Resource<ViewBossRankingsResponse> {
  return {
    path: `${raidingBasePath}/boss-rankings`,
    query: {
      boss,
      difficulty,
      raid,
      realm: realm ?? undefined,
      region
    }
  }
}

// ==================================================

/**
 * @param raid The raid instance to retrieve boss rankings for.
 * @param difficulty The raid difficulty to retrieve rankings for (e.g. "mythic").
 * @param region The region to retrieve rankings for (us, eu, kr or tw).
 * @returns the hall of fame for a given raid. See {@link ViewHallOfFameResponse}
 */
export function raidingHallOfFame(
  raid: RaidInstance,
  difficulty: RaidDifficulty,
  region: RegionShortName
): Resource<ViewHallOfFameResponse> {
  return {
    path: `${raidingBasePath}/hall-of-fame`,
    query: {
      difficulty,
      raid,
      region
    }
  }
}

// ==================================================

/**
 * @param raid The raid instance to retrieve progression for.
 * @param difficulty The raid difficulty to retrieve progression for (e.g. "mythic").
 * @param region The region to retrieve progression for (us, eu, kr or tw).
 * @returns the raid progression for a given raid. See {@link ViewRaidProgressionResponse}
 */
export function raidingProgression(
  raid: RaidInstance,
  difficulty: RaidDifficulty,
  region: RegionShortName
): Resource<ViewRaidProgressionResponse> {
  return {
    path: `${raidingBasePath}/progression`,
    query: {
      difficulty,
      raid,
      region
    }
  }
}

// ==================================================

/**
 * @param raid The raid instance to retrieve rankings for.
 * @param difficulty The raid difficulty to retrieve rankings for (e.g. "mythic").
 * @param region The region to retrieve rankings for (us, eu, kr or tw).
 * @param realm  The realm slug to retrieve rankings for (e.g. "area-52"). Optional, if not provided rankings for all realms in the specified region will be returned.
 * @param guilds A comma-separated list of guild names to filter the rankings by (e.g. "guild1,guild2"). Optional, if not provided rankings for all guilds will be returned.
 * @param limit The number of results to return per page. Default is 50.
 * @param page The page number to return (starting from 0). Default is 0.
 * @returns the raid rankings for a given raid and region. See {@link ViewRaidRankingsResponse}
 */
export function raidingRaidRankings(
  raid: RaidInstance,
  difficulty: RaidDifficulty,
  region: RegionShortName,
  realm: null | string,
  guilds = '',
  limit = 50,
  page = 0
): Resource<ViewRaidRankingsResponse> {
  return {
    path: `${raidingBasePath}/raid-rankings`,
    query: {
      difficulty,
      guilds: guilds || undefined,
      limit,
      page,
      raid,
      realm: realm ?? undefined,
      region
    }
  }
}

// ==================================================

/**
 * @param expansionId The expansion ID (e.g. 9 for Shadowlands).
 * @returns raid and biss static data for a specific expansion (slugs, names, etc). See {@link ViewRaidingStaticDataResponse}
 */
export function raidingStaticData(
  expansionId: ExpansionId
): Resource<ViewRaidingStaticDataResponse> {
  return {
    path: `${raidingBasePath}/static-data`,
    query: { expansion_id: expansionId }
  }
}
