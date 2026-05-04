import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import type { Href } from 'expo-router'
import * as React from 'react'
import { Dimensions, View } from 'react-native'

import type { IconProps } from '~/components/icon'
import { ListTitle } from '~/components/list-title'
import { fakeData30 } from '~/constants/mocks'

type ListProps<ItemProps> = Pick<
  FlashListProps<ItemProps>,
  | 'ListHeaderComponent'
  | 'onViewableItemsChanged'
  | 'pagingEnabled'
  | 'renderItem'
  | 'viewabilityConfig'
> & {
  gap?: number
  icon?: IconProps['name']
  /** uniq id for performance */
  id: string
  isLoading?: boolean
  marginHorizontal?: number
  numberOfItems?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results?: any
  title?: React.ReactElement | string
  titleHref?: Href
  /** remove resize from List render item */
  withoutSizing?: boolean
}

export function List<ItemProps>({
  gap = 12,
  icon,
  id,
  isLoading,
  ListHeaderComponent,
  marginHorizontal = 16,
  numberOfItems = 3,
  onViewableItemsChanged,
  pagingEnabled,
  renderItem,
  results,
  title,
  titleHref,
  viewabilityConfig,
  withoutSizing,
}: ListProps<ItemProps>) {
  const dataFormatted = isLoading ? fakeData30 : results

  const screenWidth = Dimensions.get('window').width

  const itemSize =
    screenWidth / numberOfItems -
    gap -
    marginHorizontal / numberOfItems -
    marginHorizontal / numberOfItems

  const paddingHorizontal = pagingEnabled ? (screenWidth - itemSize) / 2 : marginHorizontal

  const internalRenderItem = (props: ListRenderItemInfo<ItemProps>) => {
    if (renderItem) {
      return (
        <View style={{ width: withoutSizing ? undefined : itemSize }}>{renderItem(props)}</View>
      )
    }

    return null
  }

  function renderListHeaderComponent() {
    if (ListHeaderComponent) {
      return (
        <View style={{ marginRight: gap, width: withoutSizing ? undefined : itemSize }}>
          {ListHeaderComponent as React.ReactElement}
        </View>
      )
    }
  }

  const renderTitle = (
    <ListTitle className="mx-screen" icon={icon} titleHref={titleHref}>
      {title ?? ''}
    </ListTitle>
  )

  function renderSeparators() {
    return <View style={{ width: gap }} />
  }

  return (
    <View>
      {!!title && renderTitle}
      <AnimatedFlashList
        bounces={false}
        contentContainerStyle={{ paddingHorizontal, paddingVertical: 4 }}
        data={dataFormatted}
        decelerationRate={pagingEnabled ? 'fast' : undefined}
        horizontal
        ItemSeparatorComponent={renderSeparators}
        keyExtractor={(_, index: number) =>
          isLoading ? `loading_${id}_${index}` : `${id}_${index}`
        }
        ListHeaderComponent={renderListHeaderComponent}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={internalRenderItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={pagingEnabled ? itemSize + gap : undefined}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  )
}
