import * as Localization from 'expo-localization';

export const LOCALE_AUTO = 'auto';
export const LOCALE_EN = 'en';
export const LOCALE_FR = 'fr';
export const LOCALES = [LOCALE_EN, LOCALE_FR];
export const DEFAULT_LOCALE = LOCALE_EN;
export const INITIAL_LOCALE = Localization.locale
  ?.substring(0, 2)
  ?.toLowerCase();
