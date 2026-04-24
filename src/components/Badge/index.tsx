import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Icon, type IconProps } from '~/components/Icon'
import { Text } from '~/components/new/text'
import { theme } from '~/theme'

export type BadgeProps = {
  children: React.ReactNode
  icon?: IconProps['name']
  testID?: string
}

export function Badge({ children, icon, testID }: BadgeProps) {
  return (
    <View style={styles.wrapper} testID={testID}>
      {icon && <Icon name={icon} size={13} />}
      <Text className="text-text-maximal">{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
