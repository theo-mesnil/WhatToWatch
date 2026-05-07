import type { FlashListProps } from '@shopify/flash-list'
import { FormattedDate, FormattedMessage } from 'react-intl'

import type { UseGetDiscoverMovieApiResponse } from '~/api/discover'
import { useGetDiscoverMovie } from '~/api/discover'
import { List } from '~/components/list'
import { TextThumb } from '~/components/text-thumb'
import { ThumbLink } from '~/components/thumb-link'
import { genreMoviePath, moviePath } from '~/routes'

type Item = NonNullable<UseGetDiscoverMovieApiResponse['results']>[number]

export function Family() {
  const { data, isLoading } = useGetDiscoverMovie({
    params: {
      with_genres: '10751',
    },
  })

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { backdrop_path, id, overview, release_date, title },
  }) => (
    <ThumbLink href={moviePath({ id })} isLoading={isLoading}>
      <TextThumb
        imageUrl={backdrop_path}
        isLoading={isLoading}
        overview={overview}
        tag={<FormattedDate value={new Date(release_date ?? '')} />}
        title={title}
        type="movie"
      />
    </ThumbLink>
  )

  return (
    <List<Item>
      id="documentaries"
      isLoading={isLoading}
      numberOfItems={1.5}
      renderItem={renderItem}
      results={data?.pages?.map(page => page.results).flat()}
      title={<FormattedMessage defaultMessage="Family movies" id="o2T5zr" />}
      titleHref={genreMoviePath({ id: 10751 })}
    />
  )
}
