import { useUpdateWatchlist } from '~/api/account'
import { useGetAccountState } from '~/api/account-states'
import { useAuth } from '~/contexts/Auth'

import { IconButton } from '../IconButton'

export function WatchlistButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { accountId, openLoginWebview } = useAuth()
  const { data } = useGetAccountState({ id, type })
  const { mutate: updateWatchlist } = useUpdateWatchlist({ id, type })

  const isWatchlisted = data?.watchlist

  const handleUpdateWatchlist = () => {
    if (!accountId) {
      openLoginWebview()
      return
    }

    if (isWatchlisted) {
      updateWatchlist(false)
    } else {
      // Remove from favorites
      updateWatchlist(true)
    }
  }

  return (
    <IconButton
      icon={isWatchlisted ? 'bookmark-fill' : 'bookmark'}
      isActive={isWatchlisted}
      onPress={handleUpdateWatchlist}
    />
  )
}
