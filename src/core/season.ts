export const seasonReferences = [
  'season-sl-1',
  'season-sl-2',
  'season-sl-3',
  'season-sl-4',
  'season-df-1',
  'season-df-2',
  'season-df-3',
  'season-df-4',
  'season-tww-1',
  'season-tww-2',
  'season-tww-3',
  'season-mn-1',
  'current',
  'previous'
]
export type SeasonReference = (typeof seasonReferences)[number]

export const weekScopes = ['current', 'previous'] as const
export type WeekScope = (typeof weekScopes)[number]
