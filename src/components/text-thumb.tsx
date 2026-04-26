import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type TextThumbProps = {
  imageUrl?: string
  overview?: string
  tag?: React.ReactElement
  title?: string
  type: ContentType
}

export function TextThumb({ imageUrl, overview, tag, title, type }: TextThumbProps) {
  return (
    <View className="gap-1.5">
      <Thumb aspectRatio={16 / 9} imageUrl={imageUrl} imageWidth="w500" type={type} />
      {tag && <Text className="uppercase">{tag}</Text>}
      <Text numberOfLines={1} variant="h3">
        {title}
      </Text>
      {overview && <Text numberOfLines={3}>{overview}</Text>}
    </View>
  )
}
