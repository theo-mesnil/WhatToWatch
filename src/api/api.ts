import Constants from 'expo-constants';

import { useLocale } from 'contexts/locales';
export const API_URL = 'https://api.themoviedb.org/3/';

type Param = {
  name: string;
  value: string;
};

export type Params = Param[];

export const useApiUrl = () => {
  const { locale } = useLocale();

  function apiUrl(query: string, params?: Params) {
    let paramsUrl = '';

    params &&
      params.map((param) => {
        paramsUrl += `&${param.name}=${encodeURIComponent(param.value)}`;
      });

    return `${API_URL}${query}?api_key=${Constants.manifest.extra.theMovieDbApiKey}&language=${locale}${paramsUrl}`;
  }

  return apiUrl;
};
