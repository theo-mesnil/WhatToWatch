import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { personPath } from 'routes';

import type { UseGetPersonPopularApiResponse } from 'api/person';
import { useGetPersonPopular } from 'api/person';
import { List } from 'components/List';
import { PersonThumb } from 'components/PersonThumb';
import { ThumbLink } from 'components/ThumbLink';

export function PopularPerson() {
  const { data, isLoading } = useGetPersonPopular();

  const renderItem = ({
    item: { id, name, profile_path }
  }: ListRenderItemInfo<UseGetPersonPopularApiResponse['results'][number]>) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb imageUrl={profile_path} name={name} />
    </ThumbLink>
  );

  return (
    <List
      results={data?.results}
      title={<FormattedMessage key="title" defaultMessage="Stars" />}
      id="popular-person"
      renderItem={renderItem}
      isLoading={isLoading}
    />
  );
}
