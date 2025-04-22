import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list'
import { AnimatedFlashList } from '@shopify/flash-list'
import type { Href } from 'expo-router'
import * as React from 'react'
import { Dimensions, View } from 'react-native'

import { ListTitle } from 'components/ListTitle'
import { fakeData30 } from 'constants/mocks'
import { globalStyles } from 'styles'
import { theme } from 'theme'

type ListProps<ItemProps> = Pick<
  FlashListProps<ItemProps>,
  'ListHeaderComponent' | 'renderItem'
> & {
  gap?: number
  /** uniq id for performance */
  id: string
  isLoading?: boolean
  numberOfItems?: number
  results?: any
  title?: JSX.Element | string
  titleHref?: Href
  /** remove resize from List render item */
  withoutSizing?: boolean
}

export function List<ItemProps>({
  gap = theme.space.md,
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

  const itemSize = React.useMemo(
    () =>
      screenWidth / numberOfItems -
      gap -
      theme.space.marginList / numberOfItems -
      theme.space.lg / numberOfItems,
    [screenWidth, numberOfItems, gap]
  )

  const internalRenderItem = React.useCallback(
    (props: ListRenderItemInfo<ItemProps>) => {
      if (renderItem) {
        return (
          <View
            style={{
              width: withoutSizing ? undefined : itemSize,
            }}
          >
            {renderItem(props)}
          </View>
        )
      }

      return null
    },
    [itemSize, renderItem, withoutSizing]
  )

  function renderListHeaderComponent() {
    if (ListHeaderComponent) {
      return (
        <View
          style={{
            width: withoutSizing ? undefined : itemSize,
            marginRight: gap,
          }}
        >
          {ListHeaderComponent as React.ReactElement}
        </View>
      )
    }
  }

  const renderTitle = React.useMemo(
    () => (
      <ListTitle titleHref={titleHref} style={globalStyles.centered}>
        {title}
      </ListTitle>
    ),
    [title, titleHref]
  )

  function renderSeparators() {
    return <View style={{ width: gap }} />
  }

  return (
    <View>
      {!!title && renderTitle}
      <AnimatedFlashList
        bounces={false}
        data={dataFormatted}
        keyExtractor={(_, index: number) =>
          isLoading ? `loading_${id}_${index}` : `${id}_${index}`
        }
        ListHeaderComponent={renderListHeaderComponent}
        estimatedItemSize={itemSize}
        renderItem={internalRenderItem}
        horizontal
        ItemSeparatorComponent={renderSeparators}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.space.marginList,
        }}
      />
    </View>
  )
}
