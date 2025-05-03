import { useGetWatchlist, useUpdateWatchlist } from '~/api/account'
import { useAuth } from '~/contexts/Auth'

import { IconButton } from '../IconButton'

export function WatchlistButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { accountId, openLoginWebview } = useAuth()
  const { data } = useGetWatchlist({ type })
  const { mutate: updateWatchlist } = useUpdateWatchlist({ id, type })

  const isWatchlisted =
    data?.pages
      ?.map(page => page.results)
      .flat()
      .filter(result => result.id === id).length > 0

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
