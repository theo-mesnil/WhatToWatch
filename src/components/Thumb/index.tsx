import * as React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

import { Loader } from '~/components/Loader'
import { NoCover } from '~/components/NoCover'
import { theme } from '~/theme'
import type { ContentType, ImageSizeBackdrop, ImageSizePoster } from '~/types/content'
import { getIconType } from '~/utils/icons'
import { getImageUrl } from '~/utils/images'

export type ThumbProps = {
  aspectRatio?: number
  externalImageUrl?: string
  height?: number | string
  imageUrl?: string
  imageWidth?: ImageSizeBackdrop | ImageSizePoster
  isLoading?: boolean
  isRounded?: boolean
  type: ContentType
}

export const Thumb = React.memo(
  ({
    aspectRatio = 2 / 3,
    externalImageUrl,
    height,
    imageUrl,
    imageWidth,
    isLoading,
    isRounded,
    type,
  }: ThumbProps) => {
    return (
      <View style={[styles.wrapper, isRounded && styles.rounded]}>
        <ImageBackground
          source={{
            uri: externalImageUrl || getImageUrl(imageUrl, imageWidth),
          }}
          style={[
            {
              aspectRatio,
              height: height as number,
            },
            styles.image,
          ]}
        >
          {isLoading ? (
            <Loader style={styles.loading} />
          ) : (
            <>{!imageUrl && !externalImageUrl && <NoCover icon={getIconType(type)} />}</>
          )}
        </ImageBackground>
      </View>
    )
  }
)

Thumb.displayName = 'Thumb'

const styles = StyleSheet.create({
  image: {
    backgroundColor: theme.colors.ahead,
  },
  loading: {
    width: '100%',
  },
  rounded: {
    borderRadius: 500,
  },
  wrapper: {
    borderRadius: theme.radii.sm,
    overflow: 'hidden',
  },
})
