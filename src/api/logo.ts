import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

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

function formatImageToLogo(data: UseGetContentImagesApiResponse) {
  const logoUrl = data?.logos?.[0]?.file_path;
  const logoAspectRatio = data?.logos?.[0]?.aspect_ratio;
  const isSvg = logoUrl?.endsWith('svg');

  return logoUrl && !isSvg
    ? {
        url: logoUrl,
        aspectRatio: logoAspectRatio
      }
    : null;
}

export function useGetContentLogo(props?: useGetContentLogoProps) {
  const { id, type } = props || {};

  const { queryUrl } = getApi({
    query: `${type}/${id}/images`,
    params: [
      {
        name: 'include_image_language',
        value: LOCALE
      }
    ]
  });

  const { queryUrl: queryUrlEn } = getApi({
    query: `${type}/${id}/images`,
    params: [
      {
        name: 'include_image_language',
        value: 'en'
      }
    ]
  });

  const queryReturnCurrentLocale = useQuery({
    queryKey: [type, id, 'images', 'logo', LOCALE],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetContentImagesApiResponse> =
        await axios.get(queryUrl());

      return formatImageToLogo(data);
    },
    enabled: !!id && !!type
  });

  const queryReturnENLocale = useQuery({
    queryKey: [type, id, 'images', 'logo', 'en'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetContentImagesApiResponse> =
        await axios.get(queryUrlEn());
      return formatImageToLogo(data);
    }
  });

  if (queryReturnCurrentLocale.isLoading || queryReturnCurrentLocale.data) {
    return queryReturnCurrentLocale;
  }

  return queryReturnENLocale;
}
