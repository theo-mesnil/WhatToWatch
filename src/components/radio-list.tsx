import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list'
import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { Pressable, View } from 'react-native'

import { Icon } from '~/components/icon'
import { Text } from '~/components/text'

type ExtendsPropsItem = {
  disabled?: boolean
  id: string
}

type RadioListProps<T extends ExtendsPropsItem> = Pick<FlashListProps<T>, 'data'> & {
  id: string
  onPress?: (item: T) => void
  renderItem?: FlashListProps<T>['renderItem']
  selectedId: string
}

const ItemSeparator = () => <View className="border-b border-b-border-default/30 my-3" />

export function RadioList<T extends ExtendsPropsItem>({
  data,
  id,
  onPress,
  renderItem,
  selectedId,
}: RadioListProps<T>) {
  function keyExtractor(_: T, index: number) {
    return `${id}-${index}`
  }

  function renderItemWithRadio(props: ListRenderItemInfo<T>) {
    const itemId = props.item.id
    const isDisabled = props.item.disabled
    const isSelected = itemId === selectedId
    const isFirst = props.index === 0
    const isLast = props.index === (data?.length ?? 0) - 1

    return (
      <Pressable
        className={`flex-row items-center gap-3 w-full px-1 justify-between ${isFirst ? '' : 'pt-1'} ${isLast ? '' : 'pb-1'}`}
        disabled={props.item.disabled}
        onPress={onPress && !isDisabled ? () => onPress(props.item) : undefined}
        style={({ pressed }) => (pressed && !isDisabled ? { opacity: 0.5 } : undefined)}
        testID={`${id}-${itemId}`}
      >
        {renderItem?.(props)}
        {isSelected && (
          <View
            className="size-6 rounded-full justify-center items-center bg-violet-600"
            testID={`${id}-${itemId}-selected`}
          >
            <Icon className="text-white" name="checkmark-sharp" size={20} />
          </View>
        )}
      </Pressable>
    )
  }

  if (data && data.length === 0) return null

  return (
    <FlashList
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={keyExtractor}
      renderItem={renderItemWithRadio}
      showsVerticalScrollIndicator={false}
    />
  )
}

export function RadioListItem({ children }: { children: string }) {
  return <Text variant="lg">{children}</Text>
}
