import ky from 'ky'
import type { Resource, ResourceResponse } from '../core'
import { raiderIoBasePath } from '../core'
import type { ClientOptions } from './types'

/**
 * Low-level HTTP layer for the Raider.io API.
 *
 * Turns a {@link Resource} (a `path` + `query` description produced by the
 * resource builders) into an actual HTTP request and returns the parsed JSON.
 * Most consumers should use the higher-level `RaiderioClient` instead.
 */
export class HttpClient {
  public defaults: {
    key?: string
  }

  private ky

  constructor(options: ClientOptions = {}) {
    this.defaults = {
      key: options.key
    }
    this.ky = ky.create(options.kyOptions)
  }

  /**
   * Build the absolute request URL for a resource.
   * @param resource The resource to fetch. See {@link Resource}.
   * @returns The fully-qualified request URL.
   */
  public getRequestUrl<T>(resource: Resource<T>): string {
    const version = resource.apiVersion ? `v${resource.apiVersion}` : ''
    const slashSeparator = resource.path.startsWith('/')
      ? version
      : version + '/'

    return `${raiderIoBasePath}${slashSeparator}${resource.path}`
  }

  /**
   * Send a request to the Raider.io API.
   * @param resource The resource to fetch. See {@link Resource}.
   * @param options Per-request overrides (api key, ky options). See {@link ClientOptions}.
   * @returns The parsed JSON response. See {@link ResourceResponse}.
   */
  public async request<T>(
    resource: Resource<T>,
    options?: Partial<ClientOptions>
  ): ResourceResponse<T> {
    const url = this.getRequestUrl(resource)

    // Drop undefined values so optional params never leak into the URL.
    const searchParameters: Record<string, boolean | number | string> = {}
    for (const [key, value] of Object.entries(resource.query)) {
      if (value !== undefined) {
        searchParameters[key] = value
      }
    }

    const apiKey = options?.key ?? this.defaults.key
    if (apiKey) {
      searchParameters.api_key = apiKey
    }

    const response = await this.ky.get<T>(url, {
      ...options?.kyOptions,
      searchParams: searchParameters
    })

    return response.json()
  }
}
