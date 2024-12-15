import type { FlashListProps } from '@shopify/flash-list';
import { FormattedMessage } from 'react-intl';

import type { UseGetGenreTvListApiResponse } from 'api/genres';
import { useGetGenreTvList } from 'api/genres';
import { GenreThumb } from 'components/GenreThumb';
import { List } from 'components/List';
import { ThumbLink } from 'components/ThumbLink';
import { genreTvPath } from 'routes';

type Item = UseGetGenreTvListApiResponse['genres'][number];

export function TvCategories() {
  const { data, isLoading } = useGetGenreTvList();

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { id, name }
  }) => (
    <ThumbLink href={genreTvPath({ id })}>
      <GenreThumb id={id} title={name} />
    </ThumbLink>
  );

  return (
    <List<Item>
      withoutSizing
      results={data}
      title={
        <FormattedMessage defaultMessage="Series by categories" id="9Pg5Uj" />
      }
      id="tv-categories"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
