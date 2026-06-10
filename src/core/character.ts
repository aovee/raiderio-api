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
  faction: Faction
  id: number
  name: string
  slug: string
}

export interface Specialization {
  class_id: number
  id: number
  is_melee: boolean
  name: string
  ordinal: number
  patch: string
  role: Role
  slug: string
}
