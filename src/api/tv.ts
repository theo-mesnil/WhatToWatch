import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetTvApiResponse =
  paths['/3/tv/{series_id}']['get']['responses']['200']['content']['application/json'];

export type UseGetTvApiProps = {
  id: number;
};

export function useGetTv(props?: UseGetTvApiProps) {
  const { id } = props || {};

  const { queryUrl } = getApi({
    query: `tv/${id}`
  });

  return useQuery({
    queryKey: ['tv', id],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetTvApiResponse> =
        await axios.get(queryUrl());
      return data;
    },
    enabled: !!id
  });
}
