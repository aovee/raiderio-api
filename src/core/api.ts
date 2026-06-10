export const raiderIoBasePath = 'https://raider.io/api/v1'

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type ISODateString = string

export interface Resource<T> {
  /**
   * The response type of the resource
   * @internal
   */
  _responseType?: T
  path: string
  query: Record<string, boolean | number | string | undefined>
}

export type ResourceResponse<T = unknown> = Promise<T>
