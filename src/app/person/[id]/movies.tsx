import { useLocalSearchParams, useNavigation } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Animated, StyleSheet, View } from 'react-native'

import { useGetPerson, useGetPersonMovieCredits } from '~/api/person'
import { ItemThumb } from '~/components/app/person/ItemThumb'
import { ThumbLink } from '~/components/ThumbLink'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { BasicLayout } from '~/layouts//Basic'
import { Header } from '~/layouts//Content/Header'
import { moviePath } from '~/routes'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function PersonMovies() {
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const navigation = useNavigation()
  const params = useLocalSearchParams<{ id: string }>()
  const { containerStyle } = useSafeHeights()
  const personID = Number(params?.id)

  const { data, isLoading } = useGetPerson({ id: personID })

  const isActing = data?.department === 'Acting'

  const { data: movies, isLoading: isLoadingMovies } = useGetPersonMovieCredits({
    id: personID,
    isActing,
  })

  const name = data?.name

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        scrollY={scrollYPosition}
        showHeaderOnStart
        title={
          <>
            {name}
            <FormattedMessage defaultMessage="'s movies" id="uM+ly3" />
          </>
        }
      />
    ),
    [name, scrollYPosition]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout contentContainerStyle={containerStyle} getScrollYPosition={getScrollYPosition}>
      {!isLoadingMovies && (
        <View style={styles.items}>
          {movies.map((movie, index) => (
            <ThumbLink
              href={moviePath({ id: movie.id })}
              isLoading={isLoading}
              key={`movie-${index}-${movie.id}`}
            >
              <ItemThumb
                date={movie.release_date}
                overview={movie.overview}
                posterUrl={movie.poster_path}
                subtitle={movie.character || movie.job}
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
