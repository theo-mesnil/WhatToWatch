import { FormattedDate, FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetDiscoverMovieApiResponse } from 'api/discover';
import { useGetDiscoverMovie } from 'api/discover';
import { List } from 'components/List';
import { TextThumb } from 'components/TextThumb';
import { ThumbLink } from 'components/ThumbLink';
import { genreMoviePath, moviePath } from 'routes';

export function Family() {
  const { data, isLoading } = useGetDiscoverMovie({
    params: [{ name: 'with_genres', value: '10751' }]
  });

  const renderItem = ({
    item: { backdrop_path, id, overview, release_date, title }
  }: ListRenderItemInfo<UseGetDiscoverMovieApiResponse['results'][number]>) => (
    <ThumbLink href={moviePath({ id })}>
      <TextThumb
        tag={<FormattedDate value={new Date(release_date)} />}
        type="movie"
        imageUrl={backdrop_path}
        overview={overview}
        title={title}
      />
    </ThumbLink>
  );

  return (
    <List
      titleHref={genreMoviePath({ id: 10751 })}
      numberOfItems={1.5}
      results={data?.pages?.map((page) => page.results).flat()}
      title={<FormattedMessage defaultMessage="Family movies" id="o2T5zr" />}
      id="documentaries"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
