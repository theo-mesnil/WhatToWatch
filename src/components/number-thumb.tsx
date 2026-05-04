import { View } from 'react-native'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import type { ContentType } from '~/types/content'

type NumberThumbProps = {
  imageUrl?: string
  number: number
  type: ContentType
}

export function NumberThumb({ imageUrl, number, type }: NumberThumbProps) {
  return (
    <Thumb imageUrl={imageUrl} type={type}>
      <View>
        <View className="absolute w-12 h-20">
          <Svg height="100%" width="100%">
            <Defs>
              <RadialGradient cx="50%" cy="50%" id="grad" r="65%">
                <Stop offset="0%" stopColor="#000000" stopOpacity="1" />
                <Stop offset="70%" stopColor="#000000" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect fill="url(#grad)" height="100%" width="100%" />
          </Svg>
        </View>
        <Text bold className="text-5xl text-text-maximal ml-2 mt-1">
          {number}
        </Text>
      </View>
    </Thumb>
  )
}
