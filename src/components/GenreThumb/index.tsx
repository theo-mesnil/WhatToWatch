import { ImageBackground, StyleSheet, View } from 'react-native'

import { Gradient } from 'components/Gradient'
import { Text } from 'components/Text'
import { theme } from 'theme'
import { genresColor } from 'utils/genres'

export type GenreThumbProps = {
  id: number
  title: string
}

export function GenreThumb({ id, title }: GenreThumbProps) {
  const gradientColors = genresColor[id as keyof typeof genresColor]

  return (
    <View style={styles.wrapper}>
      <Gradient angle={0.4} colors={gradientColors} />
      {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
      <ImageBackground source={require('../../assets/thumb-gradient.png')} style={styles.content}>
        <Text variant="h1" style={[styles.title, { color: gradientColors?.[1] }]}>
          {title}
        </Text>
        <Text variant="h1" style={[styles.title, styles.whiteTitle]}>
          {title}
        </Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    width: 200,
    aspectRatio: 16 / 9,
  },
  content: {
    aspectRatio: 16 / 9,
    justifyContent: 'flex-end',
    padding: theme.space.md,
  },
  title: {
    position: 'absolute',
    left: theme.space.md,
    bottom: theme.space.md,
  },
  whiteTitle: { zIndex: 1, opacity: 0.3 },
})
