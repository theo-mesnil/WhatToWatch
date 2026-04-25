import * as React from 'react'
import { useIntl } from 'react-intl'

import { LoginWithDescription } from '~/components/login-with-description'
import { useAuth } from '~/contexts/Auth'
import { TabsLayout } from '~/layouts/tabs'
import { Logged } from '~/screens/logged'

export default function Discover() {
  const intl = useIntl()
  const { accountId } = useAuth()

  return (
    <TabsLayout title={intl.formatMessage({ defaultMessage: 'My lists', id: 'n82YXC' })}>
      {!accountId && <LoginWithDescription />}
      {accountId && <Logged />}
    </TabsLayout>
  )
}
