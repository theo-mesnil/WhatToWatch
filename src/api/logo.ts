import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import type { Locale } from '~/constants/locales'
import { LOCALE } from '~/constants/locales'
import type { ContentType } from '~/types/content'

import { getApi } from './api'
import type { paths } from './types'

export type UseGetContentImagesApiResponse =
  paths['/3/tv/{series_id}/images']['get']['responses']['200']['content']['application/json']

export type UseGetContentLogo = UseQueryResult<
  null | {
    aspectRatio: number
    url: string
  },
  Error
>

type useGetContentLogoProps = {
  id: number
  type: ContentType
}

export function useGetContentLogo(props?: useGetContentLogoProps): UseGetContentLogo {
  const { id, type } = props || {}

  const locales = `${LOCALE},en`

  const { callApi } = getApi({
    params: [
      {
        name: 'include_image_language',
        value: locales,
      },
    ],
    query: `${type}/${id}/images`,
  })

  return useQuery({
    enabled: !!id && !!type,
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetContentImagesApiResponse> = await callApi()

      return formatImageToLogo(data, LOCALE)
    },
    queryKey: [type, id, 'images', 'logo', locales],
  })
}

function formatImageToLogo(data: UseGetContentImagesApiResponse, locale: Locale) {
  const logo =
    data.logos.filter(logo => logo.iso_639_1 === locale)?.[0] ||
    data.logos.filter(logo => logo.iso_639_1 === 'en')?.[0]

  const logoUrl = logo?.file_path
  const logoAspectRatio = logo?.aspect_ratio
  const isSvg = logoUrl?.endsWith('svg')

  return logoUrl && !isSvg
    ? {
        aspectRatio: logoAspectRatio,
        url: logoUrl,
      }
    : null
}
