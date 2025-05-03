import { useGetFavorite, useUpdateFavorite } from '~/api/account'
import { useAuth } from '~/contexts/Auth'

import { IconButton } from '../IconButton'

export function FavoriteButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { accountId, openLoginWebview } = useAuth()
  const { data } = useGetFavorite({ type })
  const { mutate: updateFavorite } = useUpdateFavorite({ id, type })

  const isFavorite =
    data?.pages
      ?.map(page => page.results)
      .flat()
      .filter(result => result.id === id).length > 0

  const handleUpdateFavorite = () => {
    if (!accountId) {
      openLoginWebview()
      return
    }

    if (isFavorite) {
      updateFavorite(false)
    } else {
      // Remove from favorites
      updateFavorite(true)
    }
  }

  return (
    <IconButton
      icon={isFavorite ? 'heart-fill' : 'heart'}
      isActive={isFavorite}
      onPress={handleUpdateFavorite}
    />
  )
}
