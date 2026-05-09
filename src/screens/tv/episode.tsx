import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { UseGetTvEpisodeApiResponse } from '~/api/tv'
import { useGetTvEpisode } from '~/api/tv'
import { Badge } from '~/components/badge'
import { List } from '~/components/list'
import { Loader } from '~/components/loader'
import { PersonThumb } from '~/components/person-thumb'
import { ReadMore } from '~/components/read-more'
import { Text } from '~/components/text'
import { Thumb } from '~/components/thumb'
import { ThumbLink } from '~/components/thumb-link'
import { ModalLayout } from '~/layouts/modal'
import { personPath } from '~/routes'
import { formatTime } from '~/utils/time'

type CrewItem = NonNullable<UseGetTvEpisodeApiResponse['crew']>[number]
type GuestStarItem = NonNullable<UseGetTvEpisodeApiResponse['guest_stars']>[number]

const RELEVANT_CREW_JOBS = ['Director', 'Writer', 'Screenplay', 'Story']

export default function Episode() {
  const params = useLocalSearchParams<{
    episode: string
    id: string
    season: string
  }>()
  const tvID = Number(params.id)
  const seasonNumber = Number(params.season)
  const episodeNumber = Number(params.episode)

  const { data, isLoading } = useGetTvEpisode({
    episodeNumber,
    id: tvID,
    seasonNumber,
  })

  const stillPath = data?.still_path
  const name = data?.name
  const overview = data?.overview
  const runtime = data?.runtime
  const airDate = data?.air_date
  const voteAverage = data?.vote_average
  const voteCount = data?.vote_count
  const guestStars = data?.guest_stars
  const crew = data?.crew?.filter(item => item.job && RELEVANT_CREW_JOBS.includes(item.job))

  const renderItemGuestStar: FlashListProps<GuestStarItem>['renderItem'] = ({
    item: { character, id, name, profile_path },
  }) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb character={character} imageUrl={profile_path} name={name} />
    </ThumbLink>
  )

  const renderItemCrew: FlashListProps<CrewItem>['renderItem'] = ({
    item: { id, job, name, profile_path },
  }) => (
    <ThumbLink href={personPath({ id })}>
      <PersonThumb character={job} imageUrl={profile_path} name={name} />
    </ThumbLink>
  )

  return (
    <ModalLayout
      title={
        <FormattedMessage
          defaultMessage="S{season} · E{episode}"
          id="Clg06n"
          values={{ episode: episodeNumber, season: seasonNumber }}
        />
      }
    >
      <View className="px-screen gap-4">
        <Thumb aspectRatio={16 / 9} imageUrl={stillPath} imageWidth="w780" type="tv" />
        <View className="gap-2">
          <Text className="uppercase light:text-neutral-500" variant="sm">
            <FormattedMessage
              defaultMessage="Season {season} · Episode {episode}"
              id="rCmsRa"
              values={{ episode: episodeNumber, season: seasonNumber }}
            />
          </Text>
          {isLoading ? <Loader className="h-7 w-2/3 rounded" /> : <Text variant="h1">{name}</Text>}
        </View>
        <View className="flex-row flex-wrap gap-2">
          {!!runtime && runtime > 0 && (
            <Badge icon="time" testID="runtime">
              {formatTime(runtime)}
            </Badge>
          )}
          {!!airDate && (
            <Badge testID="air-date">
              <FormattedDate day="2-digit" month="long" value={new Date(airDate)} year="numeric" />
            </Badge>
          )}
          {!!voteAverage && (
            <Badge icon="star" testID="votes" variant="vote">
              {Math.round(voteAverage * 10) / 10} ({voteCount})
            </Badge>
          )}
        </View>
        {!!overview && <ReadMore>{overview}</ReadMore>}
      </View>
      {(isLoading || !!crew?.length) && (
        <List<CrewItem>
          id="episode-crew"
          isLoading={isLoading}
          renderItem={renderItemCrew}
          results={crew}
          title={<FormattedMessage defaultMessage="Crew" id="fAUo5l" />}
        />
      )}
      {(isLoading || !!guestStars?.length) && (
        <List<GuestStarItem>
          id="episode-guest-stars"
          isLoading={isLoading}
          renderItem={renderItemGuestStar}
          results={guestStars}
          title={<FormattedMessage defaultMessage="Guest stars" id="g04JBN" />}
        />
      )}
    </ModalLayout>
  )
}
