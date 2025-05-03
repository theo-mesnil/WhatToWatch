import { StyleSheet, View } from 'react-native'

import { theme } from '~/theme'

import type { IconProps } from '../Icon'
import { Icon } from '../Icon'
import { Text } from '../Text'

type EmptyProps = {
  children: React.ReactNode
  icon: IconProps['name']
}

export function Empty({ children, icon }: EmptyProps) {
  return (
    <View style={styles.empty}>
      <Icon color="brand-500" name={icon} size={40} />
      <Text variant="lg">{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    backgroundColor: theme.colors.ahead,
    borderRadius: theme.radii.md,
    gap: theme.space.md,
    justifyContent: 'center',
    padding: theme.space.xl,
  },
})
