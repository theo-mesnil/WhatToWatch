import { StyleSheet } from 'react-native';
import { theme } from 'theme';

import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';

import { Documentaries } from './components/Documentaries';
import { InTheaters } from './components/InTheaters';
import { MovieCategories } from './components/MovieCategories';
import { Networks } from './components/Networks';
import { Overview } from './components/Overview';
import { Top10Movies } from './components/Top10Movies';
import { Top10Series } from './components/Top10Series';
import { TvCategories } from './components/TvCategories';

export default function Discover() {
  const { containerStyle } = useSafeHeights();

  return (
    <BasicLayout contentContainerStyle={[containerStyle, styles.wrapper]}>
      <Overview />
      <Networks />
      <Top10Series />
      <MovieCategories />
      <Documentaries />
      <Top10Movies />
      <InTheaters />
      <TvCategories />
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.xl, paddingTop: 0 }
});
