import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { UseGetFavorite } from '~/api/account'
import { useGetFavorite } from '~/api/account'
import { Empty } from '~/components/Empty'
import { List } from '~/components/List'
import { ListTitle } from '~/components/ListTitle'
import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { favoritePath } from '~/routes'
import { routeByType } from '~/routes/utils'
import { globalStyles } from '~/styles'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = UseGetFavorite['movie']['results'][number]
type TVItem = UseGetFavorite['tv']['results'][number]

export function Favorite({ type }: { type: 'movie' | 'tv' }) {
  const { data, hasNextPage, isLoading } = useGetFavorite({
    maxPages: 1,
    type,
  })

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
      {(isLoading || !!results.length) && (
        <List<Item>
          icon="heart"
          id={`favorite-${type}`}
          isLoading={isLoading}
          renderItem={renderItem}
          results={results}
          title={listTitle}
          titleHref={hasNextPage ? favoritePath({ type }) : undefined}
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
