import { Favorite } from './components/Favorite'
import { Watchlist } from './components/Watchlist'

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
