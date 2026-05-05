import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetGenreTvListApiResponse } from '~/api/genres'
import { useGetGenreTvList } from '~/api/genres'
import { GenreThumb } from '~/components/genre-thumb'
import { List } from '~/components/list'
import { ThumbLink } from '~/components/thumb-link'
import { genreTvPath } from '~/routes'

type Item = NonNullable<UseGetGenreTvListApiResponse['genres']>[number]

export function TvCategories() {
  const { data, isLoading } = useGetGenreTvList()

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, name } }) => (
    <ThumbLink href={genreTvPath({ id })}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  )

  return (
    <List<Item>
      id="tv-categories"
      isLoading={isLoading}
      renderItem={renderItem}
      results={data}
      title={<FormattedMessage defaultMessage="Series by categories" id="9Pg5Uj" />}
      withoutSizing
    />
  )
}
