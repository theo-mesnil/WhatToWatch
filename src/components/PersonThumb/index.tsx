import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { theme } from '~/theme'

export type PersonThumbProps = {
  character?: string
  imageUrl: string
  name: string
}

export function PersonThumb({ character, imageUrl, name }: PersonThumbProps) {
  return (
    <View>
      <Thumb aspectRatio={6 / 7} imageUrl={imageUrl} type="person" />
      <View style={styles.text}>
        <Text numberOfLines={2} variant="h3">
          {name}
        </Text>
        {character && <Text numberOfLines={2}>{character}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: theme.space.xs,
  },
})
