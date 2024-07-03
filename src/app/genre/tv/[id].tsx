import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetDiscoverTvApiResponse } from 'api/discover';
import { useGetDiscoverTv } from 'api/discover';
import { LargeThumb } from 'components/LargeThumb';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';

import { ScrollYPositionContext } from '../_layout';

export default function Tv() {
  const getScrollYPosition = React.useContext(ScrollYPositionContext);
  const params = useLocalSearchParams<{ id: string }>();
  const genreID = Number(params?.id);
  const { containerStyle } = useSafeHeights();

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTv({
    params: [{ name: 'with_genres', value: `${genreID}` }]
  });

  const firstItem = !isLoading && data?.pages[0].results[0];

  const renderItem = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetDiscoverTvApiResponse['results'][number]>) => (
    <ThumbLink isLoading={isLoading} href={`/tv/${id}`}>
      <Thumb type="tv" imageUrl={poster_path} />
    </ThumbLink>
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <VerticalList
      renderItem={renderItem}
      id="genre"
      ListHeaderComponent={
        <ThumbLink isLoading={isLoading} href={`/tv/${firstItem?.id}`}>
          <LargeThumb
            type="tv"
            id={firstItem?.id}
            title={firstItem?.name}
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
  );
}
