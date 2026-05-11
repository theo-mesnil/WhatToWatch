import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import * as React from 'react'
import { useWindowDimensions, View } from 'react-native'

import { buildPlaceholderData } from '~/constants/mocks'

const MARGIN_LIST = 16

type VerticalListProps<ItemProps> = Pick<
  FlashListProps<ItemProps>,
  'ListHeaderComponent' | 'numColumns' | 'onEndReached' | 'renderItem'
> & {
  gap?: number
  /** uniq id for performance */
  id: string
  isLoading?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results?: any
}

export function VerticalList<ItemProps>({
  gap = 8,
  id,
  isLoading,
  ListHeaderComponent,
  numColumns = 3,
  onEndReached,
  renderItem,
  results,
}: VerticalListProps<ItemProps>) {
  const { width } = useWindowDimensions()
  const dataFormatted = isLoading ? buildPlaceholderData(numColumns * 4) : results
  const availableSpace = width - MARGIN_LIST * 2
  const itemSize = (availableSpace - gap * (numColumns - 1)) / numColumns

  const internalRenderItem = (props: ListRenderItemInfo<ItemProps>) => {
    if (!renderItem) return null
    return (
      <View style={{ marginBottom: gap, marginRight: gap, width: itemSize }}>
        {renderItem(props)}
      </View>
    )
  }

  function renderListHeaderComponent() {
    if (ListHeaderComponent) {
      return (
        <View className="mb-4" style={{ width: availableSpace }}>
          {ListHeaderComponent as React.ReactElement}
        </View>
      )
    }

    return null
  }

  return (
    <AnimatedFlashList
      bounces={false}
      contentContainerStyle={{
        paddingLeft: MARGIN_LIST,
        paddingRight: MARGIN_LIST - gap,
      }}
      data={dataFormatted}
      keyExtractor={(_, index: number) => (isLoading ? `loading_${id}_${index}` : `${id}_${index}`)}
      ListHeaderComponent={renderListHeaderComponent}
      numColumns={numColumns}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      renderItem={internalRenderItem}
      showsVerticalScrollIndicator={false}
    />
  )
}
