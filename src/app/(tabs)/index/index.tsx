import { theme } from 'theme';

import { BasicLayout } from 'layouts/Basic';

import { Documentaries } from './components/Documentaries';
import { InTheaters } from './components/InTheaters';
import { MovieCategories } from './components/MovieCategories';
import { Networks } from './components/Networks';
import { Overview } from './components/Overview';
import { Top10 } from './components/Top10';
import { TvCategories } from './components/TvCategories';

export default function Discover() {
  return (
    <BasicLayout contentContainerStyle={{ gap: theme.space.xl }}>
      <Overview />
      <Networks />
      <Top10 />
      <MovieCategories />
      <Documentaries />
      <InTheaters />
      <TvCategories />
    </BasicLayout>
  );
}
