import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'

type PersonThumbProps = {
  character?: string
  imageUrl?: string
  name?: string
}

export function PersonThumb({ character, imageUrl, name }: PersonThumbProps) {
  return (
    <View>
      <Thumb aspectRatio={6 / 7} imageUrl={imageUrl} type="person" />
      <View className="mt-1.5">
        <Text numberOfLines={2} variant="h3">
          {name}
        </Text>
        {character && <Text numberOfLines={2}>{character}</Text>}
      </View>
    </View>
  )
}
