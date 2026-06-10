import type { Resource } from '../../core'
import type { ViewPeriodsResponse, ViewSearchResponse } from './types'

// ==================================================

/**
 * @returns current, previous and next period ids and data ranges. See {@link ViewPeriodsResponse}
 */
export function periods(): Resource<ViewPeriodsResponse> {
  return {
    apiVersion: 1,
    path: '/periods',
    query: {}
  }
}

// ==================================================

/**
 * @param searchTerm The term to search
 * @returns list of characters and/or guilds matching the searched term. See {@link ViewSearchResponse}
 */
export function search(searchTerm: string): Resource<ViewSearchResponse> {
  return {
    apiVersion: null,
    path: '/search',
    query: {
      term: searchTerm
    }
  }
}
