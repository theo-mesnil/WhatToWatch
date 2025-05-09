import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'

export type TextThumbProps = {
  imageUrl: string
  overview?: string
  tag?: React.ReactElement
  title: string
  type: ContentType
}

export function TextThumb({ imageUrl, overview, tag, title, type }: TextThumbProps) {
  return (
    <View style={styles.wrapper}>
      <Thumb aspectRatio={16 / 9} imageUrl={imageUrl} imageWidth="w500" type={type} />
      {tag && <Text style={styles.tag}>{tag}</Text>}
      <Text numberOfLines={1} variant="h3">
        {title}
      </Text>
      {overview && <Text numberOfLines={3}>{overview}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    textTransform: 'uppercase',
  },
  wrapper: { gap: theme.space.xs },
})
