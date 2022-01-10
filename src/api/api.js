import Constants from 'expo-constants';

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
    console.log(Constants);
    return `${API_URL}${query}?api_key=${Constants.manifest.extra.theMovieDbApiKey}&language=${locale}${paramsUrl}`;
  }

  return apiUrl;
};
