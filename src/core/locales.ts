export const locales = [
  'en',
  'ru',
  'ko',
  'cn',
  'pt',
  'it',
  'fr',
  'es',
  'de',
  'tw'
] as const
export type Locale = (typeof locales)[number]
export type LocalizedString = Record<Locale, string>
