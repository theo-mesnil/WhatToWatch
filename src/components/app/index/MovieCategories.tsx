import type { FlashListProps } from '@shopify/flash-list';
import { FormattedMessage } from 'react-intl';

import type { UseGetGenreMovieListApiResponse } from 'api/genres';
import { useGetGenreMovieList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { ThumbLink } from 'components/ThumbLink';
import { genreMoviePath } from 'routes';

type Item = UseGetGenreMovieListApiResponse['genres'][number];

export function MovieCategories() {
  const { data, isLoading } = useGetGenreMovieList();

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { id, name }
  }) => (
    <ThumbLink href={genreMoviePath({ id })}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  );

  return (
    <List<Item>
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
