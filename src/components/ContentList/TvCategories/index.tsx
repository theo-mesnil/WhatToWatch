import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { genreTvPath } from 'routes';

import type { UseGetGenreTvListApiResponse } from 'api/genres';
import { useGetGenreTvList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { ThumbLink } from 'components/ThumbLink';

export function TvCategories() {
  const { data, isLoading } = useGetGenreTvList();

  const renderItem = ({
    item: { id, name }
  }: ListRenderItemInfo<UseGetGenreTvListApiResponse['genres'][number]>) => (
    <ThumbLink href={genreTvPath({ id })}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  );

  return (
    <List
      withoutSizing
      results={data}
      title={
        <FormattedMessage key="title" defaultMessage="Series by categories" />
      }
      id="tv-categories"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
