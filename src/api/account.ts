import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { useAuth } from '~/contexts/Auth'

import { api } from './api'
import type { paths } from './types'

export type UseGetUser =
  paths['/3/account/{account_id}']['get']['responses']['200']['content']['application/json']

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

        return data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useUser', error.response.data)
        throw error
      }
    },
    queryKey: ['account', sessionId],
  })
}
