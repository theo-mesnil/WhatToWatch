import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Family } from 'components/ContentList/Family';
import { InTheaters } from 'components/ContentList/InTheaters';
import { MovieCategories } from 'components/ContentList/MovieCategories';
import { Networks } from 'components/ContentList/Networks';
import { Overview } from 'components/ContentList/Overview';
import { PopularPerson } from 'components/ContentList/PopularPerson';
import { PopularSeries } from 'components/ContentList/PopularSeries';
import { Top10Movies } from 'components/ContentList/Top10Movies';
import { Top10Series } from 'components/ContentList/Top10Series';
import { TvCategories } from 'components/ContentList/TvCategories';
import { Upcoming } from 'components/ContentList/Upcoming';
import { Header } from 'components/Header';
import { Logo } from 'components/Logo';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';

export default function Discover() {
  const { containerStyle, headerHeight } = useSafeHeights();
  const navigation = useNavigation();
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        hideOnStart
        customTitle={
          <View
            style={{
              height: headerHeight - 10
            }}
          >
            <Logo />
          </View>
        }
        scrollY={scrollYPosition}
      />
    ),
    [headerHeight, scrollYPosition]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout
      getScrollYPosition={getScrollYPosition}
      contentContainerStyle={[containerStyle, styles.wrapper]}
    >
      <Overview />
      <Networks />
      <Top10Series />
      <InTheaters />
      <MovieCategories />
      <Family />
      <Top10Movies />
      <PopularPerson />
      <TvCategories />
      <PopularSeries />
      <Upcoming />
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.xxl, paddingTop: 0 }
});
