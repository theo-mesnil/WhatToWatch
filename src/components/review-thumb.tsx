import { FormattedDate } from 'react-intl'
import type { LayoutChangeEvent } from 'react-native'
import { View } from 'react-native'

import { Avatar } from '~/components/avatar'
import { Badge } from '~/components/badge'
import { Text } from '~/components/text'
import { getImageUrl } from '~/utils/images'
import { getReviewRatingIcon, getReviewRatingVariant } from '~/utils/rating'

type ReviewThumbProps = {
  author?: string
  authorName?: string
  avatarPath?: string
  content?: string
  createdAt?: string
  minHeight?: number
  onLayout?: (event: LayoutChangeEvent) => void
  rating?: number
}

export function ReviewThumb({
  author,
  authorName,
  avatarPath,
  content,
  createdAt,
  minHeight,
  onLayout,
  rating,
}: ReviewThumbProps) {
  const displayName = authorName || author

  return (
    <View
      className="bg-foreground p-4 rounded-2xl gap-3"
      onLayout={onLayout}
      style={minHeight ? { minHeight } : undefined}
    >
      <View className="flex-row items-center gap-2">
        <Avatar imageUrl={getAvatarUrl(avatarPath)} name={displayName} size={32} />
        <View className="flex-1">
          {!!displayName && (
            <Text bold numberOfLines={1} variant="sm">
              {displayName}
            </Text>
          )}
          {!!createdAt && (
            <Text className="light:text-neutral-500" variant="sm">
              <FormattedDate
                day="numeric"
                month="short"
                value={new Date(createdAt)}
                year="numeric"
              />
            </Text>
          )}
        </View>
        {typeof rating === 'number' && rating > 0 && (
          <Badge icon={getReviewRatingIcon(rating)} variant={getReviewRatingVariant(rating)}>
            {rating}
          </Badge>
        )}
      </View>
      {!!content && (
        <Text className="leading-snug" numberOfLines={4} variant="md">
          {content}
        </Text>
      )}
    </View>
  )
}

function getAvatarUrl(path?: string) {
  if (!path) return undefined
  if (path.startsWith('/http')) return path.slice(1)
  return getImageUrl(path)
}
