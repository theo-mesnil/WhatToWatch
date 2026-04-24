import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

import thumbGradientImage from '~/assets/thumb-gradient.png'
import { Gradient } from '~/components/Gradient'
import { Text } from '~/components/new/text'
import { theme } from '~/theme'
import { genresColor } from '~/utils/genres'

export type GenreThumbProps = {
  id: number
  title?: string
}

export function GenreThumb({ id, title }: GenreThumbProps) {
  const gradientColors = genresColor[id as keyof typeof genresColor]

  return (
    <View style={styles.wrapper}>
      <Gradient angle={0.4} colors={gradientColors} />
      <View style={styles.content}>
        <Image source={thumbGradientImage} style={styles.absoluteImage} />
        <Text
          className="bottom-3 absolute left-3"
          style={{ color: gradientColors?.[1] }}
          variant="h1"
        >
          {title}
        </Text>
        <Text className="bottom-3 absolute left-3 opacity-30 z-1" variant="h1">
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  absoluteImage: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  content: {
    aspectRatio: 16 / 9,
    justifyContent: 'flex-end',
    padding: theme.space.md,
  },
  wrapper: {
    aspectRatio: 16 / 9,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    width: 200,
  },
})
