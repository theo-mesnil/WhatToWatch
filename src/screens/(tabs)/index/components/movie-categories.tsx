import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetGenreMovieListApiResponse } from '~/api/genres'
import { useGetGenreMovieList } from '~/api/genres'
import { GenreThumb } from '~/components/genre-thumb'
import { List } from '~/components/list'
import { ThumbLink } from '~/components/thumb-link'
import { genreMoviePath } from '~/routes'

type Item = NonNullable<UseGetGenreMovieListApiResponse['genres']>[number]

export function MovieCategories() {
  const { data, isLoading } = useGetGenreMovieList()

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, name } }) => (
    <ThumbLink href={genreMoviePath({ id })}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  )

  return (
    <List<Item>
      id="categories-movie"
      isLoading={isLoading}
      renderItem={renderItem}
      results={data}
      title={<FormattedMessage defaultMessage="Movies by categories" id="6PpgeA" />}
      withoutSizing
    />
  )
}
