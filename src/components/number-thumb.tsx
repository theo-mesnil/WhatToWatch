import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type NumberThumbProps = {
  imageUrl?: string
  number: number
  type: ContentType
}

export function NumberThumb({ imageUrl, number, type }: NumberThumbProps) {
  return (
    <View className="flex-row">
      <View className="absolute bottom-[-20] left-0 justify-center">
        <Text className="flex-row text-violet-500 text-8xl leading-28 tracking-[-15]" variant="h0">
          {number}
        </Text>
      </View>
      <View className={`w-[110] ${number === 1 ? 'ml-[37]' : 'ml-[45]'}`}>
        <Thumb imageUrl={imageUrl} type={type} />
      </View>
    </View>
  )
}
