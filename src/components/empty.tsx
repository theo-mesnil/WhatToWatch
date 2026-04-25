import { View } from 'react-native'

import type { IconProps } from '~/components/icon'
import { Icon } from '~/components/icon'
import { Text } from '~/components/text'

type EmptyProps = {
  children: React.ReactNode
  icon: IconProps['name']
}

export function Empty({ children, icon }: EmptyProps) {
  return (
    <View className="items-center justify-center bg-foreground rounded-xl gap-3 p-6">
      <Icon className="text-violet-500" name={icon} size={40} />
      <Text variant="lg">{children}</Text>
    </View>
  )
}
