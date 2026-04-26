import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { Touchable } from '~/components/touchable'
import { getVideo } from '~/utils/videos'

type VideoThumbProps = {
  id: string
  name: string
  platform: string
  type: 'movie' | 'tv'
}

export function VideoThumb({ id, name, platform, type }: VideoThumbProps) {
  const { handlePress, imageUrl } = getVideo({ id, platform })

  return (
    <Touchable onPress={() => handlePress()}>
      <Thumb aspectRatio={16 / 9} externalImageUrl={imageUrl} type={type} />
      <View className="mt-1.5">
        <Text numberOfLines={2} variant="h3">
          {name}
        </Text>
      </View>
    </Touchable>
  )
}
