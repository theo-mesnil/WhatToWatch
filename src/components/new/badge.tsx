import * as React from 'react'
import { View } from 'react-native'

import { Icon } from '~/components/new/icon'
import type { IconProps } from '~/components/new/icon'
import { Text } from '~/components/new/text'

export type BadgeProps = {
  children: React.ReactNode
  icon?: IconProps['name']
  testID?: string
}

export function Badge({ children, icon, testID }: BadgeProps) {
  return (
    <View
      className="items-center bg-neutral-700 rounded-xs flex-row gap-0.5 px-1.5 py-1"
      testID={testID}
    >
      {icon && <Icon name={icon} size={13} />}
      <Text className="text-text-maximal">{children}</Text>
    </View>
  )
}
