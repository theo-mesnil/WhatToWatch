import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { useSession } from 'contexts/Session';
import { getImageUrl } from 'utils/images';

import { getApi } from './api';
import type { paths } from './types';

export type UseGetUserApiResponse =
  paths['/3/account/{account_id}']['get']['responses']['200']['content']['application/json'];
export type UseGetUserParams =
  paths['/3/account/{account_id}']['get']['parameters'];

export type UseGetUser = UseQueryResult<{
  avatar?: string;
  id: UseGetUserApiResponse['id'];
}>;

export function useGetUser(): UseGetUser {
  const { session } = useSession();
  const { queryUrl } = getApi({
    query: 'account',
    params: [
      {
        name: 'session_id',
        value: session
      }
    ]
  });

  return useQuery({
    queryKey: ['user', session],
    queryFn: async () => {
      const { data }: AxiosResponse<UseGetUserApiResponse> =
        await axios.get(queryUrl());

      const tmdbAvatarPath = data?.avatar?.tmdb?.avatar_path;
      const gravatarAvatarHash = data?.avatar?.gravatar?.hash;
      const avatar = tmdbAvatarPath
        ? getImageUrl(tmdbAvatarPath)
        : gravatarAvatarHash
          ? `https://gravatar.com/avatar/${gravatarAvatarHash}`
          : null;

      return {
        avatar,
        id: data?.id
      };
    }
  });
}
