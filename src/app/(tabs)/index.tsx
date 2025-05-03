import { useNavigation } from 'expo-router'
import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { Family } from '~/components/app/index/Family'
import { InTheaters } from '~/components/app/index/InTheaters'
import { MovieCategories } from '~/components/app/index/MovieCategories'
import { Networks } from '~/components/app/index/Networks'
import { Overview } from '~/components/app/index/Overview'
import { PopularPerson } from '~/components/app/index/PopularPerson'
import { PopularSeries } from '~/components/app/index/PopularSeries'
import { Recommendations } from '~/components/app/index/Recommendations'
import { Top10Movies } from '~/components/app/index/Top10Movies'
import { Top10Series } from '~/components/app/index/Top10Series'
import { TvCategories } from '~/components/app/index/TvCategories'
import { Upcoming } from '~/components/app/index/Upcoming'
import { Header } from '~/components/Header'
import { Logo } from '~/components/Logo'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { useAuth } from '~/contexts/Auth'
import { BasicLayout } from '~/layouts//Basic'
import { theme } from '~/theme'
import { isUserFeatureEnabled } from '~/utils/flags'

export default function Discover() {
  const { containerStyle, headerHeight } = useSafeHeights()
  const navigation = useNavigation()
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const { accountId } = useAuth()

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        customTitle={
          <View
            style={{
              height: headerHeight - 10,
            }}
          >
            <Logo />
          </View>
        }
        hideOnStart
        scrollY={scrollYPosition}
      />
    ),
    [headerHeight, scrollYPosition]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout
      contentContainerStyle={[containerStyle, styles.wrapper]}
      getScrollYPosition={getScrollYPosition}
    >
      <Overview />
      <Networks />
      <Top10Series />
      {accountId && isUserFeatureEnabled && <Recommendations type="movie" />}
      <InTheaters />
      <MovieCategories />
      {accountId && isUserFeatureEnabled && <Recommendations type="tv" />}
      <Top10Movies />
      <TvCategories />
      <Family />
      <PopularPerson />
      <PopularSeries />
      <Upcoming />
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.xxl, paddingTop: 0 },
})
