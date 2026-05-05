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
  /**
   * @default 2/3
   */
  aspectRatio?: number
  children?: React.ReactNode
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
  children,
  externalImageUrl,
  height,
  imageUrl,
  imageWidth,
  isLoading,
  isRounded,
  type,
}: ThumbProps) {
  return (
    <View
      className={`overflow-hidden border-continuous ${isRounded ? 'rounded-full' : 'rounded-2xl'}`}
    >
      <View
        className={`absolute inset-0 border-continuous border border-white/20 z-1 ${isRounded ? 'rounded-full' : 'rounded-2xl'}`}
      />
      <View className="bg-foreground" style={{ aspectRatio, height: height as number }}>
        <UniwindImage
          className="absolute inset-0 h-full w-full"
          contentFit="cover"
          recyclingKey={externalImageUrl || imageUrl || 'placeholder'}
          source={externalImageUrl || (imageUrl ? getImageUrl(imageUrl, imageWidth) : null)}
          transition={150}
        />
        {children && <View className="h-full">{children}</View>}
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
