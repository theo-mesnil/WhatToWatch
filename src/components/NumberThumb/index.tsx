import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'

export type NumberThumbProps = {
  imageUrl: string
  number: number
  type: ContentType
}

export function NumberThumb({ imageUrl, number, type }: NumberThumbProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.numberWrapper}>
        <Text style={styles.number} variant="h0">
          {number}
        </Text>
      </View>
      <View style={[styles.thumb, number === 1 && styles.firstNumber]}>
        <Thumb imageUrl={imageUrl} type={type} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  firstNumber: {
    marginLeft: 37,
  },
  number: {
    color: theme.colors['brand-500'],
    flexDirection: 'row',
    fontSize: 100,
    letterSpacing: -15,
    lineHeight: 100,
  },
  numberWrapper: {
    bottom: -20,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
  },
  thumb: {
    marginLeft: 45,
    width: 110,
  },
  wrapper: { flexDirection: 'row' },
})
