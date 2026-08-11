import { describe, expect, test } from 'vitest'
import { guildBossKill, guildProfile } from './guild'

describe('guild boss kill', () => {
  test('builds a resource with the correct path and api version', () => {
    const resource = guildBossKill(
      'US',
      'Illidan',
      'Liquid',
      'tier-mn-1',
      'Voracius',
      'mythic'
    )

    expect(resource.path).toBe('/guilds/boss-kill')
    expect(resource.apiVersion).toBe(1)
  })

  // ==================================================

  test('includes region, realm, guild name, raid, boss name and difficulty in the query', () => {
    const resource = guildBossKill(
      'US',
      'Illidan',
      'Liquid',
      'tier-mn-1',
      'Voracius',
      'mythic'
    )

    expect(resource.query).toMatchObject({
      region: 'US',
      realm: 'Illidan',
      guild: 'Liquid',
      raid: 'tier-mn-1',
      boss: 'Voracius',
      difficulty: 'mythic'
    })
  })
})

describe('guild profile', () => {
  test('builds a resource with the correct path and api version', () => {
    const resource = guildProfile('us', 'Illidan', 'Liquid')

    expect(resource.path).toBe('/guilds/profile')
    expect(resource.apiVersion).toBe(1)
  })

  // ==================================================

  test('includes region, realm and guild name in the query', () => {
    const resource = guildProfile('US', 'Illidan', 'Liquid')

    expect(resource.query).toMatchObject({
      region: 'US',
      realm: 'Illidan',
      name: 'Liquid'
    })
  })

  // ==================================================

  test('omits the fields param when no fields are requested', () => {
    const resource = guildProfile('US', 'Illidan', 'Liquid')

    expect(resource.query.fields).toBeUndefined()
  })
})
