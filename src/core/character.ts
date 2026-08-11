export const roles = ['tank', 'healer', 'dps'] as const
export type Role = (typeof roles)[number]

export const factions = ['horde', 'alliance'] as const
export type Faction = (typeof factions)[number]

export const genders = ['male', 'female'] as const
export type Gender = (typeof genders)[number]

export interface PlayableClass {
  id: number
  name: string
  slug: string
}

export interface PlayableRace {
  id: number
  name: string
  slug: string
  faction: Faction
}

export interface Specialization {
  id: number
  name: string
  slug: string
  class_id: number
  role: Role
  is_melee: boolean
  patch: string
  ordinal: number
}
