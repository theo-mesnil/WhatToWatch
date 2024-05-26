import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetTrendingApiResponse } from 'api/trending';
import { useGetTrending } from 'api/trending';
import { List } from 'components/List';
import { NumberThumb } from 'components/NumberThumb';
import { ThumbLink } from 'components/ThumbLink';

export function Top10Series() {
  const { data, isLoading } = useGetTrending({
    maxPages: 1,
    type: 'tv'
  });

  const renderItem = ({
    index,
    item: { id, poster_path }
  }: ListRenderItemInfo<
    UseGetTrendingApiResponse['tv']['results'][number]
  >) => (
    <ThumbLink href={`/tv/${id}`}>
      <NumberThumb number={index + 1} imageUrl={poster_path} type="tv" />
    </ThumbLink>
  );

  return (
    <List
      withoutSizing
      results={data?.pages
        ?.map((page) => page.results)
        .flat()
        .slice(0, 10)}
      title={<FormattedMessage key="title" defaultMessage="Top 10 Series" />}
      id="top-10-series"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
