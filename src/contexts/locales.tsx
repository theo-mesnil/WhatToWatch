import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

import { INITIAL_LOCALE, LOCALE_AUTO } from 'constants/locales';
import { getLocale } from 'utils/locales';

export const STORAGE_LOCALE = 'WHATTOWATCH_LOCALE';

type LocaleContextInterface = {
  locale: LocaleLanguage;
  setLocaleEntry: React.Dispatch<React.SetStateAction<LocaleLanguage>>;
  localeEntry: LocaleLanguage;
};

export const LocaleContext = React.createContext<LocaleContextInterface>(null);

export function LocaleProvider({ children }) {
  const [localeEntry, setLocaleEntry] = React.useState(
    LOCALE_AUTO as LocaleLanguage
  );

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_LOCALE).then((value) => {
      if (value) {
        setLocaleEntry(value as LocaleLanguage);
      }
    });
  }, []);

  React.useEffect(() => {
    if (localeEntry !== INITIAL_LOCALE) {
      AsyncStorage.setItem(STORAGE_LOCALE, `${localeEntry}`);
    }
  }, [localeEntry]);

  const locale = React.useMemo(
    () => getLocale(localeEntry as LocaleLanguage),
    [localeEntry]
  ) as LocaleLanguage;

  return (
    <LocaleContext.Provider value={{ locale, setLocaleEntry, localeEntry }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return React.useContext(LocaleContext);
}
