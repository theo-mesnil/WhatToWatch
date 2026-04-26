import * as React from 'react'
import { useIntl } from 'react-intl'
import { View } from 'react-native'

import { networksList } from '~/constants/networks'
import { TabsLayout } from '~/layouts/tabs'
import { NetworkList } from '~/screens/(tabs)/streaming/components/network-list'

export default function Networks() {
  const intl = useIntl()

  return (
    <TabsLayout title={intl.formatMessage({ defaultMessage: 'Streaming', id: 'NCupKV' })}>
      <View className="gap-4">
        {networksList.map(network => (
          <NetworkList id={network.id} key={network.slug} />
        ))}
      </View>
    </TabsLayout>
  )
}
