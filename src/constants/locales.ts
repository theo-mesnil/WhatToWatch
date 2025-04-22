import { getLocales } from 'expo-localization'

export type Locale = 'en' | 'fr'
export type LocaleI18n = 'en-US' | 'fr-FR'

const LANGUAGE_CODE = getLocales()[0].languageCode
export const REGION_CODE = getLocales()[0].regionCode
export const LOCALE: Locale = LANGUAGE_CODE === 'fr' ? 'fr' : 'en'
export const LOCALE_I18N: LocaleI18n = LANGUAGE_CODE === 'fr' ? 'fr-FR' : 'en-US'
