import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { Animated, type ListRenderItemInfo } from 'react-native';
import { moviePath } from 'routes';

import type { UseGetDiscoverMovieApiResponse } from 'api/discover';
import { useGetDiscoverMovie } from 'api/discover';
import { LargeThumb } from 'components/LargeThumb';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';
import GenreLayout from 'layouts/Genre';

export default function Movie() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const params = useLocalSearchParams<{ id: string }>();
  const genreID = Number(params?.id);
  const { containerStyle } = useSafeHeights();

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverMovie({
    params: [{ name: 'with_genres', value: `${genreID}` }]
  });

  const firstItem = !isLoading && data?.pages[0].results[0];

  const renderItem = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetDiscoverMovieApiResponse['results'][number]>) => (
    <ThumbLink isLoading={isLoading} href={moviePath({ id })}>
      <Thumb type="movie" imageUrl={poster_path} />
    </ThumbLink>
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <GenreLayout scrollYPosition={scrollYPosition}>
      <VerticalList
        renderItem={renderItem}
        id="genre"
        ListHeaderComponent={
          <ThumbLink
            isLoading={isLoading}
            href={moviePath({ id: firstItem?.id })}
          >
            <LargeThumb
              type="movie"
              id={firstItem?.id}
              title={firstItem?.title}
              imageUrl={firstItem?.backdrop_path}
            />
          </ThumbLink>
        }
        isLoading={isLoading}
        getScrollYPosition={getScrollYPosition}
        results={data?.pages?.map((page) => page.results).flat()}
        onEndReached={loadMore}
        contentContainerStyle={containerStyle}
      />
    </GenreLayout>
  );
}
