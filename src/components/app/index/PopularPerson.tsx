import type { FlashListProps } from '@shopify/flash-list';
import { FormattedMessage } from 'react-intl';

import type { UseGetPersonPopularApiResponse } from 'api/person';
import { useGetPersonPopular } from 'api/person';
import { List } from 'components/List';
import { PersonThumb } from 'components/PersonThumb';
import { ThumbLink } from 'components/ThumbLink';
import { personPath } from 'routes';

type Item = UseGetPersonPopularApiResponse['results'][number];

export function PopularPerson() {
  const { data, isLoading } = useGetPersonPopular();

  const renderItem: FlashListProps<Item>['renderItem'] = ({
    item: { id, name, profile_path }
  }) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb imageUrl={profile_path} name={name} />
    </ThumbLink>
  );

  return (
    <List<Item>
      results={data?.results}
      title={<FormattedMessage defaultMessage="Stars" id="eo4WjQ" />}
      id="popular-person"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
