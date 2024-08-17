import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { Locale } from 'constants/locales';
import { LOCALE } from 'constants/locales';
import type { ContentType } from 'types/content';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetContentImagesApiResponse =
  paths['/3/tv/{series_id}/images']['get']['responses']['200']['content']['application/json'];

type useGetContentLogoProps = {
  id: number;
  type: ContentType;
};

function formatImageToLogo(
  data: UseGetContentImagesApiResponse,
  locale: Locale
) {
  const logo =
    data.logos.filter((logo) => logo.iso_639_1 === locale)?.[0] ||
    data.logos.filter((logo) => logo.iso_639_1 === 'en')?.[0];

  const logoUrl = logo?.file_path;
  const logoAspectRatio = logo?.aspect_ratio;
  const isSvg = logoUrl?.endsWith('svg');

  return logoUrl && !isSvg
    ? {
        url: logoUrl,
        aspectRatio: logoAspectRatio
      }
    : null;
}

export type UseGetContentLogo = UseQueryResult<
  {
    aspectRatio: number;
    url: string;
  } | null,
  Error
>;

export function useGetContentLogo(
  props?: useGetContentLogoProps
): UseGetContentLogo {
  const { id, type } = props || {};

  const locales = `${LOCALE},en`;

  const { queryUrl } = getApi({
    query: `${type}/${id}/images`,
    params: [
      {
        name: 'include_image_language',
        value: locales
      }
    ]
  });

  return useQuery({
    queryKey: [type, id, 'images', 'logo', locales],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetContentImagesApiResponse> =
        await axios.get(queryUrl());

      return formatImageToLogo(data, LOCALE);
    },
    enabled: !!id && !!type
  });
}
