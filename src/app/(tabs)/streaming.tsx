import * as React from 'react'
import { useIntl } from 'react-intl'
import { View } from 'react-native'

import { NetworkList } from '~/components/app/streaming/NetworkList'
import { networksList } from '~/constants/networks'
import { TabsLayout } from '~/layouts/tabs'
import { theme } from '~/theme'

export default function Networks() {
  const intl = useIntl()

  return (
    <TabsLayout title={intl.formatMessage({ defaultMessage: 'Streaming', id: 'NCupKV' })}>
      <View style={{ gap: theme.space.lg }}>
        {networksList.map(network => (
          <NetworkList id={network.id} key={network.slug} />
        ))}
      </View>
    </TabsLayout>
  )
}
