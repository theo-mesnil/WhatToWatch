import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { theme } from 'theme';

import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';

import { Family } from './components/Family';
import { Header } from './components/Header';
import { InTheaters } from './components/InTheaters';
import { MovieCategories } from './components/MovieCategories';
import { Networks } from './components/Networks';
import { Overview } from './components/Overview';
import { PopularSeries } from './components/PopularSeries';
import { Top10Movies } from './components/Top10Movies';
import { Top10Series } from './components/Top10Series';
import { TvCategories } from './components/TvCategories';
import { Upcoming } from './components/Upcoming';

export default function Discover() {
  const { containerStyle } = useSafeHeights();
  const navigation = useNavigation();
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );

  const HeaderComponent = React.useCallback(
    () => <Header scrollY={scrollYPosition} />,
    [scrollYPosition]
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
      <TvCategories />
      <PopularSeries />
      <Upcoming />
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.xxl, paddingTop: 0 }
});
