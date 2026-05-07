import { View } from 'react-native'

import { Loader } from '~/components/loader'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type TextThumbProps = {
  imageUrl?: string
  isLoading?: boolean
  overview?: string
  tag?: React.ReactElement
  title?: string
  type: ContentType
}

export function TextThumb({ imageUrl, isLoading, overview, tag, title, type }: TextThumbProps) {
  if (isLoading) {
    return (
      <View className="gap-2">
        <Thumb aspectRatio={16 / 9} imageWidth="w500" isLoading type={type} />
        <View className="gap-1.5">
          <Loader className="h-3 w-1/4 rounded" />
          <Loader className="h-5 w-3/4 rounded" />
          <Loader className="h-3 w-full rounded" />
          <Loader className="h-3 w-5/6 rounded" />
        </View>
      </View>
    )
  }

  return (
    <View className="gap-2">
      <Thumb aspectRatio={16 / 9} imageUrl={imageUrl} imageWidth="w500" type={type} />
      <View>
        {tag && <Text>{tag}</Text>}
        <Text numberOfLines={1} variant="h3">
          {title}
        </Text>
        {overview && <Text numberOfLines={3}>{overview}</Text>}
      </View>
    </View>
  )
}
