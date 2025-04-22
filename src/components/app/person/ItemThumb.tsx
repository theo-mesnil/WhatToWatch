import { FormattedDate } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'

export type ItemThumbProps = {
  date?: string
  isLoading?: boolean
  overview?: string
  posterUrl: string
  subtitle?: string
  title: string
  type: ContentType
}

export function ItemThumb({ date, overview, posterUrl, subtitle, title, type }: ItemThumbProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.thumb}>
        <Thumb imageUrl={posterUrl} type={type} />
      </View>
      <View style={styles.content}>
        <View style={styles.infos}>
          <Text variant="h3">{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle} variant="h3">
              {subtitle}
            </Text>
          )}
          {date && (
            <Text>
              <FormattedDate value={new Date(date)} />
            </Text>
          )}
        </View>
        {overview && (
          <Text numberOfLines={4} style={styles.overview}>
            {overview}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  infos: {
    gap: theme.space.xxs,
  },
  overview: {
    marginTop: theme.space.md,
  },
  subtitle: {
    color: theme.colors.text,
  },
  thumb: {
    width: 100,
  },
  wrapper: {
    flexDirection: 'row',
    gap: theme.space.md,
  },
})
