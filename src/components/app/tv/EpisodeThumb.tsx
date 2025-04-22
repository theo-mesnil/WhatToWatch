import { FormattedDate } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { theme } from '~/theme'
import { formatTime } from '~/utils/time'

export type EpisodeThumbProps = {
  airDate?: string
  imageUrl: string
  name: string
  number: number
  overview?: string
  runtime?: number
}

export function EpisodeThumb({
  airDate,
  imageUrl,
  name,
  number,
  overview,
  runtime,
}: EpisodeThumbProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.main}>
        <View style={styles.thumb}>
          <Thumb aspectRatio={16 / 9} imageUrl={imageUrl} type="tv" />
        </View>
        <View style={styles.infos}>
          <Text style={styles.name} variant="lg">
            {number}. {name}
          </Text>
          <View style={styles.runtime}>
            {runtime && <Text>{formatTime(runtime)}</Text>}
            {airDate && (
              <Text>
                {runtime && ' • '}
                <FormattedDate day="2-digit" month="2-digit" value={new Date(airDate)} />
              </Text>
            )}
          </View>
        </View>
      </View>
      {overview && <Text numberOfLines={4}>{overview}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  infos: {
    flexShrink: 1,
    gap: theme.space.sm,
    justifyContent: 'center',
    marginLeft: theme.space.md,
  },
  main: {
    flexDirection: 'row',
  },
  name: {
    color: theme.colors.white,
  },
  runtime: {
    flexDirection: 'row',
  },
  thumb: {
    width: 150,
  },
  wrapper: {
    gap: theme.space.xs,
  },
})
