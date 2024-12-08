import type { ListRenderItemInfo } from 'react-native';
import { networkPath } from 'routes';

import { List } from 'components/List';
import { NetworkThumb } from 'components/NetworkThumb';
import { ThumbLink } from 'components/ThumbLink';
import { networksList } from 'constants/networks';

export function Networks() {
  const renderItem = ({
    item: { id }
  }: ListRenderItemInfo<(typeof networksList)[number]>) => (
    <ThumbLink href={networkPath({ id })}>
      <NetworkThumb id={id} variant="minimalist" aspectRatio={1 / 1} />
    </ThumbLink>
  );

  return (
    <List
      numberOfItems={4}
      id="networks"
      renderItem={renderItem}
      results={networksList}
    />
  );
}
