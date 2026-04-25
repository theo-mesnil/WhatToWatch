import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import type { UseGetDiscoverTvApiResponse } from '~/api/discover'
import { useGetDiscoverTv } from '~/api/discover'
import { useGetGenreTvList } from '~/api/genres'
import { LargeThumb } from '~/components/large-thumb'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { VerticalList } from '~/components/vertical-list'
import { GenreLayout } from '~/layouts/genre'
import { tvPath } from '~/routes'

type Item = NonNullable<UseGetDiscoverTvApiResponse['results']>[number]

export default function Tv() {
  const params = useLocalSearchParams<{ id: string }>()
  const genreID = Number(params?.id)

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTv({
    params: {
      with_genres: `${genreID}`,
    },
  })
  const { data: genreTv } = useGetGenreTvList()

  const title = genreTv?.filter(genre => genre.id === genreID)?.[0]?.name
  const firstItem = !isLoading ? data?.pages?.[0]?.results?.[0] : undefined

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, poster_path } }) => (
    <ThumbLink href={tvPath({ id })} isLoading={isLoading}>
      <Thumb imageUrl={poster_path} type="tv" />
    </ThumbLink>
  )

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <GenreLayout
      title={
        title ? (
          <FormattedMessage defaultMessage="{title} - Series" id="eSb1/p" values={{ title }} />
        ) : undefined
      }
    >
      <VerticalList<Item>
        id="genre"
        isLoading={isLoading}
        ListHeaderComponent={
          firstItem ? (
            <ThumbLink href={tvPath({ id: firstItem.id })} isLoading={isLoading}>
              <LargeThumb
                id={firstItem.id}
                imageUrl={firstItem.backdrop_path}
                title={firstItem.name}
                type="tv"
              />
            </ThumbLink>
          ) : (
            <LargeThumb isLoading type="tv" />
          )
        }
        onEndReached={loadMore}
        renderItem={renderItem}
        results={data?.pages?.map(page => page.results).flat()}
      />
    </GenreLayout>
  )
}
