import type { Resource } from '../../core'
import type { ViewPeriodsResponse } from './types'

// ==================================================

/**
 * @returns current, previous and next period ids and data ranges. See {@link ViewPeriodsResponse}
 */
export function periods(): Resource<ViewPeriodsResponse> {
  return {
    path: '/periods',
    query: {}
  }
}
