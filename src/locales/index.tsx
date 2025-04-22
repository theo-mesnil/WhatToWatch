import * as React from 'react'
import { IntlProvider } from 'react-intl'

import { LOCALE } from 'constants/locales'

import en from './en-US.json'
import fr from './fr-FR.json'

export function IntlMessages({ children }: { children: JSX.Element }) {
  const locales = { en, fr }
  const localeMessages = locales[LOCALE]

  return (
    <IntlProvider key={LOCALE} locale={LOCALE} messages={localeMessages} onError={() => null}>
      {children}
    </IntlProvider>
  )
}
