import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Gradient } from 'components/Gradient'
import { NetworkLogo } from 'components/NetworkLogo'
import { theme } from 'theme'
import type { NetworkId } from 'types/content'
import { getNetworkColor } from 'utils/networks'

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

  return (
    <View style={[styles.wrapper, isMinimalist ? styles.minimalist : undefined]}>
      <Gradient colors={getNetworkColor(!isMinimalist ? id : undefined)} />
      <View
        style={[
          styles.icon,
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

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.sm,
    overflow: 'hidden',
  },
  minimalist: {
    borderRadius: 200,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
