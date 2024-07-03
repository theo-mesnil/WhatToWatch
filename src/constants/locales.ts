import { getLocales } from 'expo-localization';

const LANGUAGE_CODE = getLocales()[0].languageCode;
export const REGION_CODE = getLocales()[0].regionCode;
export const LOCALE = LANGUAGE_CODE === 'fr' ? 'fr' : 'en';
export const LOCALE_I18N = LANGUAGE_CODE === 'fr' ? 'fr-FR' : 'fr-FR';

export type Locale = 'en' | 'fr';
export type LocaleI18n = 'fr-FR' | 'fr-FR';
