import { INITIAL_LOCALE, LOCALE_AUTO } from 'constants/locales';

import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

import { getLocale } from 'utils/locales';

export const STORAGE_LOCALE = 'WHATTOWATCH_LOCALE';

type LocaleContextInterface = {
  locale: 'fr' | 'en';
  setLocaleEntry: React.Dispatch<React.SetStateAction<string>>;
  localeEntry: string;
};

export const LocaleContext = React.createContext<LocaleContextInterface>(null);

export function LocaleProvider({ children }) {
  const [localeEntry, setLocaleEntry] = React.useState(LOCALE_AUTO);

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_LOCALE).then((value) => {
      if (value) {
        setLocaleEntry(value);
      }
    });
  }, []);

  React.useEffect(() => {
    if (localeEntry !== INITIAL_LOCALE) {
      AsyncStorage.setItem(STORAGE_LOCALE, `${localeEntry}`);
    }
  }, [localeEntry]);

  const locale = useMemo(() => getLocale(localeEntry), [localeEntry]);

  return (
    <LocaleContext.Provider value={{ locale, setLocaleEntry, localeEntry }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return React.useContext(LocaleContext);
}
