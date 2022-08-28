import {
  DEFAULT_LOCALE,
  INITIAL_LOCALE,
  LOCALE_AUTO,
  LOCALES
} from 'constants/locales';

export function getLocale(locale: LocaleLanguage) {
  if (locale === LOCALE_AUTO) {
    return LOCALES.includes(INITIAL_LOCALE) ? INITIAL_LOCALE : DEFAULT_LOCALE;
  }

  return LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}
