import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { useGetWatchlist, type UseGetWatchlist } from '~/api/account'
import { Empty } from '~/components/Empty'
import { List } from '~/components/List'
import { ListTitle } from '~/components/ListTitle'
import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { watchlistPath } from '~/routes'
import { routeByType } from '~/routes/utils'
import { globalStyles } from '~/styles'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = UseGetWatchlist['movies']['results'][number]
type TVItem = UseGetWatchlist['tv']['results'][number]

export function Watchlist({ type }: { type: 'movies' | 'tv' }) {
  const { data, hasNextPage, isLoading } = useGetWatchlist({
    maxPages: 1,
    type,
  })

  const results = data?.pages?.map(page => page.results).flat()
  const listTitle =
    type === 'movies' ? (
      <FormattedMessage defaultMessage="My Movies Watchlist" id="vAP/To" />
    ) : (
      <FormattedMessage defaultMessage="My Tv Watchlist" id="inHmAw" />
    )

  // Type guard to check if item is a movie
  const isMovie = (item: Item): item is MovieItem => {
    return item !== null && typeof item === 'object' && 'title' in item
  }

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item }) => {
    // Get the display title based on what's available
    const displayTitle = isMovie(item) ? item.title : item.name

    return (
      <ThumbLink
        href={routeByType({ id: item?.id, type: type === 'movies' ? 'movie' : 'tv' })}
        isLoading={isLoading}
      >
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
          icon="bookmark"
          id={`watchlist-${type}`}
          isLoading={isLoading}
          renderItem={renderItem}
          results={results}
          title={listTitle}
          titleHref={hasNextPage ? watchlistPath({ type }) : undefined}
        />
      )}
      {!isLoading && !results?.length && (
        <View style={globalStyles.centered}>
          <ListTitle icon="bookmark">{listTitle}</ListTitle>
          <Empty icon="bookmark">
            {type === 'movies' ? (
              <FormattedMessage defaultMessage="No movies on watchlist" id="EB9asy" />
            ) : (
              <FormattedMessage defaultMessage="No tv on watchlist" id="x2c3j1" />
            )}
          </Empty>
        </View>
      )}
    </>
  )
}
