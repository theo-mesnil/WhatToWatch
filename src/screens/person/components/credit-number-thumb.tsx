import { View } from 'react-native'

import { Icon } from '~/components/icon'
import { Text } from '~/components/text'

type CreditNumberThumbProps = {
  number: number
  title: React.ReactElement
  type: 'movie' | 'tv'
}

export function CreditNumberThumb({ number, title, type }: CreditNumberThumbProps) {
  return (
    <View
      className="rounded-lg overflow-hidden bg-linear-60 from-foreground to-violet-800"
      testID={`credits-${type}`}
    >
      <View className="items-center flex-row">
        <View className="-ml-7.5 mr-2.5 opacity-40">
          <Icon className="text-violet-500" name={type === 'movie' ? 'film' : 'tv'} size={80} />
        </View>
        <Text variant="h2">
          {number} {title}
        </Text>
      </View>
    </View>
  )
}
