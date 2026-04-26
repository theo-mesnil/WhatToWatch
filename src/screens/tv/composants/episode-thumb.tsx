import { FormattedDate } from 'react-intl'
import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { formatTime } from '~/utils/time'

type EpisodeThumbProps = {
  airDate?: string
  imageUrl?: string
  name?: string
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
    <View className="gap-1.5">
      <View className="flex-row">
        <View className="w-[150px]">
          <Thumb aspectRatio={16 / 9} imageUrl={imageUrl} type="tv" />
        </View>
        <View className="shrink justify-center ml-3 gap-2">
          <Text className="text-text-maximal" variant="lg">
            {number}. {name}
          </Text>
          <View className="flex-row">
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
