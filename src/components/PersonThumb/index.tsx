import { StyleSheet, View } from 'react-native'

import { Text } from 'components/Text'
import { Thumb } from 'components/Thumb'
import { theme } from 'theme'

export type PersonThumbProps = {
  character?: string
  imageUrl: string
  name: string
}

export function PersonThumb({ character, imageUrl, name }: PersonThumbProps) {
  return (
    <View>
      <Thumb aspectRatio={6 / 7} type="person" imageUrl={imageUrl} />
      <View style={styles.text}>
        <Text variant="h3" numberOfLines={2}>
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
