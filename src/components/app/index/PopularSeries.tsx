import type { FlashListProps } from '@shopify/flash-list'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import type { UseGetDiscoverTvApiResponse } from 'api/discover'
import { useGetDiscoverTv } from 'api/discover'
import { List } from 'components/List'
import { TextThumb } from 'components/TextThumb'
import { ThumbLink } from 'components/ThumbLink'
import { tvPath } from 'routes'

type Item = UseGetDiscoverTvApiResponse['results'][number]

export function PopularSeries() {
  const { data, isLoading } = useGetDiscoverTv({
    params: [
      { name: 'vote_count.gte', value: 2000 },
      { name: 'sort_by', value: 'vote_average.desc' },
    ],
  })

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { backdrop_path, id, name, overview, vote_average, vote_count },
  }) => (
    <ThumbLink href={tvPath({ id })}>
      <TextThumb
        tag={
          <>
            {Math.round(vote_average * 10) / 10} ({vote_count})
          </>
        }
        type="tv"
        imageUrl={backdrop_path}
        overview={overview}
        title={name}
      />
    </ThumbLink>
  )

  return (
    <List<Item>
      numberOfItems={1.5}
      results={data?.pages?.map(page => page.results).flat()}
      title={<FormattedMessage defaultMessage="Popular series of all time" id="mgcS1E" />}
      id="popular-series"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  )
}
