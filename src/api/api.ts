import Constants from 'expo-constants';

import { useLocale } from 'contexts/locales';
export const API_URL = 'https://api.themoviedb.org/3/';

type Param = {
  name: string;
  value: string | number;
};

export type Params = Param[];

export type GetApi = {
  callback: (data: any) => void;
  params?: Params;
  type?: Type;
};

export type ApiUrl = {
  params?: Params;
  query: string;
};

export const useApiUrl = () => {
  const { locale } = useLocale();

  function apiUrl({ params, query }: ApiUrl) {
    let paramsUrl = '';

    params &&
      params.map((param) => {
        paramsUrl += `&${param.name}=${encodeURIComponent(param.value)}`;
      });

    return `${API_URL}${query}?api_key=${Constants.expoConfig.extra.theMovieDbApiKey}&language=${locale}${paramsUrl}`;
  }

  return apiUrl;
};
