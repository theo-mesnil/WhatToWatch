import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';

import type { UseGetMovieUpcomingApiResponse } from 'api/movie';
import { useGetMovieUpcoming } from 'api/movie';
import { List } from 'components/List';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';

export function Upcoming() {
  const { data, isLoading } = useGetMovieUpcoming();

  const renderItem = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetMovieUpcomingApiResponse['results'][number]>) => (
    <ThumbLink href={`/movie/${id}`}>
      <Thumb type="movie" imageUrl={poster_path} />
    </ThumbLink>
  );

  return (
    <List
      title={<FormattedMessage key="title" defaultMessage="Upcoming movies" />}
      id="upcoming-movies"
      renderItem={renderItem}
      isLoading={isLoading}
      results={data?.results}
    />
  );
}
