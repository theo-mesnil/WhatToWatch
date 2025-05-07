import axios from 'axios'

import { LOCALE_I18N } from '~/constants/locales'

export const BASE_API_URL = 'https://api.themoviedb.org/3/'
export const BASE_API_URL_V4 = 'https://api.themoviedb.org/4/'

const apiProps = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
  params: {
    language: LOCALE_I18N,
  },
}

export const api = axios.create({
  baseURL: BASE_API_URL,
  ...apiProps,
})

export const apiV4 = axios.create({
  baseURL: BASE_API_URL_V4,
  ...apiProps,
})
