import type { Resource } from '../../core'
import type { RaidDifficulty } from '../raiding/types'
import type {
  GuildProfileFieldKey,
  ViewGuildBossKillResponse,
  ViewGuildProfileResponse
} from './types'

// ==================================================

const guildsBasePath = '/guilds'

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param realm The realm (can be formatted as "Altar of Storms" or "altar-of-storms").
 * @param guild The guild name.
 * @param raid The raid instance slug (e.g. "castle-nathria").
 * @param boss The boss slug (e.g. "sire-denathrius").
 * @param difficulty The raid difficulty (e.g. "mythic").
 * @returns information about a guild boss kill. See {@link ViewGuildBossKillResponse}
 */
export function guildBossKill(
  region: string,
  realm: string,
  guild: string,
  raid: string,
  boss: string,
  difficulty: RaidDifficulty
): Resource<ViewGuildBossKillResponse> {
  return {
    path: `${guildsBasePath}/boss-kill`,
    query: {
      boss,
      difficulty,
      guild,
      raid,
      realm,
      region
    }
  }
}

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param realm The realm (can be formatted as "Altar of Storms" or "altar-of-storms").
 * @param name The guild name.
 * @param fields The fields to include in the response. If not provided, only the basic profile information will be returned.
 * @returns Profile information about the guild, including optional fields. See {@link ViewGuildProfileResponse}
 */
export function guildProfile(
  region: string,
  realm: string,
  name: string,
  fields?: Array<GuildProfileFieldKey> // to improve
): Resource<ViewGuildProfileResponse> {
  return {
    path: `${guildsBasePath}/profile`,
    query: {
      fields: fields?.join(','),
      name,
      realm,
      region
    }
  }
}
