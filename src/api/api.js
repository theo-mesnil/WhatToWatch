import { THEMOVIEDB_API_KEY } from './apiKey';

import { useLocale } from 'contexts/locales';

export const API_URL = 'https://api.themoviedb.org/3/';

export const useApiUrl = () => {
  const { locale } = useLocale();

  function apiUrl(query, params) {
    let paramsUrl = '';

    params &&
      params.map((param) => {
        paramsUrl += `&${param.name}=${encodeURIComponent(param.value)}`;
      });

    return `${API_URL}${query}?api_key=${THEMOVIEDB_API_KEY}&language=${locale}${paramsUrl}`;
  }

  return apiUrl;
};
