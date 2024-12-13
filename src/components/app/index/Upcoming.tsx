import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetMovieUpcomingApiResponse } from 'api/movie';
import { useGetMovieUpcoming } from 'api/movie';
import { List } from 'components/List';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { moviePath } from 'routes';

export function Upcoming() {
  const { data, isLoading } = useGetMovieUpcoming();

  const renderItem = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetMovieUpcomingApiResponse['results'][number]>) => (
    <ThumbLink href={moviePath({ id })}>
      <Thumb type="movie" imageUrl={poster_path} />
    </ThumbLink>
  );

  return (
    <List
      title={<FormattedMessage defaultMessage="Upcoming movies" id="AEBO3C" />}
      id="upcoming-movies"
      renderItem={renderItem}
      isLoading={isLoading}
      results={data?.results}
    />
  );
}
