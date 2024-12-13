import { FormattedMessage } from 'react-intl';
import { type ListRenderItemInfo } from 'react-native';

import type { UseGetGenreMovieListApiResponse } from 'api/genres';
import { useGetGenreMovieList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { ThumbLink } from 'components/ThumbLink';
import { genreMoviePath } from 'routes';

export function MovieCategories() {
  const { data, isLoading } = useGetGenreMovieList();

  const renderItem = ({
    item: { id, name }
  }: ListRenderItemInfo<UseGetGenreMovieListApiResponse['genres'][number]>) => (
    <ThumbLink href={genreMoviePath({ id })}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  );

  return (
    <List
      withoutSizing
      results={data}
      title={
        <FormattedMessage defaultMessage="Movies by categories" id="6PpgeA" />
      }
      id="categories-movie"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
