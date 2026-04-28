import { Image } from 'expo-image'
import * as React from 'react'
import { View } from 'react-native'
import { withUniwind } from 'uniwind'

import { Icon } from '~/components/icon'
import { Loader } from '~/components/loader'
import type { ContentType, ImageSizeBackdrop, ImageSizePoster } from '~/types/content'
import { getIconType } from '~/utils/icons'
import { getImageUrl } from '~/utils/images'

const UniwindImage = withUniwind(Image)

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
    <View className={`overflow-hidden ${isRounded ? 'rounded-full' : 'rounded'}`}>
      <View className="bg-foreground" style={{ aspectRatio, height: height as number }}>
        <UniwindImage
          cachePolicy="memory-disk"
          className="absolute inset-0 h-full w-full"
          contentFit="cover"
          source={externalImageUrl || (imageUrl ? getImageUrl(imageUrl, imageWidth) : undefined)}
          transition={150}
        />
        {isLoading ? (
          <Loader className="w-full" />
        ) : (
          <>
            {!imageUrl && !externalImageUrl && (
              <View className="absolute inset-0 items-center justify-center bg-foreground opacity-30">
                <Icon name={getIconType(type)} size={100} />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  )
}
