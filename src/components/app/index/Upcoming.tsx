import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetMovieUpcomingApiResponse } from '~/api/movie'
import { useGetMovieUpcoming } from '~/api/movie'
import { List } from '~/components/List'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { moviePath } from '~/routes'

type Item = UseGetMovieUpcomingApiResponse['results'][number]

export function Upcoming() {
  const { data, isLoading } = useGetMovieUpcoming()

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, poster_path } }) => (
    <ThumbLink href={moviePath({ id })}>
      <Thumb imageUrl={poster_path} type="movie" />
    </ThumbLink>
  )

  return (
    <List<Item>
      id="upcoming-movies"
      isLoading={isLoading}
      renderItem={renderItem}
      results={data?.results}
      title={<FormattedMessage defaultMessage="Upcoming movies" id="AEBO3C" />}
    />
  )
}
