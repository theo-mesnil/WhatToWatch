import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { moviePath } from 'routes';

import type { UseGetMovieNowPlayingApiResponse } from 'api/movie';
import { useGetMovieNowPlaying } from 'api/movie';
import { List } from 'components/List';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';

export function InTheaters() {
  const { data, isLoading } = useGetMovieNowPlaying();

  const renderItem = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<
    UseGetMovieNowPlayingApiResponse['results'][number]
  >) => (
    <ThumbLink href={moviePath({ id })}>
      <Thumb type="movie" imageUrl={poster_path} />
    </ThumbLink>
  );

  return (
    <List
      title={<FormattedMessage key="title" defaultMessage="In Theaters" />}
      id="in-theaters"
      renderItem={renderItem}
      isLoading={isLoading}
      results={data?.results}
    />
  );
}
