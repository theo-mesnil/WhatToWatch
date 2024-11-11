import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetAuthenticationTokenApiResponse =
  paths['/3/authentication/token/new']['get']['responses']['200']['content']['application/json'];
export type UseGetAuthenticationSessionApiResponse =
  paths['/3/authentication/session/new']['post']['responses']['200']['content']['application/json'];
export type UseGetAuthenticationSessionBody = {
  request_token: string;
};

export function useGetAuthenticationToken() {
  const { queryUrl } = getApi({
    query: 'authentication/token/new'
  });

  return useQuery({
    queryKey: ['authentication', 'token', 'new'],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetAuthenticationTokenApiResponse> =
        await axios.get(queryUrl());

      return data?.request_token;
    }
  });
}

export function useGetAuthenticationSession() {
  const { queryUrl } = getApi({
    query: 'authentication/session/new'
  });

  return useMutation({
    mutationFn: async (body: UseGetAuthenticationSessionBody) => {
      const { data }: AxiosResponse<UseGetAuthenticationSessionApiResponse> =
        await axios.post(queryUrl(), body);

      return data?.session_id;
    }
  });
}
