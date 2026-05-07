import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type NumberThumbProps = {
  imageUrl?: string
  isLoading?: boolean
  name: string
  number: number
  type: ContentType
}

export function NumberThumb({ imageUrl, isLoading, name, number, type }: NumberThumbProps) {
  return (
    <View>
      <Thumb imageUrl={imageUrl} isLoading={isLoading} type={type}>
        {!isLoading && (
          <Text
            bold
            className="text-5xl text-text-maximal ml-2 mt-1"
            style={{
              textShadowColor: 'rgba(0, 0, 0, 0.9)',
              textShadowOffset: { height: 0, width: 0 },
              textShadowRadius: 6,
            }}
          >
            {number}
          </Text>
        )}
      </Thumb>
      <Text className="text-center mt-1" numberOfLines={1}>
        {isLoading ? '' : name}
      </Text>
    </View>
  )
}
