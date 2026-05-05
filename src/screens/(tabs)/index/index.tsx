import * as React from 'react'
import { useIntl } from 'react-intl'

import { useAuth } from '~/contexts/auth'
import { TabsLayout } from '~/layouts/tabs'

import { Family } from './components/family'
import { InTheaters } from './components/in-theaters'
import { MovieCategories } from './components/movie-categories'
import { Networks } from './components/networks'
import { Overview } from './components/overview'
import { PopularPerson } from './components/popular-person'
import { PopularSeries } from './components/popular-series'
import { Recommendations } from './components/recommendations'
import { Top10Movies } from './components/top-movies'
import { Top10Series } from './components/top-series'
import { TvCategories } from './components/tv-categories'
import { Upcoming } from './components/upcoming'

export default function Discover() {
  const { accountId } = useAuth()
  const intl = useIntl()

  return (
    <TabsLayout title={intl.formatMessage({ defaultMessage: 'Discover', id: 'cE4Hfw' })}>
      <Overview />
      <Networks />
      <Top10Series />
      {accountId && <Recommendations type="movie" />}
      <InTheaters />
      <MovieCategories />
      {accountId && <Recommendations type="tv" />}
      <Top10Movies />
      <TvCategories />
      <Family />
      <PopularPerson />
      <PopularSeries />
      <Upcoming />
    </TabsLayout>
  )
}
