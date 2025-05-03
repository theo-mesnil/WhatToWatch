import { Image, StyleSheet, View } from 'react-native'

import { theme } from '~/theme'

import { Text } from '../Text'

type AvatarProps = {
  imageUrl?: string
  name: string
  size?: number
}

export function Avatar({ imageUrl, name, size = 40 }: AvatarProps) {
  const fontSize = size * 0.35

  if (imageUrl) {
    return (
      <Image source={{ uri: imageUrl }} style={[styles.wrapper, { height: size, width: size }]} />
    )
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          height: size,
          width: size,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize }]} variant="h1">
        {name
          ?.split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  initials: {
    color: theme.colors.white,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors['brand-200'],
    borderRadius: 999,
    justifyContent: 'center',
  },
})
