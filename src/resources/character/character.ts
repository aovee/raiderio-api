import type { Resource } from '../../core'
import type {
  CharacterProfileFieldKey,
  ViewCharacterProfileResponse
} from './types'

// ==================================================

const charactersBasePath = '/characters'

// ==================================================

/**
 * @param region The region (us, eu, kr or tw).
 * @param realm The realm (can be formatted as "Altar of Storms" or "altar-of-storms").
 * @param name The character name.
 * @param fields The fields to include in the response. If not provided, only the basic profile information will be returned.
 * @returns information about a character. See {@link ViewCharacterProfileResponse}
 */
export function characterProfile(
  region: string,
  realm: string,
  name: string,
  fields?: Array<CharacterProfileFieldKey> // to improve
): Resource<ViewCharacterProfileResponse> {
  return {
    apiVersion: 1,
    path: `${charactersBasePath}/profile`,
    query: {
      fields: fields?.join(','),
      name,
      realm,
      region
    }
  }
}
