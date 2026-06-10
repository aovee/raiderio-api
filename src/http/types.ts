import type { Options as KyOptions } from 'ky'

export interface ClientOptions {
  key?: string // The API key. Optional: the Raider.io API is public and most endpoints work without one.
  kyOptions?: KyOptions
}
