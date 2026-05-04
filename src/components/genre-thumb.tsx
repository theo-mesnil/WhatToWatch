import { View } from 'react-native'

import { Text } from '~/components/text'
import { getGenreBorderClassName } from '~/utils/genres'

type GenreThumbProps = {
  id: number
  title?: string
}

export function GenreThumb({ id, title }: GenreThumbProps) {
  return (
    <View
      className={`px-5 h-10 justify-center rounded-full bg-white/10 border ${getGenreBorderClassName(id)}`}
    >
      <Text bold className="text-text-maximal" variant="lg">
        {title}
      </Text>
    </View>
  )
}
