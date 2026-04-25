import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { UseGetFavorite } from '~/api/account'
import { useGetFavorite } from '~/api/account'
import { Empty } from '~/components/empty'
import { List } from '~/components/list'
import { ListTitle } from '~/components/list-title'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { favoritePath } from '~/routes'
import { routeByType } from '~/routes/utils'
import { globalStyles } from '~/styles'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = NonNullable<UseGetFavorite['movie']['results']>[number]
type TVItem = NonNullable<UseGetFavorite['tv']['results']>[number]

export function Favorite({ type }: { type: 'movie' | 'tv' }) {
  const { data, isLoading } = useGetFavorite({
    type,
  })
  const hasMorePage = (data?.pages?.[0]?.total_pages ?? 0) > 1

  const results = data?.pages?.map(page => page.results).flat()
  const listTitle =
    type === 'movie' ? (
      <FormattedMessage defaultMessage="My Favorites Movies" id="oXYUTN" />
    ) : (
      <FormattedMessage defaultMessage="My Favorites TV" id="vWAJia" />
    )

  // Type guard to check if item is a movie
  const isMovie = (item: Item): item is MovieItem => {
    return item !== null && typeof item === 'object' && 'title' in item
  }

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item }) => {
    // Get the display title based on what's available
    const displayTitle = isMovie(item) ? item.title : item.name

    return (
      <ThumbLink href={routeByType({ id: item?.id, type })} isLoading={isLoading}>
        <>
          <Thumb imageUrl={item?.poster_path} imageWidth="w300" type="tv" />
          <Text numberOfLines={3}>{displayTitle}</Text>
        </>
      </ThumbLink>
    )
  }

  return (
    <>
      {(isLoading || !!results?.length) && (
        <List<Item>
          icon="heart"
          id={`favorite-${type}`}
          isLoading={isLoading}
          renderItem={renderItem}
          results={results}
          title={listTitle}
          titleHref={hasMorePage ? favoritePath({ type }) : undefined}
        />
      )}
      {!isLoading && !results?.length && (
        <View style={globalStyles.centered}>
          <ListTitle icon="heart">{listTitle}</ListTitle>
          <Empty icon="heart">
            {type === 'movie' ? (
              <FormattedMessage defaultMessage="No favorite movies found" id="LMqQH5" />
            ) : (
              <FormattedMessage defaultMessage="No favorite series found" id="elUgUG" />
            )}
          </Empty>
        </View>
      )}
    </>
  )
}
