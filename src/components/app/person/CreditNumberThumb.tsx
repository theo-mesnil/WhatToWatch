import { StyleSheet, View } from 'react-native'

import { Gradient } from '~/components/Gradient'
import { Icon, MovieFillIcon, TvFillIcon } from '~/components/Icon'
import { Text } from '~/components/Text'
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
          <Icon
            color="default-900"
            icon={type === 'movie' ? MovieFillIcon : TvFillIcon}
            size={80}
          />
        </View>
        <View>
          <Text style={styles.number} variant="h0">
            {number}
          </Text>
          <Text style={styles.title} variant="h2">
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
    opacity: 0.4,
  },
  number: {
    marginBottom: -theme.space.xs,
  },
  title: {
    textTransform: 'capitalize',
  },
  wrapper: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
  },
})
