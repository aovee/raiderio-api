import { describe, expect, test } from 'vitest'
import { characterProfile } from './character'
import type { CharacterProfileFieldKey } from './types'

describe('character profile', () => {
  test('builds a resource with the correct path and api version', () => {
    const resource = characterProfile('US', 'Stormrage', 'Thrall')

    expect(resource.path).toBe('/characters/profile')
    expect(resource.apiVersion).toBe(1)
  })

  // ==================================================

  test('includes region, realm, and name in the query', () => {
    const resource = characterProfile('EU', 'Ysondre', 'Melestra')

    expect(resource.query).toMatchObject({
      region: 'EU',
      realm: 'Ysondre',
      name: 'Melestra'
    })
  })

  // ==================================================

  test('omits the fields param when no fields are requested', () => {
    const resource = characterProfile('US', 'Stormrage', 'Thrall')

    expect(resource.query.fields).toBeUndefined()
  })

  // ==================================================

  test('serializes a single field into the query', () => {
    const resource = characterProfile('US', 'Stormrage', 'Thrall', ['guild'])

    expect(resource.query.fields).toBe('guild')
  })

  // ==================================================

  test('joins multiple fields with a comma', () => {
    const fields: CharacterProfileFieldKey[] = [
      'gear',
      'guild',
      'mythic_plus_scores_by_season',
      'mythic_plus_ranks'
    ]
    const resource = characterProfile('US', 'Stormrage', 'Thrall', fields)

    expect(resource.query.fields).toBe(
      'gear,guild,mythic_plus_scores_by_season,mythic_plus_ranks'
    )
  })

  // ==================================================

  test('supports season-scoped field keys', () => {
    const resource = characterProfile('US', 'Stormrage', 'Thrall', [
      'mythic_plus_scores_by_season:season-tww-2'
    ])

    expect(resource.query.fields).toBe(
      'mythic_plus_scores_by_season:season-tww-2'
    )
  })

  // ==================================================

  test('supports raid achievement curve field keys', () => {
    const resource = characterProfile('US', 'Stormrage', 'Thrall', [
      'raid_achievement_curve:the-war-within-season-2'
    ])

    expect(resource.query.fields).toBe(
      'raid_achievement_curve:the-war-within-season-2'
    )
  })

  // ==================================================

  test('accepts realm names with spaces', () => {
    const resource = characterProfile('US', 'Altar of Storms', 'Thrall')

    expect(resource.query.realm).toBe('Altar of Storms')
  })

  // ==================================================

  test('accepts realm names in slug format', () => {
    const resource = characterProfile('US', 'altar-of-storms', 'Thrall')

    expect(resource.query.realm).toBe('altar-of-storms')
  })
})
