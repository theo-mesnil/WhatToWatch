import { Image } from 'expo-image'
import * as React from 'react'
import { View } from 'react-native'
import { withUniwind } from 'uniwind'

import { useGetContentLogo } from '~/api/logo'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType, ImageSizeBackdrop } from '~/types/content'
import { getImageUrl } from '~/utils/images'

const UniwindImage = withUniwind(Image)

type LargeThumbProps = {
  className?: string
  id?: number
  imageUrl?: string
  imageWidth?: ImageSizeBackdrop
  isLoading?: boolean
  title?: React.ReactElement | string
  type: ContentType
}

export function LargeThumb({
  className = '',
  id,
  imageUrl,
  imageWidth = 'w780',
  isLoading,
  title,
  type,
}: LargeThumbProps) {
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id: id ?? 0,
    type,
  })

  return (
    <View className={`rounded-[20px] overflow-hidden w-full ${className}`}>
      <Thumb
        aspectRatio={16 / 12}
        imageUrl={imageUrl}
        imageWidth={imageWidth}
        isLoading={isLoading}
        type={type}
      />
      <View className="absolute inset-0 items-center justify-end">
        <View className="absolute inset-0 bg-linear-180 from-transparent to-background-fixed" />
        {!isLoadingLogo && logo && (
          <UniwindImage
            className="mb-4 max-h-cover-top w-cover-without-top"
            source={getImageUrl(logo.url, 'w500')}
            style={{ aspectRatio: logo.aspectRatio }}
          />
        )}
        {!isLoadingLogo && !logo && title && (
          <Text className="pb-2 mx-screen text-center" numberOfLines={2} variant="h0">
            {title}
          </Text>
        )}
      </View>
    </View>
  )
}
