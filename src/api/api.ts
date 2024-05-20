import { LOCALE_I18N } from 'constants/locales';

export const BASE_API_URL = 'https://api.themoviedb.org/3/';

export type SpecificApiParam<Params> = keyof Params extends infer K
  ? K extends keyof Params
    ? { name: K; value: Params[K] }
    : never
  : never;

export type ApiParams = {
  name: string;
  value: string | number | boolean;
}[];

export type GetApiUrlProps = {
  params?: ApiParams;
  query: string;
};

export type GetApiUrlReturn = {
  queryParams?: string[];
  queryUrl: (page?: number) => string;
};

export function getApi({ params, query }: GetApiUrlProps): GetApiUrlReturn {
  let queryParamsUrl = '';
  let queryParams = [] as string[];

  params &&
    params.map((param) => {
      const value = encodeURIComponent(param.value);
      queryParamsUrl += `&${param.name}=${value}`;
      queryParams.push(`${param.name}:${value}`);
    });

  const queryUrl = (page?: number) => {
    const pageParam = page ? `&page=${page}` : '';

    return `${BASE_API_URL}${query}?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_API_KEY}&language=${LOCALE_I18N}&adult=false${pageParam}${queryParamsUrl}`;
  };

  return {
    queryParams,
    queryUrl
  };
}
