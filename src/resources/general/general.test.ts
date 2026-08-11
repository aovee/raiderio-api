import { describe, expect, test } from 'vitest'
import { periods, search } from './general'

describe('search', () => {
  test('builds a resource for the given search term', () => {
    const term = 'melestra'
    const resource = search(term)

    expect(resource).toEqual({
      apiVersion: null,
      path: '/search',
      query: { term }
    })
  })
})

describe('periods', () => {
  test('builds a resource with an empty query', () => {
    const resource = periods()

    expect(resource.path).toBe('/periods')
    expect(resource.apiVersion).toBe(1)
    expect(resource.query).toEqual({})
  })
})
