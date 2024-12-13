import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetMovieNowPlayingApiResponse } from 'api/movie';
import { useGetMovieNowPlaying } from 'api/movie';
import { List } from 'components/List';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { moviePath } from 'routes';

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
      title={<FormattedMessage defaultMessage="In Theaters" id="zzTAaI" />}
      id="in-theaters"
      renderItem={renderItem}
      isLoading={isLoading}
      results={data?.results}
    />
  );
}
