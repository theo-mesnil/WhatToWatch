import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'
import { useAuth } from '~/contexts/Auth'

import { api } from './api'
import type { paths } from './types'

export type UseGetFavorite = {
  movies: UseGetFavoriteMovies
  tv: UseGetFavoriteTv
}
export type UseGetFavoritesProps = {
  maxPages?: number
  type: 'movies' | 'tv'
}
export type UseGetFavoriteTv =
  paths['/3/account/{account_id}/favorite/tv']['get']['responses']['200']['content']['application/json']
export type UseGetUser =
  paths['/3/account/{account_id}']['get']['responses']['200']['content']['application/json']
type FormatUser = { avatar: null | string; id: number; name: string }
type UseGetFavoriteMovies =
  paths['/3/account/{account_id}/favorite/movies']['get']['responses']['200']['content']['application/json']
type UseGetFavoriteParams =
  paths['/3/account/{account_id}/favorite/tv']['get']['parameters']['query']

export function useGetFavorite(props: UseGetFavoritesProps) {
  const { maxPages = 30, type } = props || {}
  const { accountId, sessionId } = useAuth()

  return useInfiniteQuery<UseGetFavorite[UseGetFavoritesProps['type']], Error>({
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetFavorite[UseGetFavoritesProps['type']]> = await api.get(
        `account/${accountId}/favorite/${type}`,
        {
          params: {
            language: LOCALE,
            page: pageParam,
            session_id: sessionId,
          } as UseGetFavoriteParams,
        }
      )
      return data
    },
    queryKey: ['account', sessionId, 'favorite', type, LOCALE],
  })
}

export function useUser() {
  const { sessionId } = useAuth()

  return useQuery({
    enabled: !!sessionId,
    queryFn: async () => {
      try {
        const { data }: AxiosResponse<UseGetUser> = await api.get(`account`, {
          params: {
            session_id: sessionId,
          },
        })

        return formatUser(data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useUser', error.response.data)
        throw error
      }
    },
    queryKey: ['account', sessionId],
  })
}

function formatUser(user: UseGetUser): FormatUser {
  const avatar = user.avatar?.tmdb?.avatar_path
    ? `https://image.tmdb.org/t/p/w500${user.avatar.tmdb.avatar_path}`
    : user.avatar?.gravatar?.hash
      ? `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}`
      : null

  return {
    avatar,
    id: user.id,
    name: user.name || user.username,
  }
}
