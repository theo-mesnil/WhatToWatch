import type { FlashListProps } from '@shopify/flash-list'

import { List } from 'components/List'
import { NetworkThumb } from 'components/NetworkThumb'
import { ThumbLink } from 'components/ThumbLink'
import type { NetworksList } from 'constants/networks'
import { networksList } from 'constants/networks'
import { networkPath } from 'routes'

type Item = NetworksList[number]

export function Networks() {
  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id } }) => (
    <ThumbLink href={networkPath({ id })}>
      <NetworkThumb id={id} variant="minimalist" aspectRatio={1 / 1} />
    </ThumbLink>
  )

  return (
    <List<Item> numberOfItems={4} id="networks" renderItem={renderItem} results={networksList} />
  )
}
