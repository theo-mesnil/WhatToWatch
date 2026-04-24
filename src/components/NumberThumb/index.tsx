import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/new/text'
import { Thumb } from '~/components/Thumb'
import type { ContentType } from '~/types/content'

export type NumberThumbProps = {
  imageUrl?: string
  number: number
  type: ContentType
}

export function NumberThumb({ imageUrl, number, type }: NumberThumbProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.numberWrapper}>
        <Text className="flex-row text-violet-500 text-8xl leading-28 -tracking-[15]" variant="h0">
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
