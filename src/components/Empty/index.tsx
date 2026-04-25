import { StyleSheet, View } from 'react-native'

import type { IconProps } from '~/components/new/icon'
import { Icon } from '~/components/new/icon'
import { Text } from '~/components/new/text'
import { theme } from '~/theme'

type EmptyProps = {
  children: React.ReactNode
  icon: IconProps['name']
}

export function Empty({ children, icon }: EmptyProps) {
  return (
    <View style={styles.empty}>
      <Icon className="text-violet-500" name={icon} size={40} />
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
