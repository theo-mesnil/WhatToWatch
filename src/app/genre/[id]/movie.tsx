import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import type { UseGetDiscoverMovieApiResponse } from '~/api/discover'
import { useGetDiscoverMovie } from '~/api/discover'
import { useGetGenreMovieList } from '~/api/genres'
import { LargeThumb } from '~/components/LargeThumb'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { GenreLayout } from '~/layouts/genre'
import { moviePath } from '~/routes'

type Item = NonNullable<UseGetDiscoverMovieApiResponse['results']>[number]

export default function Movie() {
  const params = useLocalSearchParams<{ id: string }>()
  const genreID = Number(params?.id)

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverMovie({
    params: {
      with_genres: `${genreID}`,
    },
  })
  const { data: genreMovie } = useGetGenreMovieList()

  const title = genreMovie?.filter(genre => genre.id === genreID)?.[0]?.name
  const firstItem = !isLoading ? data?.pages[0]?.results?.[0] : undefined

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, poster_path } }) => (
    <ThumbLink href={moviePath({ id })} isLoading={isLoading}>
      <Thumb imageUrl={poster_path} type="movie" />
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
          <FormattedMessage defaultMessage="{title} - Movies" id="0CRYrS" values={{ title }} />
        ) : undefined
      }
    >
      <VerticalList<Item>
        id="genre"
        isLoading={isLoading}
        ListHeaderComponent={
          firstItem ? (
            <ThumbLink href={moviePath({ id: firstItem.id })} isLoading={isLoading}>
              <LargeThumb
                id={firstItem.id}
                imageUrl={firstItem.backdrop_path}
                title={firstItem.title}
                type="movie"
              />
            </ThumbLink>
          ) : (
            <LargeThumb isLoading type="movie" />
          )
        }
        onEndReached={loadMore}
        renderItem={renderItem}
        results={data?.pages?.map(page => page.results).flat()}
      />
    </GenreLayout>
  )
}
