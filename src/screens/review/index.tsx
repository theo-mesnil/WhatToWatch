import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedDate } from 'react-intl'
import { View } from 'react-native'

import { useGetReview } from '~/api/review'
import { Avatar } from '~/components/avatar'
import { Badge } from '~/components/badge'
import { Loader } from '~/components/loader'
import { Text } from '~/components/text'
import { ModalLayout } from '~/layouts/modal'
import { getImageUrl } from '~/utils/images'
import { getReviewRatingVariant } from '~/utils/rating'

export default function Review() {
  const params = useLocalSearchParams<{ id: string }>()

  const { data, isLoading } = useGetReview({ id: params.id })

  const author = data?.author
  const authorName = data?.author_details?.name
  const username = data?.author_details?.username
  const avatarPath = data?.author_details?.avatar_path
  const rating = data?.author_details?.rating
  const content = data?.content
  const createdAt = data?.created_at
  const displayName = authorName || author || username

  return (
    <ModalLayout>
      <View className="px-screen gap-4">
        <View className="flex-row items-center gap-3">
          {isLoading ? (
            <Loader className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar imageUrl={getAvatarUrl(avatarPath)} name={displayName} />
          )}
          <View className="flex-1">
            {isLoading ? (
              <Loader className="h-4 w-32 rounded" />
            ) : (
              !!displayName && (
                <Text bold numberOfLines={1} variant="lg">
                  {displayName}
                </Text>
              )
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
        {isLoading ? (
          <View className="gap-2">
            <Loader className="h-4 w-full rounded" />
            <Loader className="h-4 w-full rounded" />
            <Loader className="h-4 w-3/4 rounded" />
          </View>
        ) : (
          !!content && <Text variant="lg">{content}</Text>
        )}
      </View>
    </ModalLayout>
  )
}

function getAvatarUrl(path?: string) {
  if (!path) return undefined
  if (path.startsWith('/http')) return path.slice(1)
  return getImageUrl(path)
}
