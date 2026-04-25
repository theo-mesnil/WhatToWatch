import { View } from 'react-native'

import { FavoriteButton } from '~/components/favorite-button'
import { WatchlistButton } from '~/components/watchlist-button'

type ActionsProps = {
  id: number
  type: 'movie' | 'tv'
}

export function Actions({ id, type }: ActionsProps) {
  return (
    <View className="flex-row gap-3 justify-center mb-6 mx-screen">
      <WatchlistButton id={id} type={type} />
      <FavoriteButton id={id} type={type} />
    </View>
  )
}
