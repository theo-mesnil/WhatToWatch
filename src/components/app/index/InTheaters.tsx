import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetMovieNowPlayingApiResponse } from '~/api/movie'
import { useGetMovieNowPlaying } from '~/api/movie'
import { List } from '~/components/List'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { moviePath } from '~/routes'

type Item = UseGetMovieNowPlayingApiResponse['results'][number]

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
