import { Favorite } from './components/favorite'
import { Watchlist } from './components/watchlist'

export function Logged() {
  return (
    <>
      <Favorite type="tv" />
      <Watchlist type="tv" />
      <Favorite type="movie" />
      <Watchlist type="movie" />
    </>
  )
}
