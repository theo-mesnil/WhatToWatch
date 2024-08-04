import { FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo } from 'react-native';

import type { UseGetGenreMovieListApiResponse } from 'api/genres';
import { useGetGenreMovieList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { ThumbLink } from 'components/ThumbLink';

export function MovieCategories() {
  const { data, isLoading } = useGetGenreMovieList();

  const renderItem = ({
    item: { id, name }
  }: ListRenderItemInfo<UseGetGenreMovieListApiResponse['genres'][number]>) => (
    <ThumbLink href={`/genre/movie/${id}`}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  );

  return (
    <List
      withoutSizing
      results={data}
      title={
        <FormattedMessage key="title" defaultMessage="Movies by categories" />
      }
      id="categories-movie"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
