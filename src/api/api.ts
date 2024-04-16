import { LOCALE } from 'constants/locales';

export const API_URL = 'https://api.themoviedb.org/3/';

export type ApiType = 'tv' | 'movie' | 'person' | 'all';

type Param = {
  name: string;
  value: string | number;
};

export type Params = Param[];

export type GetApi = {
  callback: (data: any) => void;
  params?: Params;
  type?: ApiType;
};

export type ApiUrl = {
  params?: Params;
  query: string;
};

export const useApiUrl = () => {
  function apiUrl({ params, query }: ApiUrl) {
    let paramsUrl = '';

    params &&
      params.map((param) => {
        paramsUrl += `&${param.name}=${encodeURIComponent(param.value)}`;
      });

    return `${API_URL}${query}?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_API_KEY}&language=${LOCALE}${paramsUrl}`;
  }

  return apiUrl;
};
