import { useQuery } from '@tanstack/react-query'

import { api } from './api'
import type { paths } from './types'

export type UseGetReviewApiProps = {
  id?: string
}
export type UseGetReviewApiResponse =
  paths['/3/review/{review_id}']['get']['responses']['200']['content']['application/json']

export function useGetReview(props?: UseGetReviewApiProps) {
  const { id } = props || {}

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<UseGetReviewApiResponse>(`review/${id}`)

      return data
    },
    queryKey: ['review', id],
  })
}
