import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { Touchable } from '~/components/Touchable'
import { theme } from '~/theme'
import { getVideo } from '~/utils/videos'

export type VideoThumbProps = {
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
      <View style={styles.text}>
        <Text numberOfLines={2} variant="h3">
          {name}
        </Text>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: theme.space.xs,
  },
})
