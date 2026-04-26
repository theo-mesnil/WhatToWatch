import { View } from 'react-native'

import { Icon } from '~/components/icon'
import { Text } from '~/components/text'

export type CreditNumberThumbProps = {
  number: number
  title: React.ReactElement
  type: 'movie' | 'tv'
}

export function CreditNumberThumb({ number, title, type }: CreditNumberThumbProps) {
  return (
    <View className="rounded-lg overflow-hidden" testID={`credits-${type}`}>
      <View className="absolute inset-O bg-linear-60 from-violet-800 to-foreground" />
      <View className="items-center flex-row">
        <View className="-ml-7.5 mr-1.5 opacity-40">
          <Icon name={type === 'movie' ? 'film' : 'tv'} size={80} />
        </View>
        <View>
          <Text className="-mt-1.5" variant="h0">
            {number}
          </Text>
          <Text className="uppercase" variant="h2">
            {title}
          </Text>
        </View>
      </View>
    </View>
  )
}
