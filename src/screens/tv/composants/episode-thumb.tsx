import { FormattedDate, FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { formatTime } from '~/utils/time'

export type EpisodeThumbProps = {
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
    <Thumb aspectRatio={16 / 15} imageUrl={imageUrl} imageWidth="w780" type="tv">
      <View className="absolute left-0 right-0 bottom-0 top-[30%] justify-end bg-linear-180 from-transparent via-background-fixed/80 to-background-fixed/95 p-3 gap-0.5">
        <Text className="uppercase light:text-neutral-300" variant="sm">
          <FormattedMessage defaultMessage="Episode {number}" id="xf6y+C" values={{ number }} />
        </Text>
        <Text
          bold
          className="text-text-maximal light:text-white"
          numberOfLines={overview ? 1 : 2}
          variant="lg"
        >
          {name}
        </Text>
        {overview && (
          <Text className="leading-tight light:text-neutral-300" numberOfLines={3} variant="sm">
            {overview}
          </Text>
        )}
        <View className="flex-row items-center">
          {runtime && runtime > 0 ? (
            <Text className="text-text-maximal light:text-neutral-300" variant="sm">
              {formatTime(runtime)}
            </Text>
          ) : undefined}
          {airDate && (
            <Text className="text-text-maximal light:text-neutral-300" variant="sm">
              {runtime && runtime > 0 ? ' • ' : ''}
              <FormattedDate day="2-digit" month="2-digit" value={new Date(airDate)} />
            </Text>
          )}
        </View>
      </View>
    </Thumb>
  )
}
