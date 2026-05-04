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
    <Thumb aspectRatio={2 / 3.5} imageUrl={imageUrl} type="person">
      <View className="justify-end p-2 absolute left-0 right-0 bottom-0 top-[50%] bg-linear-180 from-transparent via-background-fixed/80 to-background-fixed/95">
        <Text bold className="text-violet-400" numberOfLines={2}>
          {name}
        </Text>
        {character && <Text numberOfLines={1}>{character}</Text>}
      </View>
    </Thumb>
  )
}
