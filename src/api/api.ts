import axios from 'axios'

import { LOCALE_I18N } from '~/constants/locales'

export const BASE_API_URL = 'https://api.themoviedb.org/3/'

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_THEMOVIEDB_API_KEY}`,
  },
  params: {
    language: LOCALE_I18N,
  },
})
