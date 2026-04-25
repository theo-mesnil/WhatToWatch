import { Image } from 'expo-image'
import { View } from 'react-native'
import { withUniwind } from 'uniwind'

import { Text } from '~/components/text'

const UniwindExpoImage = withUniwind(Image)

type AvatarProps = {
  imageUrl?: string
  name?: string
  size?: number
}

export function Avatar({ imageUrl, name, size = 40 }: AvatarProps) {
  const fontSize = size * 0.35

  const avatarStyles = 'items-center bg-violet-800 justify-center rounded-full'
  const styles = {
    height: size,
    width: size,
  }

  if (imageUrl) {
    return <UniwindExpoImage className={avatarStyles} source={imageUrl} style={styles} />
  }

  return (
    <View className={avatarStyles} style={styles}>
      <Text className="text-text-maximal" style={{ fontSize }} variant="h1">
        {name
          ?.split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('')}
      </Text>
    </View>
  )
}
