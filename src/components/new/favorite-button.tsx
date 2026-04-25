import { usePathname } from 'expo-router'
import { useEffect, useRef } from 'react'

import { useUpdateFavorite, useUser } from '~/api/account'
import { useGetAccountState } from '~/api/account-states'
import { Button } from '~/components/new/button'
import { useAuth } from '~/contexts/Auth'

export function FavoriteButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { accountId, openLogin } = useAuth()
  const pathname = usePathname()
  const { data } = useGetAccountState({ id, type })
  const { mutate: updateFavorite } = useUpdateFavorite({ id, type })
  const { data: user } = useUser()
  // Track if we need to trigger the action after login.
  // We can't call the mutation right after login because useUser()
  // hasn't fetched yet (user is undefined), and the mutation needs user.id.
  const pendingAction = useRef(false)

  // Once user data is available after login, execute the pending action
  useEffect(() => {
    if (pendingAction.current && user) {
      pendingAction.current = false
      updateFavorite(true)
    }
  }, [user, updateFavorite])

  const isFavorite = data?.favorite

  const handleUpdateFavorite = async () => {
    if (!accountId) {
      const loggedIn = await openLogin(pathname)
      if (loggedIn) {
        pendingAction.current = true
      }
      return
    }

    updateFavorite(!isFavorite)
  }

  return (
    <Button
      icon={isFavorite ? 'heart' : 'heart-outline'}
      onPress={handleUpdateFavorite}
      size="xl"
      variant={isFavorite ? 'secondary' : 'primary'}
    />
  )
}
