import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import { useGetTvReviews } from '~/api/tv'
import { ReviewsWithFilter } from '~/components/reviews-with-filter'
import { BasicLayout } from '~/layouts/basic'

export default function TvReviews() {
  const params = useLocalSearchParams<{ id: string }>()
  const tvID = Number(params.id)

  const { data, isLoading } = useGetTvReviews({ enabled: true, id: tvID })

  return (
    <BasicLayout title={<FormattedMessage defaultMessage="Reviews" id="dUxyza" />}>
      <ReviewsWithFilter isLoading={isLoading} reviews={data?.results} />
    </BasicLayout>
  )
}
