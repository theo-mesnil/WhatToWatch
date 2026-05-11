import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { Button } from '~/components/button'
import { Loader } from '~/components/loader'
import { Review } from '~/components/review'
import { LOCALE } from '~/constants/locales'

type Filter = 'all' | 'en' | 'fr'

type FilterOption = {
  id: Filter
  title: React.ReactNode
}

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
  iso_639_1?: string
}

const filterOptions: FilterOption[] = [
  { id: 'all', title: <FormattedMessage defaultMessage="All" id="zQvVDJ" /> },
  { id: 'en', title: <FormattedMessage defaultMessage="English" id="WkrNSk" /> },
  { id: 'fr', title: <FormattedMessage defaultMessage="French" id="njAU72" /> },
]

type ReviewsWithFilterProps = {
  isLoading?: boolean
  reviews?: ReviewItem[]
}

export function ReviewsWithFilter({ isLoading, reviews }: ReviewsWithFilterProps) {
  const [filter, setFilter] = React.useState<Filter>('all')

  const availableLanguages = new Set<string>()
  for (const review of reviews ?? []) {
    if (review.iso_639_1) availableLanguages.add(review.iso_639_1)
  }
  const visibleOptions = filterOptions.filter(
    option => option.id === 'all' || availableLanguages.has(option.id)
  )
  const showFilters = LOCALE === 'fr' && availableLanguages.size > 1
  const activeFilter =
    showFilters && visibleOptions.some(option => option.id === filter) ? filter : 'all'

  const filtered = (reviews ?? []).filter(
    review => activeFilter === 'all' || review.iso_639_1 === activeFilter
  )

  return (
    <View className="gap-4">
      {showFilters && (
        <View className="flex-row gap-2 mx-screen">
          {visibleOptions.map(option => (
            <Button
              key={option.id}
              onPress={() => setFilter(option.id)}
              size="lg"
              variant={activeFilter === option.id ? 'secondary' : 'primary'}
            >
              {option.title}
            </Button>
          ))}
        </View>
      )}
      {isLoading && (
        <View className="gap-3 mx-screen">
          <Loader className="h-32 w-full rounded-2xl" />
          <Loader className="h-32 w-full rounded-2xl" />
        </View>
      )}
      {filtered.map(review => (
        <Review
          author={review.author}
          authorName={review.author_details?.name}
          avatarPath={review.author_details?.avatar_path}
          content={review.content}
          createdAt={review.created_at}
          key={review.id}
          rating={
            typeof review.author_details?.rating === 'number'
              ? review.author_details.rating
              : undefined
          }
        />
      ))}
    </View>
  )
}
