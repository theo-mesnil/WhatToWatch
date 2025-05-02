import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { queryClient } from '~/app/_layout'
import { LOCALE } from '~/constants/locales'
import { useAuth } from '~/contexts/Auth'

import { api } from './api'
import type { paths } from './types'

export type FavoriteAndWatchlistBody = {
  favorite: boolean
  media_id: number
  media_type: 'movie' | 'tv'
}
export type UseGetFavorite = {
  movies: UseGetFavoriteMovies
  tv: UseGetFavoriteTv
}
export type UseGetFavoritesProps = {
  maxPages?: number
  type: 'movies' | 'tv'
}
export type UseGetUser =
  paths['/3/account/{account_id}']['get']['responses']['200']['content']['application/json']
export type UseGetWatchlist = {
  movies: UseGetWatchlistMovies
  tv: UseGetWatchlistTv
}
export type UseGetWatchlistProps = {
  maxPages?: number
  type: 'movies' | 'tv'
}
type FormatUser = { avatar: null | string; id: number; name: string }
type UseGetFavoriteMovies =
  paths['/3/account/{account_id}/favorite/movies']['get']['responses']['200']['content']['application/json']
type UseGetFavoriteParams =
  paths['/3/account/{account_id}/favorite/tv']['get']['parameters']['query']
type UseGetFavoriteTv =
  paths['/3/account/{account_id}/favorite/tv']['get']['responses']['200']['content']['application/json']
type UseGetWatchlistMovies =
  paths['/3/account/{account_id}/watchlist/movies']['get']['responses']['200']['content']['application/json']
type UseGetWatchlistParams =
  paths['/3/account/{account_id}/watchlist/tv']['get']['parameters']['query']
type UseGetWatchlistTv =
  paths['/3/account/{account_id}/watchlist/tv']['get']['responses']['200']['content']['application/json']
type UseUpdateFavoriteResponse =
  paths['/3/account/{account_id}/favorite']['post']['responses']['200']['content']['application/json'] & {
    success: boolean
  }
type UseUpdateWatchlistResponse =
  paths['/3/account/{account_id}/watchlist']['post']['responses']['200']['content']['application/json'] & {
    success: boolean
  }

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

export function useGetWatchlist(props: UseGetFavoritesProps) {
  const { maxPages = 30, type } = props || {}
  const { accountId, sessionId } = useAuth()

  return useInfiniteQuery<UseGetFavorite[UseGetFavoritesProps['type']], Error>({
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetFavorite[UseGetFavoritesProps['type']]> = await api.get(
        `account/${accountId}/watchlist/${type}`,
        {
          params: {
            language: LOCALE,
            page: pageParam,
            session_id: sessionId,
          } as UseGetWatchlistParams,
        }
      )
      return data
    },
    queryKey: ['account', sessionId, 'watchlist', type, LOCALE],
  })
}

export function useUpdateFavorite({ id, type }: { id: number; type: 'movies' | 'tv' }) {
  const { accountId, sessionId } = useAuth()
  const formattedType = type === 'movies' ? 'movie' : 'tv'

  return useMutation({
    mutationFn: async (isFavorite: boolean) => {
      try {
        const { data }: AxiosResponse<UseUpdateFavoriteResponse> = await api.post(
          `account/${accountId}/favorite`,
          {
            favorite: isFavorite,
            media_id: id,
            media_type: formattedType,
          }
        )
        if (data.success) {
          queryClient.invalidateQueries({
            queryKey: ['account', sessionId, 'favorite', type, LOCALE],
          })
        }

        return data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useUpdateFavorite', error.response)
        throw error // Re-throw to let react-query handle the error state
      }
    },
    mutationKey: ['account', sessionId, 'favorite', 'update', LOCALE],
  })
}

export function useUpdateWatchlist({ id, type }: { id: number; type: 'movies' | 'tv' }) {
  const { accountId, sessionId } = useAuth()
  const formattedType = type === 'movies' ? 'movie' : 'tv'

  return useMutation({
    mutationFn: async (isWatchlisted: boolean) => {
      try {
        const { data }: AxiosResponse<UseUpdateWatchlistResponse> = await api.post(
          `account/${accountId}/watchlist`,
          {
            media_id: id,
            media_type: formattedType,
            watchlist: isWatchlisted,
          }
        )
        if (data.success) {
          queryClient.invalidateQueries({
            queryKey: ['account', sessionId, 'watchlist', type, LOCALE],
          })
        }

        return data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useUpdateWatchlist', error.response)
        throw error // Re-throw to let react-query handle the error state
      }
    },
    mutationKey: ['account', sessionId, 'watchlist', 'update', LOCALE],
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
