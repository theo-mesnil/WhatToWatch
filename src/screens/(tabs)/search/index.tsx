import type { FlashListProps } from '@shopify/flash-list'
import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { AccessibilityInfo, View } from 'react-native'

import { useGetSearch } from '~/api/search'
import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { Icon } from '~/components/icon'
import { Text } from '~/components/text'
import { TextInput } from '~/components/text-input'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { VerticalList } from '~/components/vertical-list'
import { TabsLayout } from '~/layouts/tabs'
import { routeByType } from '~/routes/utils'
import type { ContentType } from '~/types/content'

type Item = NonNullable<UseGetTrendingApiResponse['all']['results']>[number]

export default function Search() {
  const [querySearch, setQuerySearch] = React.useState<string>('')
  const deferredQuery = React.useDeferredValue(querySearch)
  const intl = useIntl()

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetTrending({
    maxPages: 5,
  })

  const {
    data: searchResults,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isLoading: isSearchLoading,
  } = useGetSearch({
    params: { query: deferredQuery },
  })

  const results = querySearch
    ? searchResults?.pages?.map(page => page.results).flat()
    : data?.pages?.map(page => page.results).flat()

  React.useEffect(() => {
    if (!deferredQuery || isSearchLoading) return
    const count = results?.length ?? 0
    AccessibilityInfo.announceForAccessibility(
      intl.formatMessage({ defaultMessage: '{count} results found', id: 'J+DlxR' }, { count })
    )
  }, [deferredQuery, intl, isSearchLoading, results?.length])

  const loadMore = () => {
    if (querySearch) {
      if (hasSearchNextPage) {
        fetchSearchNextPage()
      }
    } else {
      if (hasNextPage) {
        fetchNextPage()
      }
    }
  }

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    // @ts-expect-error wrong ts api from tmdb
    item: { id, media_type, name, poster_path, profile_path, title },
  }) => {
    const isLoadingItem = isLoading || isSearchLoading

    return (
      <ThumbLink
        href={routeByType({ id, type: media_type as ContentType })}
        isLoading={isLoadingItem}
      >
        <>
          <Thumb
            imageUrl={poster_path || profile_path}
            imageWidth="w300"
            type={media_type as ContentType}
          />
          {querySearch && <Text numberOfLines={3}>{name || title}</Text>}
        </>
      </ThumbLink>
    )
  }

  const renderListHeaderComponent = querySearch ? (
    <>
      {!isSearchLoading && !results?.length ? (
        <View className="mt-6 items-center">
          <Icon className="text-violet-500" name="search-sharp" size={80} />
          <Text className="mt-2 max-w-62.5 text-center" variant="h1">
            <FormattedMessage defaultMessage="Oh no! We have found nothing 🥺" id="hVXARm" />
          </Text>
        </View>
      ) : (
        <Text className="mt-6" variant="h2">
          <FormattedMessage defaultMessage="We offer you:" id="qAbeEW" />
        </Text>
      )}
    </>
  ) : (
    <Text className="mt-6" variant="h2">
      <FormattedMessage defaultMessage="Latest trends" id="mnB7Ay" />
    </Text>
  )

  return (
    <TabsLayout title={intl.formatMessage({ defaultMessage: 'Search', id: 'xmcVZ0' })}>
      <TextInput
        accessibilityLabel={intl.formatMessage({
          defaultMessage: 'Search for a movie, series or person',
          id: 'tRwj81',
        })}
        autoComplete="off"
        clearButtonMode="always"
        enterKeyHint="search"
        keyboardType="default"
        onChangeText={setQuerySearch}
        placeholder={intl.formatMessage({
          defaultMessage: 'What would you like to watch?',
          id: 'UhsiMg',
        })}
        returnKeyType="search"
        textContentType="none"
      />
      <VerticalList<Item>
        id="search-trending"
        isLoading={isLoading || isSearchLoading}
        ListHeaderComponent={renderListHeaderComponent}
        onEndReached={loadMore}
        renderItem={renderItem}
        results={results}
      />
    </TabsLayout>
  )
}
