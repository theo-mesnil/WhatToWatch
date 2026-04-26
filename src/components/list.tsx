import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import type { Href } from 'expo-router'
import * as React from 'react'
import { Dimensions, View } from 'react-native'

import type { IconProps } from '~/components/icon'
import { ListTitle } from '~/components/list-title'
import { fakeData30 } from '~/constants/mocks'

const MARGIN_LIST = 16

type ListProps<ItemProps> = Pick<
  FlashListProps<ItemProps>,
  'ListHeaderComponent' | 'renderItem'
> & {
  gap?: number
  icon?: IconProps['name']
  /** uniq id for performance */
  id: string
  isLoading?: boolean
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
  numberOfItems = 3,
  renderItem,
  results,
  title,
  titleHref,
  withoutSizing,
}: ListProps<ItemProps>) {
  const dataFormatted = isLoading ? fakeData30 : results

  const screenWidth = Dimensions.get('window').width

  const itemSize =
    screenWidth / numberOfItems - gap - MARGIN_LIST / numberOfItems - MARGIN_LIST / numberOfItems

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
        contentContainerStyle={{ paddingHorizontal: MARGIN_LIST }}
        data={dataFormatted}
        horizontal
        ItemSeparatorComponent={renderSeparators}
        keyExtractor={(_, index: number) =>
          isLoading ? `loading_${id}_${index}` : `${id}_${index}`
        }
        ListHeaderComponent={renderListHeaderComponent}
        renderItem={internalRenderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
