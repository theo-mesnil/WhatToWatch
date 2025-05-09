import type { MaskedViewProps } from '@react-native-masked-view/masked-view'
import MaskedView from '@react-native-masked-view/masked-view'
import type { LinearGradientProps } from 'expo-linear-gradient'
import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import { StyleSheet } from 'react-native'

import { Text } from '~/components/Text'
import type { TextProps } from '~/components/Text'
import { theme } from '~/theme'

export type TextGradientProps = {
  children: React.ReactNode
  colors?: LinearGradientProps['colors']
  style?: MaskedViewProps['style']
  variant?: TextProps['variant']
}

export const TextGradient = ({
  children,
  colors = ['transparent', theme.colors.behind],
  style,
  variant,
}: TextGradientProps) => {
  return (
    <MaskedView maskElement={<Text variant={variant}>{children}</Text>} style={style}>
      <LinearGradient colors={colors} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }}>
        <Text style={styles.hiddenTitle} variant={variant}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  hiddenTitle: {
    opacity: 0,
  },
})
