import * as React from 'react'
import { View } from 'react-native'

import { NetworkLogo } from '~/components/new/network-logo'
import { getNetworkBackgroundClassName } from '~/constants/networks'
import type { NetworkId } from '~/types/content'

export type NetworkThumbProps = {
  aspectRatio?: number
  id: NetworkId
  variant?: 'colored' | 'minimalist'
}

export const NetworkThumb = ({
  aspectRatio = 2 / 3,
  id,
  variant = 'colored',
}: NetworkThumbProps) => {
  const isMinimalist = variant === 'minimalist'
  const backgroundNetworkColor = !isMinimalist && id ? getNetworkBackgroundClassName(id) : ''

  return (
    <View
      className={`rounded-sm overflow-hidden ${isMinimalist && 'rounded-[200px] bg-neutral-500'} ${backgroundNetworkColor}`}
    >
      <View
        className="items-center justify-center"
        style={[
          {
            aspectRatio: isMinimalist ? 1 / 1 : aspectRatio,
          },
        ]}
      >
        <NetworkLogo id={id} width="70%" />
      </View>
    </View>
  )
}
