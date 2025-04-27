import type { FlashListProps } from '@shopify/flash-list'
import { useNavigation } from 'expo-router'
import debounce from 'lodash.debounce'
import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Animated, StyleSheet, View } from 'react-native'

import { useGetSearch } from '~/api/search'
import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { GradientHeader } from '~/components/GradientHeader'
import { Header } from '~/components/Header'
import { Icon } from '~/components/Icon'
import { Text } from '~/components/Text'
import { TextInput } from '~/components/TextInput'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { BasicLayout } from '~/layouts//Basic'
import { routeByType } from '~/routes/utils'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'
import type { HeaderOptions } from '~/types/navigation'

type Item = UseGetTrendingApiResponse['all']['results'][number]

export default function Search() {
  const [querySearch, setQuerySearch] = React.useState(null)
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const navigation = useNavigation()
  const intl = useIntl()
  const { containerStyle } = useSafeHeights(true)

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetTrending({
    maxPages: 3,
  })

  const {
    data: searchResults,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isLoading: isSearchLoading,
  } = useGetSearch({
    params: { query: querySearch },
  })

  const results = querySearch
    ? searchResults?.pages?.map(page => page.results).flat()
    : data?.pages?.map(page => page.results).flat()

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
      {!isSearchLoading && !results.length ? (
        <View style={styles.noResults}>
          <Icon color="brand-500" name="magnifying-glass" size={80} />
          <Text style={styles.noResultsTitle} variant="h1">
            <FormattedMessage defaultMessage="Oh no! We have found nothing 🥺" id="hVXARm" />
          </Text>
        </View>
      ) : (
        <Text style={styles.listTitle} variant="h2">
          <FormattedMessage defaultMessage="We offer you:" id="qAbeEW" />
        </Text>
      )}
    </>
  ) : (
    <Text style={styles.listTitle} variant="h2">
      <FormattedMessage defaultMessage="Latest trends" id="mnB7Ay" />
    </Text>
  )

  const HeaderComponent = React.useCallback(
    ({ options: { title } }: HeaderOptions) => {
      return (
        <Header
          component={
            <TextInput
              clearButtonMode="always"
              enterKeyHint="search"
              onChangeText={debounce(setQuerySearch, 300)}
              placeholder={intl.formatMessage({
                defaultMessage: 'What would you like to watch?',
                id: 'UhsiMg',
              })}
            />
          }
          scrollY={scrollYPosition}
          title={title}
        />
      )
    },
    [intl, scrollYPosition]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout isView>
      <GradientHeader scrollY={scrollYPosition} />
      <VerticalList<Item>
        contentContainerStyle={containerStyle}
        getScrollYPosition={getScrollYPosition}
        id="search-trending"
        isLoading={isLoading || isSearchLoading}
        ListHeaderComponent={renderListHeaderComponent}
        onEndReached={loadMore}
        renderItem={renderItem}
        results={results}
      />
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  listTitle: {
    marginTop: theme.space.xl,
  },
  noResults: {
    alignItems: 'center',
    marginTop: theme.space.xl,
  },
  noResultsTitle: {
    marginTop: theme.space.md,
    maxWidth: 250,
    textAlign: 'center',
  },
})
