import * as React from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'

import { Gradient } from '~/components/Gradient'
import { Loader } from '~/components/Loader'
import { Text } from '~/components/Text'
import { COVER_HEIGHT } from '~/constants/cover'
import { theme } from '~/theme'
import type { ImageSizeBackdrop } from '~/types/content'
import { getImageUrl } from '~/utils/images'

export type CoverProps = {
  imageUrl?: string
  imageWidth?: ImageSizeBackdrop
  isLoading?: boolean
  logo?: {
    aspectRatio: number
    url: string
  }
  title: string
}

export const Cover = React.memo(({ imageUrl, isLoading, logo, title }: CoverProps) => {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{
          uri: getImageUrl(imageUrl, 'w1280'),
        }}
        style={styles.image}
        testID="cover-image"
      >
        {isLoading && <Loader style={styles.loading} />}
      </ImageBackground>
      <Gradient colors={['transparent', theme.colors.behind]} style={styles.gradient} />
      <View style={styles.content}>
        {logo && (
          <Image
            src={getImageUrl(logo.url, 'w500')}
            style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
            testID="cover-logo"
          />
        )}
        {!logo && title && (
          <Text style={styles.text} testID="cover-title" variant="h0">
            {title}
          </Text>
        )}
      </View>
    </View>
  )
})

Cover.displayName = 'Cover'

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: theme.space.xl,
  },
  gradient: {
    height: COVER_HEIGHT - 150,
    marginTop: 150,
    position: 'absolute',
    width: '100%',
  },
  image: {
    backgroundColor: theme.colors.ahead,
    height: COVER_HEIGHT,
    position: 'absolute',
    width: '100%',
  },
  loading: {
    width: '100%',
  },
  logo: {
    maxHeight: 150,
    width: 250,
  },
  text: {
    textAlign: 'center',
  },
  wrapper: {
    height: COVER_HEIGHT,
    marginBottom: theme.space.lg,
    position: 'absolute',
    width: '100%',
  },
})
