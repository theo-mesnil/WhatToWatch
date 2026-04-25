import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useGetPerson, useGetPersonMovieCredits } from '~/api/person'
import { ThumbLink } from '~/components/thumb-link'
import { BasicLayout } from '~/layouts/basic'
import { moviePath } from '~/routes'
import { ItemThumb } from '~/screens/person/ItemThumb'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function PersonMovies() {
  const params = useLocalSearchParams<{ id: string }>()
  const personID = Number(params?.id)

  const { data, isLoading } = useGetPerson({ id: personID })

  const isActing = data?.department === 'Acting'

  const { data: movies, isLoading: isLoadingMovies } = useGetPersonMovieCredits({
    id: personID,
    isActing,
  })

  const name = data?.name

  return (
    <BasicLayout title={name || ''}>
      {!isLoadingMovies && (
        <View style={styles.items}>
          {movies?.map((movie, index) => (
            <ThumbLink
              href={moviePath({ id: movie.id })}
              isLoading={isLoading}
              key={`movie-${index}-${movie.id}`}
            >
              <ItemThumb
                date={movie.release_date}
                overview={movie.overview}
                posterUrl={movie.poster_path}
                subtitle={
                  'character' in movie ? movie.character : 'job' in movie ? movie.job : undefined
                }
                title={movie.title}
                type="movie"
              />
            </ThumbLink>
          ))}
        </View>
      )}
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  items: {
    gap: theme.space.md,
    ...globalStyles.centered,
  },
})
