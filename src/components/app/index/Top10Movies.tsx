import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetTrendingApiResponse } from 'api/trending'
import { useGetTrending } from 'api/trending'
import { List } from 'components/List'
import { NumberThumb } from 'components/NumberThumb'
import { ThumbLink } from 'components/ThumbLink'
import { moviePath } from 'routes'

type Item = UseGetTrendingApiResponse['movie']['results'][number]

export function Top10Movies() {
  const { data, isLoading } = useGetTrending({
    maxPages: 1,
    type: 'movie',
  })

  const renderItem: FlashListProps<Item>['renderItem'] = ({ index, item: { id, poster_path } }) => (
    <ThumbLink href={moviePath({ id })}>
      <NumberThumb number={index + 1} imageUrl={poster_path} type="movie" />
    </ThumbLink>
  )

  return (
    <List
      withoutSizing
      results={data?.pages
        ?.map(page => page.results)
        .flat()
        .slice(0, 10)}
      title={<FormattedMessage defaultMessage="Top 10 Movies" id="ZUCQbH" />}
      id="top-10-movie"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  )
}
