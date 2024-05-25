import type { ListRenderItemInfo } from 'react-native';

import type { UseGetTrendingApiResponse } from 'api/trending';
import { useGetTrending } from 'api/trending';
import { List } from 'components/List';
import { NumberThumb } from 'components/NumberThumb';
import { ThumbLink } from 'components/ThumbLink';

export function Top10Movies() {
  const { data, isLoading } = useGetTrending({
    maxPages: 1,
    type: 'movie'
  });

  const renderItem = ({
    index,
    item: { id, poster_path }
  }: ListRenderItemInfo<
    UseGetTrendingApiResponse['movie']['results'][number]
  >) => (
    <ThumbLink href={`/movie/${id}`}>
      <NumberThumb number={index + 1} imageUrl={poster_path} type="movie" />
    </ThumbLink>
  );

  return (
    <List
      withoutSizing
      results={data?.pages
        ?.map((page) => page.results)
        .flat()
        .slice(0, 10)}
      title="Top 10 Movies"
      id="top-10-movie"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
