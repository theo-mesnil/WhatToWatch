import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import { useGetMovieReviews } from '~/api/movie'
import { ReviewsWithFilter } from '~/components/reviews-with-filter'
import { BasicLayout } from '~/layouts/basic'

export default function MovieReviews() {
  const params = useLocalSearchParams<{ id: string }>()
  const movieID = Number(params.id)

  const { data, isLoading } = useGetMovieReviews({ enabled: true, id: movieID })

  return (
    <BasicLayout title={<FormattedMessage defaultMessage="Reviews" id="dUxyza" />}>
      <ReviewsWithFilter isLoading={isLoading} reviews={data?.results} />
    </BasicLayout>
  )
}
