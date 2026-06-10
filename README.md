# raiderio-api

A typed Node.js client and helpers for the [Raider.io API](https://raider.io/api).

- **Fully typed** — every endpoint returns a parsed, typed response.
- **Grouped by area** — `character`, `general`, `guild`, `mythicPlus`, `raiding`.
- **Tiny runtime** — built on [`ky`](https://github.com/sindresorhus/ky). ESM-only.
- **No API key required** — the Raider.io API is public; most endpoints work without one.

## Install

```sh
npm install raiderio-api
# or
pnpm add raiderio-api
```

> Requires Node.js `^20.19.0 || ^22.13.0 || >=24`. This package is **ESM-only**.

## Quick start

```ts
import { createRaiderioClient } from 'raiderio-api'

const client = createRaiderioClient()

const profile = await client.character.profile('eu', 'ysondre', 'melestra', [
  'gear',
  'mythic_plus_scores_by_season'
])

console.log(profile.name, profile.gear?.item_level_equipped)
```

You can also instantiate the class directly:

```ts
import { RaiderioClient } from 'raiderio-api'

const client = new RaiderioClient()
```

## Options

```ts
const client = createRaiderioClient({
  // Optional. Most endpoints are public and work without a key.
  key: process.env.RAIDERIO_API_KEY,
  // Optional. Forwarded to the underlying `ky` instance
  // (timeout, retry, hooks, custom fetch, etc.).
  kyOptions: {
    timeout: 10_000,
    retry: 2
  }
})
```

Per-request overrides are supported on the escape hatch (see below).

## Endpoints

Each method returns a `Promise` of the fully-typed response.

| Group        | Methods                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `character`  | `profile`                                                                                           |
| `general`    | `periods`                                                                                           |
| `guild`      | `bossKill`, `profile`                                                                               |
| `mythicPlus` | `affixes`, `leaderboardCapacity`, `runDetails`, `runs`, `scoreTiers`, `seasonCutoffs`, `staticData` |
| `raiding`    | `bossRankings`, `hallOfFame`, `progression`, `raidRankings`, `staticData`                           |

```ts
const affixes = await client.mythicPlus.affixes('us', 'en')
const periods = await client.general.periods()
const guild = await client.guild.profile('us', 'illidan', 'liquid', [
  'raid_progression'
])
```

## Advanced: resource builders + escape hatch

Every endpoint is backed by a standalone **resource builder** that returns a
`Resource` description (`path` + `query`). You can build one by hand and send it
through the client, with optional per-request overrides:

```ts
import { createRaiderioClient, characterProfile } from 'raiderio-api'

const client = createRaiderioClient()

const resource = characterProfile('eu', 'ysondre', 'melestra', ['gear'])
const profile = await client.request(resource, { key: 'per-request-key' })
```

The low-level `HttpClient` is also exported for fully custom setups.

## License

[MIT](./LICENSE)
