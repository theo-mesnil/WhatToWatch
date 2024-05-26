import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetDiscoverTvApiResponse } from 'api/discover';
import { useGetDiscoverTv } from 'api/discover';
import { List } from 'components/List';
import { TextThumb } from 'components/TextThumb';
import { ThumbLink } from 'components/ThumbLink';

export function PopularSeries() {
  const { data, isLoading } = useGetDiscoverTv({
    params: [
      { name: 'vote_count.gte', value: 2000 },
      { name: 'sort_by', value: 'vote_average.desc' }
    ]
  });

  const renderItem = ({
    item: { backdrop_path, id, name, overview, vote_average, vote_count }
  }: ListRenderItemInfo<UseGetDiscoverTvApiResponse['results'][number]>) => (
    <ThumbLink href={`/tv/${id}`}>
      <TextThumb
        tag={
          <>
            {Math.round(vote_average * 10) / 10} ({vote_count})
          </>
        }
        type="tv"
        imageUrl={backdrop_path}
        overview={overview}
        title={name}
      />
    </ThumbLink>
  );

  return (
    <List
      numberOfItems={1.5}
      results={data?.pages?.map((page) => page.results).flat()}
      title={
        <FormattedMessage
          key="title"
          defaultMessage="Popular series of all time"
        />
      }
      id="popular-series"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
