import type { Resource } from './core'
import { HttpClient } from './http/http'
import type { ClientOptions } from './http/types'
import { characterProfile } from './resources/character/character'
import { periods } from './resources/general/general'
import { guildBossKill, guildProfile } from './resources/guild/guild'
import {
  mythicPlusAffixes,
  mythicPlusLeaderboardCapacity,
  mythicPlusRunDetails,
  mythicPlusRuns,
  mythicPlusScoreTiers,
  mythicPlusSeasonCutoffs,
  mythicPlusStaticData
} from './resources/mythic-plus/mythic-plus'
import {
  raidingBossRankings,
  raidingHallOfFame,
  raidingProgression,
  raidingRaidRankings,
  raidingStaticData
} from './resources/raiding/raiding'

/**
 * A client for the Raider.io API.
 *
 * Endpoints are grouped by area (`character`, `general`, `guild`, `mythicPlus`,
 * `raiding`) and each method returns the parsed, fully-typed response. The
 * underlying resource builder is linked from each group for full parameter docs.
 * @example
 * ```ts
 * const client = new RaiderioClient();
 * const profile = await client.character.profile("eu", "ysondre", "melestra", [
 *   "gear",
 *   "mythic_plus_scores_by_season",
 * ]);
 * ```
 */
export class RaiderioClient {
  private readonly http: HttpClient

  constructor(options: ClientOptions = {}) {
    this.http = new HttpClient(options)
  }

  /** Character endpoints. See {@link characterProfile}. */
  public readonly character = {
    profile: (...parameters: Parameters<typeof characterProfile>) =>
      this.http.request(characterProfile(...parameters))
  }

  /** General endpoints. See {@link periods}. */
  public readonly general = {
    periods: (...parameters: Parameters<typeof periods>) =>
      this.http.request(periods(...parameters))
  }

  /** Guild endpoints. See {@link guildBossKill} and {@link guildProfile}. */
  public readonly guild = {
    bossKill: (...parameters: Parameters<typeof guildBossKill>) =>
      this.http.request(guildBossKill(...parameters)),
    profile: (...parameters: Parameters<typeof guildProfile>) =>
      this.http.request(guildProfile(...parameters))
  }

  /** Mythic+ endpoints. */
  public readonly mythicPlus = {
    affixes: (...parameters: Parameters<typeof mythicPlusAffixes>) =>
      this.http.request(mythicPlusAffixes(...parameters)),
    leaderboardCapacity: (
      ...parameters: Parameters<typeof mythicPlusLeaderboardCapacity>
    ) => this.http.request(mythicPlusLeaderboardCapacity(...parameters)),
    runDetails: (...parameters: Parameters<typeof mythicPlusRunDetails>) =>
      this.http.request(mythicPlusRunDetails(...parameters)),
    runs: (...parameters: Parameters<typeof mythicPlusRuns>) =>
      this.http.request(mythicPlusRuns(...parameters)),
    scoreTiers: (...parameters: Parameters<typeof mythicPlusScoreTiers>) =>
      this.http.request(mythicPlusScoreTiers(...parameters)),
    seasonCutoffs: (
      ...parameters: Parameters<typeof mythicPlusSeasonCutoffs>
    ) => this.http.request(mythicPlusSeasonCutoffs(...parameters)),
    staticData: (...parameters: Parameters<typeof mythicPlusStaticData>) =>
      this.http.request(mythicPlusStaticData(...parameters))
  }

  /** Raiding endpoints. */
  public readonly raiding = {
    bossRankings: (...parameters: Parameters<typeof raidingBossRankings>) =>
      this.http.request(raidingBossRankings(...parameters)),
    hallOfFame: (...parameters: Parameters<typeof raidingHallOfFame>) =>
      this.http.request(raidingHallOfFame(...parameters)),
    progression: (...parameters: Parameters<typeof raidingProgression>) =>
      this.http.request(raidingProgression(...parameters)),
    raidRankings: (...parameters: Parameters<typeof raidingRaidRankings>) =>
      this.http.request(raidingRaidRankings(...parameters)),
    staticData: (...parameters: Parameters<typeof raidingStaticData>) =>
      this.http.request(raidingStaticData(...parameters))
  }

  /**
   * Escape hatch: send any {@link Resource} through the client. Useful for
   * resources built by hand or not yet covered by a dedicated method.
   * @param resource The resource to fetch.
   * @param options Per-request overrides (api key, ky options).
   * @returns The parsed, typed response.
   */
  public request<T>(resource: Resource<T>, options?: Partial<ClientOptions>) {
    return this.http.request(resource, options)
  }
}

/**
 * Create a new {@link RaiderioClient}.
 * @param options Client options. See {@link ClientOptions}.
 * @returns A new Raider.io API client.
 */
export const createRaiderioClient = (
  options: ClientOptions = {}
): RaiderioClient => new RaiderioClient(options)
