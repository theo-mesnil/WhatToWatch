import { FormattedDate } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { Text } from 'components/Text'
import { Thumb } from 'components/Thumb'
import { theme } from 'theme'
import { formatTime } from 'utils/time'

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
          <Thumb type="tv" aspectRatio={16 / 9} imageUrl={imageUrl} />
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
                <FormattedDate month="2-digit" day="2-digit" value={new Date(airDate)} />
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
  wrapper: {
    gap: theme.space.xs,
  },
  main: {
    flexDirection: 'row',
  },
  thumb: {
    width: 150,
  },
  infos: {
    marginLeft: theme.space.md,
    flexShrink: 1,
    justifyContent: 'center',
    gap: theme.space.sm,
  },
  name: {
    color: theme.colors.white,
  },
  runtime: {
    flexDirection: 'row',
  },
})
