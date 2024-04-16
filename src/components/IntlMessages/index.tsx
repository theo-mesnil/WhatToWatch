import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { LOCALE } from 'constants/locales';

import en from './en';
import fr from './fr';

function flattenMessages(nestedMessages: Record<string, unknown>, prefix = '') {
  return Object.keys(nestedMessages).reduce(
    (messages, key) => {
      let value = nestedMessages[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(
          messages,
          flattenMessages(value as Record<string, unknown>, prefixedKey)
        );
      }

      return messages;
    },
    {} as Record<string, string>
  );
}

export function IntlMessages({ children }: { children: JSX.Element }) {
  const locales = { en, fr };
  const localeMessages = locales[LOCALE];

  return (
    // @ts-ignore
    <IntlProvider
      key={LOCALE}
      locale={LOCALE}
      messages={localeMessages && flattenMessages(localeMessages)}
    >
      {children}
    </IntlProvider>
  );
}
