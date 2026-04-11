import { api, apiV4 } from './api'
import type { paths } from './types'
import type { paths as pathsV4 } from './types-v4'

export type UseCreateAccessTokenApiResponse =
  pathsV4['/4/auth/access_token']['post']['responses']['200']['content']['application/json']
export type UseCreateSessionFromV4ApiResponse =
  paths['/3/authentication/session/convert/4']['post']['responses']['200']['content']['application/json']

export type UseRequestTokenApiResponse =
  pathsV4['/4/auth/request_token']['post']['responses']['200']['content']['application/json']

export async function fetchAccessToken(requestToken: string) {
  const { data } = await apiV4.post<UseCreateAccessTokenApiResponse>('auth/access_token', {
    request_token: requestToken,
  })

  if (!data.success) throw new Error('Failed to create access token')

  const { data: dataSession } = await api.post<UseCreateSessionFromV4ApiResponse>(
    'authentication/session/convert/4',
    {
      access_token: data.access_token,
    }
  )

  if (!dataSession.success) throw new Error('Failed to create session')

  return {
    accessToken: data.access_token as string,
    accountId: data.account_id as string,
    sessionId: dataSession.session_id as string,
  }
}

export async function fetchRequestToken(redirectTo: string) {
  const { data } = await apiV4.post<UseRequestTokenApiResponse>('auth/request_token', {
    redirect_to: redirectTo,
  })

  return data
}
