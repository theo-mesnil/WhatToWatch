import type { AxiosResponse } from 'axios'
import axios from 'axios'

import { LOCALE_I18N } from '~/constants/locales'

export const BASE_API_URL = 'https://api.themoviedb.org/3/'

export type ApiParams = {
  name: string
  value: boolean | number | string
}[]

export type CallApiProps = {
  method?: HttpMethod
  page?: number
}

export type GetApiUrlProps = {
  params?: ApiParams
  query: string
}

export type SpecificApiParam<Params> = keyof Params extends infer K
  ? K extends keyof Params
    ? { name: K; value: Params[K] }
    : never
  : never

type GetApiUrlReturn = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApi: <T = any>(page?: number, method?: HttpMethod) => Promise<AxiosResponse<T>>
  queryParams?: string[]
}

type HttpMethod = 'delete' | 'get' | 'post' | 'put'

export function getApi({ params, query }: GetApiUrlProps): GetApiUrlReturn {
  let queryParamsUrl = ''
  const queryParams = [] as string[]

  if (params) {
    params.forEach(param => {
      const value = encodeURIComponent(param.value)

      queryParamsUrl += `&${param.name}=${value}`
      queryParams.push(`${param.name}:${value}`)
    })
  }

  const queryUrl = (page?: number) => {
    const pageParam = page ? `&page=${page}` : ''

    return `${BASE_API_URL}${query}?language=${LOCALE_I18N}${pageParam}${queryParamsUrl}`
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callApi = <T = any>(
    page?: number,
    method: HttpMethod = 'get'
  ): Promise<AxiosResponse<T>> => {
    return axios({
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_THEMOVIEDB_API_KEY}`,
      },
      method,
      url: queryUrl(page),
    })
  }

  return {
    callApi,
    queryParams,
  }
}
