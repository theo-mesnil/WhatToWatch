import * as React from 'react'
import { useIntl } from 'react-intl'

import { useAuth } from '~/contexts/Auth'
import { TabsLayout } from '~/layouts/tabs'

import { Family } from './components/Family'
import { InTheaters } from './components/InTheaters'
import { MovieCategories } from './components/MovieCategories'
import { Networks } from './components/Networks'
import { Overview } from './components/Overview'
import { PopularPerson } from './components/PopularPerson'
import { PopularSeries } from './components/PopularSeries'
import { Recommendations } from './components/Recommendations'
import { Top10Movies } from './components/Top10Movies'
import { Top10Series } from './components/Top10Series'
import { TvCategories } from './components/TvCategories'
import { Upcoming } from './components/Upcoming'

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
