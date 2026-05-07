import { View } from 'react-native'

import { Loader } from '~/components/loader'
import { Text } from '~/components/text'
import { getGenreBorderClassName } from '~/utils/genres'

type GenreThumbProps = {
  id: number
  isLoading?: boolean
  title?: string
}

export function GenreThumb({ id, isLoading, title }: GenreThumbProps) {
  if (isLoading) {
    return <Loader className="h-10 w-30 rounded-full" />
  }

  return (
    <View
      className={`px-5 h-10 justify-center rounded-full border bg-white/10 light:bg-white/50 ${getGenreBorderClassName(id)}`}
    >
      <Text bold className="text-text-maximal" variant="lg">
        {title}
      </Text>
    </View>
  )
}
