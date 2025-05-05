import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { LOCALE } from '~/constants/locales'
import { useAuth } from '~/contexts/Auth'

import { api } from './api'
import type { paths } from './types'

type UseGetAccountStateParams =
  paths['/3/movie/{movie_id}/account_states']['get']['parameters']['query']
type UseGetAccountStateProps = {
  id: number
  type: 'movie' | 'tv'
}
type UseGetAccountStates = {
  movie: UseGetMovieAccountStatesProps
  tv: UseGetTvAccountStatesProps
}
type UseGetMovieAccountStatesProps =
  paths['/3/movie/{movie_id}/account_states']['get']['responses']['200']['content']['application/json']
type UseGetTvAccountStatesProps =
  paths['/3/tv/{series_id}/account_states']['get']['responses']['200']['content']['application/json']

export function useGetAccountState(props: UseGetAccountStateProps) {
  const { id, type } = props || {}
  const { sessionId } = useAuth()

  return useQuery({
    enabled: !!sessionId,
    queryFn: async ({ pageParam }) => {
      const { data }: AxiosResponse<UseGetAccountStates[UseGetAccountStateProps['type']]> =
        await api.get(`/${type}/${id}/account_states`, {
          params: {
            language: LOCALE,
            page: pageParam,
            session_id: sessionId,
          } as UseGetAccountStateParams,
        })

      return data
    },
    queryKey: ['account-states', sessionId, type, id, LOCALE],
  })
}
