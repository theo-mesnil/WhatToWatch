import { useMutation } from '@tanstack/react-query'

import { queryClient } from '~/app/_layout'
import { LOCALE } from '~/constants/locales'
import { useAuth } from '~/contexts/auth'

import { apiV4 } from './api'
import type { paths as pathsV4 } from './types-v4'

export type UseDeleteAccessTokenApiResponse =
  pathsV4['/4/auth/access_token']['delete']['responses']['200']['content']['application/json']

export function useDeleteRequestToken() {
  const { accessToken, accountId, logOut, sessionId } = useAuth()

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await apiV4.delete<UseDeleteAccessTokenApiResponse>('auth/access_token', {
          data: { access_token: accessToken },
        })

        if (data.success) {
          logOut()
          // Remove any user-related queries from the cache
          queryClient.removeQueries({
            queryKey: ['account', accountId],
          })
          queryClient.removeQueries({ queryKey: ['account', sessionId, 'favorite', 'tv', LOCALE] })
          queryClient.removeQueries({
            queryKey: ['account', sessionId, 'favorite', 'movies', LOCALE],
          })
          queryClient.removeQueries({ queryKey: ['account', sessionId, 'watchlist', 'tv', LOCALE] })
          queryClient.removeQueries({
            queryKey: ['account', sessionId, 'watchlist', 'movies', LOCALE],
          })
        }

        return data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useDeleteRequestToken', error)
        throw error // Re-throw to let react-query handle the error state
      }
    },
    mutationKey: ['auth', 'request_token'],
  })
}
