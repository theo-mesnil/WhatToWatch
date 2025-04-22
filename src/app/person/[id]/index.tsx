import type { FlashListProps } from '@shopify/flash-list'
import { intervalToDuration } from 'date-fns'
import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import type { UseGetPersonCreditsApiResponse, UseGetPersonImagesApiResponse } from '~/api/person'
import {
  useGetPerson,
  useGetPersonCredits,
  useGetPersonImages,
  useGetPersonMovieCredits,
  useGetPersonTvCredits,
} from '~/api/person'
import { CreditNumberThumb } from '~/components/app/person/CreditNumberThumb'
import { ReadMore } from '~/components/app/person/ReadMore'
import { Badge } from '~/components/Badge'
import { List } from '~/components/List'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { ContentLayout } from '~/layouts//Content'
import { personImagePath, personMoviesPath, personTvPath } from '~/routes'
import { routeByType } from '~/routes/utils'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

type CastItem = UseGetPersonCreditsApiResponse['cast'][number]
type ImageItem = UseGetPersonImagesApiResponse['profiles'][number]

export default function Person() {
  const params = useLocalSearchParams<{ id: string }>()
  const personID = Number(params?.id)

  const { data, isLoading } = useGetPerson({ id: personID })
  const { data: images, isLoading: isLoadingImages } = useGetPersonImages({
    id: personID,
  })

  const biography = data?.biography
  const birthday = data?.birthday
  const coverUrl = data?.coverUrl
  const deathday = data?.deathday
  const department = data?.department
  const isActing = department === 'Acting'
  const name = data?.name
  const placeOfBirth = data?.placeOfBirth

  const { data: tv, isLoading: isLoadingTv } = useGetPersonTvCredits({
    id: personID,
    isActing,
  })
  const { data: credits, isLoading: isLoadingCredits } = useGetPersonCredits({
    id: personID,
    isActing,
  })
  const { data: movies, isLoading: isLoadingMovies } = useGetPersonMovieCredits({
    id: personID,
    isActing,
  })

  const numberOfMovies = movies?.length
  const numberOfTvShows = tv?.length

  const renderItemImage: FlashListProps<ImageItem>['renderItem'] = ({
    index,
    item: { file_path },
  }) => (
    <ThumbLink href={personImagePath({ id: personID, start: index })}>
      <Thumb imageUrl={file_path} type="person" />
    </ThumbLink>
  )

  const renderCreditImage: FlashListProps<CastItem>['renderItem'] = ({
    item: { id, media_type, poster_path },
  }) => {
    const type = media_type === 'movie' ? 'movie' : 'tv'

    return (
      <ThumbLink href={routeByType({ id, type })}>
        <Thumb imageUrl={poster_path} imageWidth="w500" type={type} />
      </ThumbLink>
    )
  }

  return (
    <ContentLayout
      badges={
        <>
          {!!department && <Badge testID="department">{department}</Badge>}
          {!!birthday && (
            <Badge testID="birthday">
              <>
                <FormattedMessage defaultMessage="Born on" id="/QsGmC" />{' '}
                <FormattedDate
                  day="numeric"
                  month="long"
                  value={new Date(birthday)}
                  year="numeric"
                />
                {!deathday && (
                  <>
                    {' ('}
                    {
                      intervalToDuration({
                        end: new Date(),
                        start: new Date(birthday),
                      }).years
                    }
                    <FormattedMessage defaultMessage="y" id="EhtHdK" />)
                  </>
                )}
              </>
            </Badge>
          )}
          {!!deathday && (
            <Badge testID="deathday">
              <FormattedMessage defaultMessage="Died on" id="jMuk1E" />{' '}
              <FormattedDate day="numeric" month="long" value={new Date(deathday)} year="numeric" />
              <>
                {' ('}
                {
                  intervalToDuration({
                    end: new Date(deathday),
                    start: new Date(birthday),
                  }).years
                }
                <FormattedMessage defaultMessage="y" id="EhtHdK" />)
              </>
            </Badge>
          )}
          {!!placeOfBirth && <Badge testID="place-of-birth">{placeOfBirth}</Badge>}
          {!!numberOfMovies && (
            <Badge testID="movies">
              {numberOfMovies}{' '}
              {numberOfMovies === 1 && <FormattedMessage defaultMessage="movie" id="RzXthk" />}
              {numberOfMovies > 1 && <FormattedMessage defaultMessage="movies" id="2xXGzb" />}
            </Badge>
          )}
          {!!numberOfTvShows && (
            <Badge testID="series">
              {numberOfTvShows}{' '}
              {numberOfTvShows === 1 && <FormattedMessage defaultMessage="serie" id="rwqNY9" />}
              {numberOfTvShows > 1 && <FormattedMessage defaultMessage="series" id="INk7fF" />}
            </Badge>
          )}
        </>
      }
      imageUrl={coverUrl}
      isLoading={isLoading || isLoadingMovies || isLoadingTv}
      title={name}
    >
      <View style={styles.content}>
        {!!biography && (
          <View style={globalStyles.centered}>
            <ReadMore>{biography}</ReadMore>
          </View>
        )}
        {(isLoadingCredits || credits?.length > 0) && (
          <List<CastItem>
            id="similar"
            isLoading={isLoadingCredits}
            numberOfItems={2}
            renderItem={renderCreditImage}
            results={credits?.slice(0, 8)}
            title={<FormattedMessage defaultMessage="Know for" id="//VHfC" />}
          />
        )}
        {(!!numberOfMovies || !!numberOfTvShows) && (
          <View style={[globalStyles.centered, styles.creditNumbers]}>
            {!!numberOfMovies && (
              <ThumbLink href={personMoviesPath({ id: personID })} style={styles.creditNumber}>
                <CreditNumberThumb
                  number={numberOfMovies}
                  title={<FormattedMessage defaultMessage="movies" id="2xXGzb" />}
                  type="movie"
                />
              </ThumbLink>
            )}
            {!!numberOfTvShows && (
              <ThumbLink href={personTvPath({ id: personID })} style={styles.creditNumber}>
                <CreditNumberThumb
                  number={numberOfTvShows}
                  title={<FormattedMessage defaultMessage="series" id="INk7fF" />}
                  type="tv"
                />
              </ThumbLink>
            )}
          </View>
        )}
        {(isLoadingImages || images?.length > 0) && (
          <List<ImageItem>
            id="similar"
            isLoading={isLoadingImages}
            renderItem={renderItemImage}
            results={images}
            title={<FormattedMessage defaultMessage="Pictures" id="DOPilz" />}
          />
        )}
      </View>
    </ContentLayout>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: theme.space.xl,
    marginBottom: theme.space.xl,
  },
  creditNumber: {
    flex: 1,
  },
  creditNumbers: { flexDirection: 'row', gap: theme.space.lg },
})
