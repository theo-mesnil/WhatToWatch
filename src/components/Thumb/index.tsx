import { Image } from 'expo-image'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

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

export function Thumb({
  aspectRatio = 2 / 3,
  externalImageUrl,
  height,
  imageUrl,
  imageWidth,
  isLoading,
  isRounded,
  type,
}: ThumbProps) {
  return (
    <View style={[styles.wrapper, isRounded && styles.rounded]}>
      <View
        style={[
          {
            aspectRatio,
            height: height as number,
          },
          styles.image,
        ]}
      >
        <Image
          source={externalImageUrl || (imageUrl ? getImageUrl(imageUrl, imageWidth) : undefined)}
          style={styles.absoluteImage}
        />
        {isLoading ? (
          <Loader style={styles.loading} />
        ) : (
          <>{!imageUrl && !externalImageUrl && <NoCover icon={getIconType(type)} />}</>
        )}
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
