import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { queryClient } from '~/app/_layout'
import { LOCALE } from '~/constants/locales'
import { useAuth } from '~/contexts/Auth'

import { api, apiV4 } from './api'
import type { paths } from './types'
import type { paths as pathsV4 } from './types-v4'

export type FavoriteAndWatchlistBody = {
  favorite: boolean
  media_id: number
  media_type: 'movie' | 'tv'
}
export type UseGetFavorite = {
  movie: UseGetFavoriteMovie
  tv: UseGetFavoriteTv
}
export type UseGetFavoritesProps = {
  maxPages?: number
  type: 'movie' | 'tv'
}
export type UseGetRecommendations = {
  movie: UseGetRecommendationsMovie
  tv: UseGetRecommendationsTv
}
export type UseGetRecommendationsProps = {
  maxPages?: number
  type: 'movie' | 'tv'
}
export type UseGetUser =
  paths['/3/account/{account_id}']['get']['responses']['200']['content']['application/json']
export type UseGetWatchlist = {
  movie: UseGetWatchlistMovie
  tv: UseGetWatchlistTv
}
export type UseGetWatchlistProps = {
  maxPages?: number
  type: 'movies' | 'tv'
}
type FormatUser = { avatar: null | string; id: number; name: string }
type UseGetFavoriteMovie =
  pathsV4['/4/account/{account_object_id}/movie/favorites']['get']['responses']['200']['content']['application/json']
type UseGetFavoriteParams =
  pathsV4['/4/account/{account_object_id}/movie/favorites']['get']['parameters']['query']
type UseGetFavoriteTv =
  pathsV4['/4/account/{account_object_id}/tv/favorites']['get']['responses']['200']['content']['application/json']
type UseGetRecommendationsMovie =
  pathsV4['/4/account/{account_object_id}/movie/recommendations']['get']['responses']['200']['content']['application/json']
type UseGetRecommendationsParams =
  pathsV4['/4/account/{account_object_id}/movie/recommendations']['get']['parameters']['query']
type UseGetRecommendationsTv =
  pathsV4['/4/account/{account_object_id}/tv/recommendations']['get']['responses']['200']['content']['application/json']
type UseGetWatchlistMovie =
  pathsV4['/4/account/{account_object_id}/movie/watchlist']['get']['responses']['200']['content']['application/json']
type UseGetWatchlistParams =
  pathsV4['/4/account/{account_object_id}/tv/watchlist']['get']['parameters']['query']
type UseGetWatchlistTv =
  pathsV4['/4/account/{account_object_id}/tv/watchlist']['get']['responses']['200']['content']['application/json']
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
    enabled: !!sessionId,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetFavorite[UseGetFavoritesProps['type']]> = await apiV4.get(
        `account/${accountId}/${type}/favorites`,
        {
          params: {
            language: LOCALE,
            page: pageParam,
            session_id: sessionId,
            sort_by: 'created_at.desc',
          } as UseGetFavoriteParams,
        }
      )
      return data
    },
    queryKey: ['account', sessionId, 'favorites', type, LOCALE],
  })
}

export function useGetRecommendations(props: UseGetRecommendationsProps) {
  const { maxPages = 30, type } = props || {}
  const { accountId, sessionId } = useAuth()

  return useInfiniteQuery<UseGetRecommendations[UseGetRecommendationsProps['type']], Error>({
    enabled: !!sessionId,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetRecommendations[UseGetRecommendationsProps['type']]> =
        await apiV4.get(`account/${accountId}/${type}/recommendations`, {
          params: {
            language: LOCALE,
            page: pageParam,
            session_id: sessionId,
          } as UseGetRecommendationsParams,
        })
      return data
    },
    queryKey: ['account', sessionId, 'Recommendations', type, LOCALE],
  })
}

export function useGetWatchlist(props: UseGetFavoritesProps) {
  const { maxPages = 30, type } = props || {}
  const { accountId, sessionId } = useAuth()

  return useInfiniteQuery<UseGetFavorite[UseGetFavoritesProps['type']], Error>({
    enabled: !!sessionId,
    getNextPageParam: ({ page }) => {
      return page + 1 <= maxPages ? page + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetFavorite[UseGetFavoritesProps['type']]> = await apiV4.get(
        `account/${accountId}/${type}/watchlist`,
        {
          params: {
            language: LOCALE,
            page: pageParam,
            session_id: sessionId,
            sort_by: 'created_at.desc',
          } as UseGetWatchlistParams,
        }
      )
      return data
    },
    queryKey: ['account', sessionId, 'watchlist', type, LOCALE],
  })
}

export function useUpdateFavorite({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { sessionId } = useAuth()
  const { data: user } = useUser()

  return useMutation({
    mutationFn: async (isFavorite: boolean) => {
      try {
        const { data }: AxiosResponse<UseUpdateFavoriteResponse> = await api.post(
          `account/${user.id}/favorite`,
          {
            favorite: isFavorite,
            media_id: id,
            media_type: type,
          },
          {
            params: {
              session_id: sessionId,
            },
          }
        )
        if (data.success) {
          queryClient.refetchQueries({
            queryKey: ['account-states', sessionId, type, id, LOCALE],
          })
          queryClient.invalidateQueries({
            queryKey: ['account', sessionId, 'favorites', type, LOCALE],
          })
        }

        return data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useUpdateFavorite', error.response)
        throw error // Re-throw to let react-query handle the error state
      }
    },
  })
}

export function useUpdateWatchlist({ id, type }: { id: number; type: 'movie' | 'tv' }) {
  const { sessionId } = useAuth()
  const { data: user } = useUser()

  return useMutation({
    mutationFn: async (isWatchlisted: boolean) => {
      try {
        const { data }: AxiosResponse<UseUpdateWatchlistResponse> = await api.post(
          `account/${user.id}/watchlist`,
          {
            media_id: id,
            media_type: type,
            watchlist: isWatchlisted,
          },
          {
            params: {
              session_id: sessionId,
            },
          }
        )
        if (data.success) {
          queryClient.refetchQueries({
            queryKey: ['account-states', sessionId, type, id, LOCALE],
          })
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
