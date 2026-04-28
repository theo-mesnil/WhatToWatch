import { usePathname } from 'expo-router'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { AccessibilityInfo } from 'react-native'

import { useUpdateWatchlist, useUser } from '~/api/account'
import { useGetAccountState } from '~/api/account-states'
import { Button } from '~/components/button'
import { useAuth } from '~/contexts/auth'

export function WatchlistButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const intl = useIntl()
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

    const newState = !isWatchlisted
    updateWatchlist(newState, {
      onSuccess: () => {
        AccessibilityInfo.announceForAccessibility(
          newState
            ? intl.formatMessage({ defaultMessage: 'Added to watchlist', id: 'H2GZxx' })
            : intl.formatMessage({ defaultMessage: 'Removed from watchlist', id: 'IaqouO' })
        )
      },
    })
  }

  const accessibilityLabel = isWatchlisted
    ? intl.formatMessage({ defaultMessage: 'Remove from watchlist', id: 'X5hQXG' })
    : intl.formatMessage({ defaultMessage: 'Add to watchlist', id: '1tj5VZ' })

  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: !!isWatchlisted }}
      icon={isWatchlisted ? 'bookmark' : 'bookmark-outline'}
      onPress={handleUpdateWatchlist}
      size="xl"
      variant={isWatchlisted ? 'secondary' : 'primary'}
    />
  )
}
