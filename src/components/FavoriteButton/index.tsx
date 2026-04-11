import { useUpdateFavorite } from '~/api/account'
import { useGetAccountState } from '~/api/account-states'
import { useAuth } from '~/contexts/Auth'

import { IconButton } from '../IconButton'

export function FavoriteButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { accountId, openLoginWebview } = useAuth()
  const { data } = useGetAccountState({ id, type })
  const { mutate: updateFavorite } = useUpdateFavorite({ id, type })

  const isFavorite = data?.favorite

  const handleUpdateFavorite = () => {
    if (!accountId) {
      openLoginWebview()
      return
    }

    updateFavorite(!isFavorite)
  }

  return (
    <IconButton
      icon={isFavorite ? 'heart-fill' : 'heart'}
      isActive={isFavorite}
      onPress={handleUpdateFavorite}
    />
  )
}
