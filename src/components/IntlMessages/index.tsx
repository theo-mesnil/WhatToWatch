import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { useLocale } from 'contexts/locales';

import en from './en';
import fr from './fr';

function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

export function IntlMessages({ children }) {
  const { locale } = useLocale();
  const locales = { en, fr };
  const localeMessages = locales[locale];

  return (
    <IntlProvider
      key={locale}
      locale={locale}
      messages={localeMessages && flattenMessages(localeMessages)}
    >
      {children}
    </IntlProvider>
  );
}
