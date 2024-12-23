import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetRequestTokenApiResponse =
  paths['/3/authentication/token/new']['get']['responses']['200']['content']['application/json'];
export type UseGetRequestSessionIdApiResponse =
  paths['/3/authentication/session/new']['post']['responses']['200']['content']['application/json'];
export type UseGetRequestSessionIdApiBody = {
  request_token: string;
};

export function useGetRequestToken() {
  const { callApi } = getApi({
    query: 'authentication/token/new'
  });

  return useQuery({
    queryKey: ['authentication', 'token', 'new'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetRequestTokenApiResponse> =
        await callApi();

      return data;
    }
  });
}

export function useGetAuthenticationSession() {
  const { callApi } = getApi({
    query: 'authentication/session/new'
  });

  return useMutation({
    mutationFn: async (body: UseGetRequestSessionIdApiBody) => {
      const { data }: AxiosResponse<UseGetRequestSessionIdApiResponse> =
        await callApi(1, 'get', body);

      return data?.session_id;
    }
  });
}
