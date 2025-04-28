import { useMutation, useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'expo-router'

import { queryClient } from '~/app/_layout'
import { useAuth } from '~/contexts/Auth'

import { api, apiV4 } from './api'
import type { paths } from './types'
import type { paths as pathsV4 } from './types-v4'

export type CreateAccessTokenParams = pathsV4['/4/auth/access_token']['post']['parameters']

export type UseCreateAccessTokenApiResponse =
  pathsV4['/4/auth/access_token']['post']['responses']['200']['content']['application/json']
export type UseCreateSessionFromV4ApiResponse =
  paths['/3/authentication/session/convert/4']['post']['responses']['200']['content']['application/json']

export type UseDeleteAccessTokenApiResponse =
  pathsV4['/4/auth/access_token']['delete']['responses']['200']['content']['application/json']

export type UseRequestTokenApiResponse =
  pathsV4['/4/auth/request_token']['post']['responses']['200']['content']['application/json']

export function useCreateAccessToken(requestToken: string) {
  const user = useAuth()
  const router = useRouter()

  return useQuery({
    enabled: !!requestToken,
    queryFn: async () => {
      const { data }: AxiosResponse<UseCreateAccessTokenApiResponse> = await apiV4.post(
        'auth/access_token',
        {
          request_token: requestToken,
        }
      )

      if (data.success) {
        // Convert access token to a session
        const { data: dataSession }: AxiosResponse<UseCreateSessionFromV4ApiResponse> =
          await api.post('authentication/session/convert/4', {
            access_token: data.access_token,
          })

        if (dataSession.success) {
          user.logIn(data.account_id, data.access_token, dataSession.session_id)
          router.back()
        }
      }

      return data
    },
    queryKey: ['auth', 'access_token'],
    staleTime: 0,
  })
}

export function useDeleteRequestToken() {
  const { accessToken, accountId, logOut } = useAuth()

  return useMutation({
    mutationFn: async () => {
      try {
        const { data }: AxiosResponse<UseDeleteAccessTokenApiResponse> = await apiV4.delete(
          'auth/access_token',
          {
            data: { access_token: accessToken },
          }
        )

        if (data.success) {
          logOut()
          // Remove any user-related queries from the cache
          queryClient.removeQueries({ queryKey: ['account', accountId] })
        }

        return data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useDeleteRequestToken', error.response)
        throw error // Re-throw to let react-query handle the error state
      }
    },
    mutationKey: ['auth', 'request_token'],
  })
}

export function useRequestToken() {
  return useQuery({
    queryFn: async () => {
      const { data }: AxiosResponse<UseRequestTokenApiResponse> =
        await apiV4.post('auth/request_token')

      return data
    },
    queryKey: ['auth', 'request_token'],
    staleTime: 0,
  })
}
