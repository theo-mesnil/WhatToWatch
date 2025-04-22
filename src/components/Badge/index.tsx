import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Icon, type IconElement } from '~/components/Icon'
import { Text } from '~/components/Text'
import { theme } from '~/theme'

export type BadgeProps = {
  children: React.ReactNode
  icon?: IconElement
  testID?: string
}

export function Badge({ children, icon, testID }: BadgeProps) {
  return (
    <View style={styles.wrapper} testID={testID}>
      {icon && <Icon icon={icon} size={13} />}
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors['default-700'],
    borderRadius: theme.radii.xs,
    flexDirection: 'row',
    gap: 2,
    paddingHorizontal: theme.space.xs,
    paddingVertical: theme.space.xxs,
  },
})
