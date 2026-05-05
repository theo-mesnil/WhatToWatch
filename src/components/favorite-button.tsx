import { usePathname } from 'expo-router'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { AccessibilityInfo } from 'react-native'

import { useUpdateFavorite, useUser } from '~/api/account'
import { useGetAccountState } from '~/api/account-states'
import { Button } from '~/components/button'
import { useAuth } from '~/contexts/auth'

export function FavoriteButton({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const intl = useIntl()
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

    const newState = !isFavorite
    updateFavorite(newState, {
      onSuccess: () => {
        AccessibilityInfo.announceForAccessibility(
          newState
            ? intl.formatMessage({ defaultMessage: 'Added to favorites', id: 'PC6Igt' })
            : intl.formatMessage({ defaultMessage: 'Removed from favorites', id: 'COeOGK' })
        )
      },
    })
  }

  const accessibilityLabel = isFavorite
    ? intl.formatMessage({ defaultMessage: 'Remove from favorites', id: 'eG1C0k' })
    : intl.formatMessage({ defaultMessage: 'Add to favorites', id: 'tWX1j9' })

  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: !!isFavorite }}
      icon={isFavorite ? 'heart' : 'heart-outline'}
      onPress={handleUpdateFavorite}
      size="xl"
      variant={isFavorite ? 'secondary' : 'primary'}
    />
  )
}
