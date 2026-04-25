import { StyleSheet, View } from 'react-native'

import { Gradient } from '~/components/Gradient'
import { Icon } from '~/components/new/icon'
import { Text } from '~/components/new/text'
import { theme } from '~/theme'

export type CreditNumberThumbProps = {
  number: number
  title: React.ReactElement
  type: 'movie' | 'tv'
}

export function CreditNumberThumb({ number, title, type }: CreditNumberThumbProps) {
  return (
    <View style={styles.wrapper} testID={`credits-${type}`}>
      <Gradient angle={0.6} colors={[theme.colors['brand-100'], theme.colors.ahead]} />
      <View style={styles.content}>
        <View style={styles.icon}>
          <Icon name={type === 'movie' ? 'film' : 'tv'} size={80} />
        </View>
        <View>
          <Text className="-mt-1.5" variant="h0">
            {number}
          </Text>
          <Text className="uppercase" variant="h2">
            {title}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: -30,
    marginRight: theme.space.xs,
    opacity: 0.4,
  },
  number: {
    marginBottom: -theme.space.xs,
  },
  wrapper: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
  },
})
