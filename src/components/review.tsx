import { FormattedDate } from 'react-intl'
import { View } from 'react-native'

import { Avatar } from '~/components/avatar'
import { Badge } from '~/components/badge'
import { ReadMore } from '~/components/read-more'
import { Text } from '~/components/text'
import { getImageUrl } from '~/utils/images'
import { getReviewRatingVariant } from '~/utils/rating'

type ReviewProps = {
  author?: string
  authorName?: string
  avatarPath?: string
  content?: string
  createdAt?: string
  rating?: number
}

export function Review({
  author,
  authorName,
  avatarPath,
  content,
  createdAt,
  rating,
}: ReviewProps) {
  const displayName = authorName || author

  return (
    <View className="bg-foreground mx-screen p-4 rounded-2xl gap-3">
      <View className="flex-row items-center gap-3">
        <Avatar imageUrl={getAvatarUrl(avatarPath)} name={displayName} />
        <View className="flex-1">
          {!!displayName && (
            <Text bold numberOfLines={1}>
              {displayName}
            </Text>
          )}
          {!!createdAt && (
            <Text className="light:text-neutral-500" variant="sm">
              <FormattedDate
                day="numeric"
                month="long"
                value={new Date(createdAt)}
                year="numeric"
              />
            </Text>
          )}
        </View>
        {typeof rating === 'number' && rating > 0 && (
          <Badge icon="star" variant={getReviewRatingVariant(rating)}>
            {Math.round(rating * 10) / 10}
          </Badge>
        )}
      </View>
      {!!content && <ReadMore>{content}</ReadMore>}
    </View>
  )
}

function getAvatarUrl(path?: string) {
  if (!path) return undefined
  if (path.startsWith('/http')) return path.slice(1)
  return getImageUrl(path)
}
