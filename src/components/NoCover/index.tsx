import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Gradient } from '~/components/Gradient'
import type { IconProps } from '~/components/new/icon'
import { Icon } from '~/components/new/icon'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

type NoCoverProps = {
  icon: IconProps['name']
  opacity?: number
  size?: number
  withGradient?: boolean
}

export function NoCover({ icon, opacity = 0.3, size = 100, withGradient }: NoCoverProps) {
  return (
    <>
      <View style={[styles.wrapper, globalStyles.absoluteFill, { opacity }]}>
        <Icon name={icon} size={size} />
      </View>
      {withGradient && <Gradient style={{ opacity }} />}
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors.ahead,
    justifyContent: 'center',
  },
})
