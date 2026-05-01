import { View } from 'react-native'

import { Text } from '~/components/text'
import { getGenreBackgroundClassName } from '~/utils/genres'

type GenreThumbProps = {
  id: number
  title?: string
}

export function GenreThumb({ id, title }: GenreThumbProps) {
  return (
    <View
      className={`w-screen-lg aspect-video rounded-lg overflow-hidden ${getGenreBackgroundClassName(id)}`}
    >
      <View className="aspect-video justify-end p-3">
        <Text className="bottom-3 absolute left-3 text-text-maximal" variant="h1">
          {title}
        </Text>
        <Text className="bottom-3 absolute left-3 text-text-maximal opacity-30 z-1" variant="h1">
          {title}
        </Text>
      </View>
    </View>
  )
}
