import { View } from 'react-native'

import { FavoriteButton } from '~/components/favorite-button'
import { NetworkButton } from '~/components/network-button'
import { TrailerButton } from '~/components/trailer-button'
import { WatchlistButton } from '~/components/watchlist-button'
import type { NetworkId } from '~/types/content'

type ActionsProps = {
  id: number
  networkLink?: {
    id: NetworkId
    link: string
  }
  trailer?: {
    key: string
    platform: string
  }
  type: 'movie' | 'tv'
}

export function Actions({ id, networkLink, trailer, type }: ActionsProps) {
  return (
    <View className="mx-screen gap-3">
      {!!networkLink && <NetworkButton id={networkLink.id} link={networkLink.link} />}
      <View className="flex-row w-full gap-2">
        {!!trailer && (
          <View className="flex-1">
            <TrailerButton id={trailer.key ?? ''} platform={trailer.platform ?? ''} size="xl" />
          </View>
        )}
        <WatchlistButton id={id} type={type} />
        <FavoriteButton id={id} type={type} />
      </View>
    </View>
  )
}
