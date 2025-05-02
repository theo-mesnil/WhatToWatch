import { useGetFavorite, useUpdateFavorite } from '~/api/account'

import { IconButton } from '../IconButton'

export function FavoriteButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const formattedType = type === 'movie' ? 'movies' : 'tv'
  const { data } = useGetFavorite({ type: formattedType })
  const { mutate: updateFavorite } = useUpdateFavorite({ id, type: formattedType })

  const isFavorite =
    data?.pages
      ?.map(page => page.results)
      .flat()
      .filter(result => result.id === id).length > 0

  const handleUpdateFavorite = () => {
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
