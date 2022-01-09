import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

import { getLocale } from 'utils/locales';
import { INITIAL_LOCALE, LOCALE_AUTO } from 'constants/locales';

export const STORAGE_LOCALE = 'WHATTOWATCH_LOCALE';

export const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [localeEntry, setLocaleEntry] = useState(LOCALE_AUTO);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_LOCALE).then((value) => {
      if (value) {
        setLocaleEntry(value);
      }
    });
  }, []);

  useEffect(() => {
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
  return useContext(LocaleContext);
}
