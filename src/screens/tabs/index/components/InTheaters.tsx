import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetMovieNowPlayingApiResponse } from '~/api/movie'
import { useGetMovieNowPlaying } from '~/api/movie'
import { List } from '~/components/list'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { moviePath } from '~/routes'

type Item = NonNullable<UseGetMovieNowPlayingApiResponse['results']>[number]

export function InTheaters() {
  const { data, isLoading } = useGetMovieNowPlaying()

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, poster_path } }) => (
    <ThumbLink href={moviePath({ id })}>
      <Thumb imageUrl={poster_path} type="movie" />
    </ThumbLink>
  )

  return (
    <List<Item>
      id="in-theaters"
      isLoading={isLoading}
      renderItem={renderItem}
      results={data?.results}
      title={<FormattedMessage defaultMessage="In Theaters" id="zzTAaI" />}
    />
  )
}
