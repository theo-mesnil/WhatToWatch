import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Icon, type IconElement } from 'components/Icon'
import { Text } from 'components/Text'
import { theme } from 'theme'

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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors['default-700'],
    borderRadius: theme.radii.xs,
    paddingVertical: theme.space.xxs,
    paddingHorizontal: theme.space.xs,
    gap: 2,
  },
  text: {
    color: theme.colors.white,
  },
})
