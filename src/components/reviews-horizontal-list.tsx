import type { FlashListProps } from '@shopify/flash-list'
import type { Href } from 'expo-router'
import { router } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import type { LayoutChangeEvent } from 'react-native'

import { List } from '~/components/list'
import { ReviewThumb } from '~/components/review-thumb'
import { Touchable } from '~/components/touchable'
import { reviewPath } from '~/routes'

type ReviewItem = {
  author?: string
  author_details?: {
    avatar_path?: string
    name?: string
    rating?: unknown
  }
  content?: string
  created_at?: string
  id?: string
}

type ReviewsHorizontalListProps = {
  reviews?: ReviewItem[]
  titleHref?: Href
}

export function ReviewsHorizontalList({ reviews, titleHref }: ReviewsHorizontalListProps) {
  const [maxHeight, setMaxHeight] = React.useState(0)

  const onItemLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height
    setMaxHeight(prev => (height > prev ? height : prev))
  }

  const renderItem: FlashListProps<ReviewItem>['renderItem'] = ({ item }) => (
    <Touchable
      className="flex-1"
      onPress={() => item.id && router.push(reviewPath({ id: item.id }))}
    >
      <ReviewThumb
        author={item.author}
        authorName={item.author_details?.name}
        avatarPath={item.author_details?.avatar_path}
        content={item.content}
        createdAt={item.created_at}
        minHeight={maxHeight}
        onLayout={onItemLayout}
        rating={
          typeof item.author_details?.rating === 'number' ? item.author_details.rating : undefined
        }
      />
    </Touchable>
  )

  return (
    <List<ReviewItem>
      id="reviews"
      numberOfItems={1.1}
      renderItem={renderItem}
      results={reviews}
      title={<FormattedMessage defaultMessage="Reviews" id="dUxyza" />}
      titleHref={titleHref}
    />
  )
}
