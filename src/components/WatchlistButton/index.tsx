import { usePathname } from 'expo-router'
import { useEffect, useRef } from 'react'

import { useUpdateWatchlist, useUser } from '~/api/account'
import { useGetAccountState } from '~/api/account-states'
import { useAuth } from '~/contexts/Auth'

import { IconButton } from '../IconButton'

export function WatchlistButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { accountId, openLogin } = useAuth()
  const pathname = usePathname()
  const { data } = useGetAccountState({ id, type })
  const { mutate: updateWatchlist } = useUpdateWatchlist({ id, type })
  const { data: user } = useUser()
  // Track if we need to trigger the action after login.
  // We can't call the mutation right after login because useUser()
  // hasn't fetched yet (user is undefined), and the mutation needs user.id.
  const pendingAction = useRef(false)

  // Once user data is available after login, execute the pending action
  useEffect(() => {
    if (pendingAction.current && user) {
      pendingAction.current = false
      updateWatchlist(true)
    }
  }, [user, updateWatchlist])

  const isWatchlisted = data?.watchlist

  const handleUpdateWatchlist = async () => {
    if (!accountId) {
      const loggedIn = await openLogin(pathname)
      if (loggedIn) {
        pendingAction.current = true
      }
      return
    }

    updateWatchlist(!isWatchlisted)
  }

  return (
    <IconButton
      icon={isWatchlisted ? 'bookmark-fill' : 'bookmark'}
      isActive={isWatchlisted}
      onPress={handleUpdateWatchlist}
    />
  )
}
