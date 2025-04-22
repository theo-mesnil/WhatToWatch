import type { FlashListProps } from '@shopify/flash-list'

import { List } from '~/components/List'
import { NetworkThumb } from '~/components/NetworkThumb'
import { ThumbLink } from '~/components/ThumbLink'
import type { NetworksList } from '~/constants/networks'
import { networksList } from '~/constants/networks'
import { networkPath } from '~/routes'

type Item = NetworksList[number]

export function Networks() {
  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id } }) => (
    <ThumbLink href={networkPath({ id })}>
      <NetworkThumb aspectRatio={1 / 1} id={id} variant="minimalist" />
    </ThumbLink>
  )

  return (
    <List<Item> id="networks" numberOfItems={4} renderItem={renderItem} results={networksList} />
  )
}
