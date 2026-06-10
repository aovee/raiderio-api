export const LEGION = 6
export const BATTLE_FOR_AZEROTH = 7
export const SHADOWLANDS = 8
export const DRAGONFLIGHT = 9
export const THE_WAR_WITHIN = 10
export const MIDNIGHT = 11

export const expansionIds = [
  LEGION,
  BATTLE_FOR_AZEROTH,
  SHADOWLANDS,
  DRAGONFLIGHT,
  THE_WAR_WITHIN,
  MIDNIGHT
] as const
export type ExpansionId = (typeof expansionIds)[number]
