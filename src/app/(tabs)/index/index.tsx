import { theme } from 'theme';

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
  return (
    <BasicLayout contentContainerStyle={{ gap: theme.space.xl }}>
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
