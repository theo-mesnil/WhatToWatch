import * as React from 'react'
import { View } from 'react-native'

import { NetworkLogo } from '~/components/network-logo'
import type { NetworkId } from '~/types/content'
import { getNetworkBackgroundClassName } from '~/utils/networks'

type NetworkThumbProps = {
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
      className={`rounded-sm overflow-hidden ${isMinimalist && 'rounded-[200px] bg-violet-900'} ${backgroundNetworkColor}`}
    >
      <View
        className={`absolute inset-0 border border-white/20 z-1 ${isMinimalist ? 'rounded-[200px]' : 'rounded-sm'}`}
      />
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
