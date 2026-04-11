import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

import thumbGradientImage from '~/assets/thumb-gradient.png'
import { Gradient } from '~/components/Gradient'
import { Text } from '~/components/Text'
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
        <Text style={[styles.title, { color: gradientColors?.[1] }]} variant="h1">
          {title}
        </Text>
        <Text style={[styles.title, styles.whiteTitle]} variant="h1">
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
  title: {
    bottom: theme.space.md,
    left: theme.space.md,
    position: 'absolute',
  },
  whiteTitle: { opacity: 0.3, zIndex: 1 },
  wrapper: {
    aspectRatio: 16 / 9,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    width: 200,
  },
})
