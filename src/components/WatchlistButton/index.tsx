import { useGetWatchlist, useUpdateWatchlist } from '~/api/account'

import { IconButton } from '../IconButton'

export function WatchlistButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const formattedType = type === 'movie' ? 'movies' : 'tv'
  const { data } = useGetWatchlist({ type: formattedType })
  const { mutate: updateWatchlist } = useUpdateWatchlist({ id, type: formattedType })

  const isWatchlisted =
    data?.pages
      ?.map(page => page.results)
      .flat()
      .filter(result => result.id === id).length > 0

  const handleUpdateWatchlist = () => {
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
