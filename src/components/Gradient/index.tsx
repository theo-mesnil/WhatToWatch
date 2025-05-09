import type { LinearGradientProps } from 'expo-linear-gradient'
import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import type { ViewProps } from 'react-native'
import { View } from 'react-native'

import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export type GradientProps = ViewProps & {
  angle?: number
  colors?: LinearGradientProps['colors']
}

export function Gradient({
  angle,
  colors = ['transparent', theme.colors.behind],
  ...rest
}: GradientProps) {
  const end = angle ? [1, angle] : [0, 1]

  return (
    <View style={globalStyles.absoluteFill} {...rest}>
      <LinearGradient
        colors={colors}
        end={end as LinearGradientProps['end']}
        start={[0, 0]}
        style={globalStyles.absoluteFill}
      />
    </View>
  )
}
