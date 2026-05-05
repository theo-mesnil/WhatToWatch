import { FormattedDate } from 'react-intl'
import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type ItemThumbProps = {
  date?: string
  isLoading?: boolean
  overview?: string
  posterUrl?: string
  subtitle?: string
  title?: string
  type: ContentType
}

export function ItemThumb({ date, overview, posterUrl, subtitle, title, type }: ItemThumbProps) {
  return (
    <View className="flex-row gap-3">
      <View className="w-25">
        <Thumb imageUrl={posterUrl} type={type} />
      </View>
      <View className="flex-1">
        <View className="gap-0.5">
          <Text variant="h3">{title}</Text>
          {subtitle && <Text className="text-text-maximal">{subtitle}</Text>}
          {date && (
            <Text>
              <FormattedDate value={new Date(date)} />
            </Text>
          )}
        </View>
        {overview && (
          <Text className="mt-2" numberOfLines={3}>
            {overview}
          </Text>
        )}
      </View>
    </View>
  )
}
