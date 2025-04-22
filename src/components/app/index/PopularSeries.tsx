import type { FlashListProps } from '@shopify/flash-list'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import type { UseGetDiscoverTvApiResponse } from '~/api/discover'
import { useGetDiscoverTv } from '~/api/discover'
import { List } from '~/components/List'
import { TextThumb } from '~/components/TextThumb'
import { ThumbLink } from '~/components/ThumbLink'
import { tvPath } from '~/routes'

type Item = UseGetDiscoverTvApiResponse['results'][number]

export function PopularSeries() {
  const { data, isLoading } = useGetDiscoverTv({
    params: {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 2000,
    },
  })

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { backdrop_path, id, name, overview, vote_average, vote_count },
  }) => (
    <ThumbLink href={tvPath({ id })}>
      <TextThumb
        imageUrl={backdrop_path}
        overview={overview}
        tag={
          <>
            {Math.round(vote_average * 10) / 10} ({vote_count})
          </>
        }
        title={name}
        type="tv"
      />
    </ThumbLink>
  )

  return (
    <List<Item>
      id="popular-series"
      isLoading={isLoading}
      numberOfItems={1.5}
      renderItem={renderItem}
      results={data?.pages?.map(page => page.results).flat()}
      title={<FormattedMessage defaultMessage="Popular series of all time" id="mgcS1E" />}
    />
  )
}
